/**
 * 公共方法
 */

 (function() {
     var newRem = function() {
         var html = document.documentElement;
         html.style.fontSize = html.getBoundingClientRect().width / 37 + 'px';
     };
     window.addEventListener('resize', newRem, false);
     newRem();
 })();


 // lianjia-m 的额外代码
 ;(function(){
   $.queryToJson = function(qs, is_decode){

     var q_list = $.trim(qs).split("&"), json = {};

     for (var i = 0, len = q_list.length ; i < len; i++) {
       if (q_list[i]) {
         var hash = q_list[i].split("="),key = hash[0],value = hash[1];

         if (hash.length < 2) value = key,key = '$nullName'; // 如果只有key没有value, 那么将全部丢入一个$nullName数组中

         if (!(key in json)) json[key] = is_decode ? decodeURIComponent(value) : value;// 如果缓存堆栈中没有这个数据，则直接存储
         else  json[key] = [].concat(json[key], is_decode ? decodeURIComponent(value) : value);// 如果堆栈中已经存在这个数据，则转换成数组存储
       }
     }
     return json;
   };
   $.isObjectEmpty = function(source, own_property){
     for(var name in source) {
       if(own_property || source.hasOwnProperty(name)) {
         return false;
       }
     }
     return true;
   }
   $.fn.isin = function(list){
     if(this.length === 0) return false;
     var dom = this[0];
     for(var i = 0, len = list.length; i < len; i += 1){
       if(list[i].contains(dom)){
         return true;
       }
     }
     return false;
   };
   // 代理函数
   $.fn.de = function(exp_els){
     if(this.length === 0) return null;

     var cur_this = this, act_el = this[0], exp_els = exp_els || [], evt_list = {};

     var bind_event = function(evt){
       do_delegated(evt.target, evt.type, evt);
     };

     var do_delegated = function(el, type, evt){
       var act = null;
       var check_buble = function(){
         if(evt_list[type] && evt_list[type][act]){
           return evt_list[type][act]({
             'evt'  : evt,
             'el'   : el,
             'box'  : act_el,
             'data' : $.queryToJson(el.getAttribute('data-query') || '')
           });
         }else{
           return true;
         }
       };
       var el_dom = $(el);
       if(el_dom.isin(exp_els)) return false;
       else if(!el_dom.isin([act_el])) return false;
       else{
         while(el && el !== act_el){
           if(el.nodeType === 1){
             act = el.getAttribute('data-act');
             if(act && check_buble() === false) break;
           }
           el = el.parentNode;
         }
       }
     };

     var that = {};

     that.add = function(fn_name, evt_type, process){
       if(!evt_list[evt_type]){
         evt_list[evt_type] = {};
         cur_this.on(evt_type, bind_event);
       }
       var ns = evt_list[evt_type];
       ns[fn_name] = process;
     };
     that.remove = function(fn_name, evt_type){
       if(evt_list[evt_type]){
         delete evt_list[evt_type][fn_name];
         if($.isObjectEmpty(evt_list[evt_type])){
           delete evt_list[evt_type];
           cur_this.off(evt_type, bind_event);
         }
       }
     };
     that.destroy = function(){
       for(var k in evt_list){
         for(var l in evt_list[k]){
           delete evt_list[k][l];
         }
         delete evt_list[k];
         cur_this.off(act_el, k, bind_event);
       }
     }
     return that;
   };


   // 对请求对封装
   $.trans = function(url, options, format){
     // 形参处理
     if(!url || typeof url !== 'string'){
       throw 'trans url empty';
     }
     options     = options || {};
     format      = (typeof format === 'function') ? format : function(data){return data;};


     //同zepto
     var opt     = {
       'url'         : url,
       'type'        : options['type'] || 'GET',
       'dataType'    : options['dataType'] || 'json',
       'timeout'     : options['timeout'] || 30*1000,
       'contentType' : options['contentType'],
       'async'       : options['async'],
       'global'      : false,
     };
     var hooks      = {};  // key : fn , 钩子函数fn()的标准形参是响应data和请求data
     var request    = [];  // 请求队列,[],[{data:{}, process:{success:fn, error:fn, timeout:fn}}]
     var status     = '';  // ['FREE'|'BUSY']
     var curxhr     = null;// 当前xhr对象
     var transType  = options['transType'] || 'QUEUE'; //['QUEUE' | 'SEIZE']
     var verifiers  = options['verifiers'] || []; //参数检查器

     // 生成唯一key的函数
     var getKey = (function(){
       var n = 0;
       return function(){
         return n+++Math.random() + '';
       };
     })();

     var verify   = function(data){
       for(var k in verifiers){
         if(!verifiers[k].test(data[k])){
           return false;
         }
       }
       return true;
     }

     var fireHook = function(res, req){
       for(var k in hooks){
         (function(k){
           setTimeout(function(){hooks[k](res, req);}, 0);
         })(k);
       }
     };

     // 请求调度函数
     var requestNext = function(){
       if(status === 'BUSY'){
         if(transType === 'SEIZE'){
           if(curxhr){
             try{curxhr.abort()}catch(exp){}
             curxhr = null;
             status = 'FREE';
           }
         }else{//transType === 'QUEUE'
           setTimeout(arguments.callee, 100);
         }
       }

       var req = request.shift();
       if(req){
         var data    = req['data'];
         var process = req['process'];
         curxhr = $.ajax($.extend({
           'data'        : data,
           'success'     : function(res){
             res = format(res);
             try{process['success'](res, data);}catch(exp){}
             curxhr = null;
             status = 'FREE';
             setTimeout(requestNext, 0);
             setTimeout(function(){fireHook(res, data)}, 0);
           },
           'error'       : function(xhr, type){
             try{process['error'](xhr, type);}catch(exp){}
             curxhr = null;
             status = 'FREE';
             setTimeout(requestNext, 0);
           }
         }, opt));
       }
     };




     var that  = {}; //返回对象

     that.addHook  = function(fn){
       var key = getKey();
       hooks[key] = fn;
       return key;
     };

     that.rmHook   = function(key){
       if(hooks[key]) delete hooks[key];
     };

     that.request  = function(data, process){
       if(!verify(data)){
         // return false;
       };
       if(!process){
         process = {};
       }
       request.push({
         'data' : data,
         'process' : {
             'success' : process['success'] || function(){},
             'error'   : process['error']   || function(){},
         },
       });
       requestNext();
     };
     return that;

   };

   // 对所有data-mark所有标签
   $.fn.getMark = function(){
     var col = this.find('[data-mark]');
     var list = {};
     for(var i = 0, len = col.length; i < len; i += 1){
       var mark = col[i].getAttribute('data-mark');
       if(list[mark]){
         list[mark].push(col[i]);
       }else{
         list[mark] = $(col[i]);
       }
     }
     var that = {};

     that.one = function(mark){
       var cur = list[mark] || [];
       if(list[mark].length === 1){
         return cur;
       }
       return $(cur[0]);
     };

     that.get = function(mark){
       return list[mark];
     }
     return that;
   };

 // 获取节点上的标志数据
   $.fn.getData = function(){
     var ret = [];
     for(var i = 0, len = this.length; i < len; i += 1){
       var dataStr = this[i].getAttribute('data-info');
       if(!dataStr){
         dataStr = '';
       }
       ret.push($.queryToJson(dataStr, true));
     }
     return ret;
   };
 })(Zepto);


function common() {
	return 'this is common'
}



export default common
