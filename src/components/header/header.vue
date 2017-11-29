<template>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="4" class="nav-item-right">
          <router-link class="nav-item" to="/about">关于</router-link>
      </el-menu-item>
      <el-menu-item index="3" class="nav-item-right">
          <router-link class="nav-item" to="/share">聊天</router-link>
      </el-menu-item>
        <el-submenu index="2" class="nav-item-right">
            <template slot="title">  <router-link class="nav-item" to="/share">分享</router-link></template>
            <el-menu-item index="2-1">音乐</el-menu-item>
            <el-menu-item index="2-2">视频</el-menu-item>
            <el-menu-item index="2-3">故事</el-menu-item>
        </el-submenu>
        <el-menu-item index="1" class="nav-item-right">
            <router-link class="nav-item" to="/">首页</router-link>
        </el-menu-item>
        <el-tooltip class="item" popper-class="" visible-arrow="false" effect="light" content="还没有logo，这当然不是" placement="right">
        <i class="el-icon-star-on logo" ></i>
    </el-tooltip>

    </el-menu>
</template>
