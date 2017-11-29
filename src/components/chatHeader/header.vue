<template>
<div class="header">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">
            <router-link class="nav-item" to="/">首页</router-link>
        </el-menu-item>
        <el-menu-item index="2">
            <router-link class="nav-item" to="/hall">广场</router-link>
        </el-menu-item>
        <el-tooltip class="item" popper-class="" visible-arrow="false" effect="light" content="还没有logo，这当然不是" placement="right">
        <i class="el-icon-star-on logo" ></i>
    </el-tooltip>

    </el-menu>
</div>
</template>
