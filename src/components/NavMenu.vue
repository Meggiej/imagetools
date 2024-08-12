<template>
  <el-container>
    <el-aside width="auto" class="aside-class">
      <el-menu :unique-opened="true" :collapse="isCollapse" class="menu-class" :collapse-transition="false">
        <el-menu-item index="Collapse" @click="handCollapse">
          <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
          <span slot="title">{{ isCollapse ? '展开' : '收起' }}</span>
        </el-menu-item>
        <router-link to="/yasuozhuanhuan">
          <el-menu-item index="yasuozhuanhuan">
            <i class="el-icon-base64tupianzhuanhuan"></i>
            <span slot="title">压缩转换</span>
          </el-menu-item>
        </router-link>
        <router-link to="/homepage">
          <el-menu-item index="homepage">
            <i class="el-icon-tupiangeshizhuanhuan"></i>
            <span slot="title">格式转换</span>
          </el-menu-item>
        </router-link>
        <router-link to="/aboutpage">
          <el-menu-item index="aboutpage">
            <i class="el-icon-icon_shengchengzhizuotupian"></i>
            <span slot="title">制作生成</span>
          </el-menu-item>
        </router-link>
        <router-link to="/contactpage">
          <el-menu-item index="contactpage">
            <i class="el-icon-tupianyulan"></i>
            <span slot="title">图片预览</span>
          </el-menu-item>
        </router-link>
      </el-menu>

    </el-aside>


    <el-main class="main-class">
      <router-view></router-view>
    </el-main>


  </el-container>


</template>
<style>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}


.router-link-exact-active,
.router-link-active,
.router-link {
  text-decoration: none !important; /* 去掉下划线 */
}

a {
  text-decoration: none;
}


.menu-class {
  margin-left: 5px;
  padding-right: 10px;
  height: 100vh;
  width: auto;

}
.el-menu-item {
  font-size: 16px;
}
.main-class {
  width: auto;
}

</style>

<script>
export default {
  data() {
    return {
      isCollapse: false
    }
  },
  methods: {
    handleSelect(path) {
      this.$router.push(path)
    },
    handCollapse() {
      this.isCollapse = !this.isCollapse
      console.log(this.isCollapse)
    }
  }
};
</script>

