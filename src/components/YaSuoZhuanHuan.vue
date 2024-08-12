<template>
  <div class="hello">
    <h1>压缩转换</h1>
    <!--    <div>-->
    <!--      <el-row :gutter="20">-->
    <!--        <el-col :span="6">-->
    <!--          <div class="grid-content bg-purple"></div>-->
    <!--        </el-col>-->
    <!--        <el-col :span="6">-->
    <!--          <div class="grid-content bg-purple"></div>-->
    <!--        </el-col>-->
    <!--        <el-col :span="6">-->
    <!--          <div class="grid-content bg-purple"></div>-->
    <!--        </el-col>-->
    <!--        <el-col :span="6">-->
    <!--          <div class="grid-content bg-purple"></div>-->
    <!--        </el-col>-->
    <!--      </el-row>-->
    <!--    </div>-->

    <div>
      <el-row :gutter="20">
        <router-link to="/Base64ToPng">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <div class="item-left">
                <el-image
                    class="function-img"
                    :src="require('../../public/yasuozhuanhuan/Base64转图片.png')"
                    :fit="contain"></el-image>
              </div>
              <div class="item-right">
                <h4>Base64转图片</h4>
                <el-tooltip placement="top">
                  <div slot="content">{{ base642png }}</div>
                  <p>{{ base642png }}</p>
                </el-tooltip>
              </div>
            </div>
          </el-col>
        </router-link>
        <router-link to="/PngToBase64">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <div class="item-left">
                <el-image
                    class="function-img"
                    :src="require('../../public/yasuozhuanhuan/图片转Base64.png')"
                    :fit="contain"></el-image>
              </div>
              <div class="item-right">
                <h4>图片转Base64</h4>
                <el-tooltip placement="top">
                  <div slot="content">{{ png2base64 }}</div>
                  <p>{{ png2base64 }}</p>
                </el-tooltip>
              </div>
            </div>
          </el-col>
        </router-link>
        <el-col :span="6">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple"></div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      "base642png": "将base64编码转换成图片",
      "png2base64": "将图片转换成base64编码",
      "contain": "contain"
    };
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
  min-width: 300px;
  margin-bottom: 20px;
  transition: transform 0.5s ease;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: white;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  height: 120px;
  display: flex;
}

.function-img {
  width: 80%;
  height: 80%;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.el-col:hover {
  transform: translate(0, -10px)
}

.item-left,
.item-right {
  justify-content: center; /* 内部内容水平居中 */
  align-items: center; /* 内部内容垂直居中 */
  margin-right: 10px;
  height: 120px; /* 根据需要设置高度 */
  margin-left: 10px;
}

.item-left {
  width: 30%; /* 根据需要设置宽度 */
  display: flex; /* 内部元素也使用 Flexbox 布局 */
}

.item-right {
  width: 60%;
  padding-right: 10px;
}

.item-right p {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  color: #8f8f8f;
}

</style>
