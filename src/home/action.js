import fetch from 'common/js/util/fetch'

  export async function getData() {
    // fetch("/data.json")
    //   .then(res => {
    //     return res.json()
    //     debugger
    //   })
    const data = await fetch("/data.json", {
      method:'get',
      body: {
        request_source: 'dmp',
        agent_ucid: 1
      }
    })
    debugger
    // debugger
    // return data
    // return await fetch("/data.json", {
    //   method:'get',
    //   body: {
    //     request_source: 'dmp',
    //     agent_ucid: 1
    //   }
    // })
    // runInAction(() => {
    //   console.log(data)
    //   debugger
    //   return data
    // })
  }
