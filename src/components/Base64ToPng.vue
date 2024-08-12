<template>
  <div class="base64-to-png-page">
    <h1>Base64转图片</h1>
    <el-input
        spellcheck="false"
        type="textarea"
        rows=20
        placeholder="请粘贴base64，如data:image/png;base64,xxx..."
        v-model="textarea">
    </el-input>
    <el-row class="buttons">
      <el-button type="primary" plain icon="el-icon-switch" @click="handConvert">转换图片</el-button>
      <el-button type="success" plain icon="el-icon-download" @click="handDownload">下载图片</el-button>
      <el-button type="danger" plain icon="el-icon-clear" @click="handClear">清空内容</el-button>
    </el-row>
    <el-image :src="imageSrc" v-if="imageSrc"/>
  </div>
</template>

<script>
export default {
  name: 'Base64ToPng',
  data() {
    return {
      textarea: '',
      imageSrc: ''
    }
  },
  methods: {
    handClear() {
      this.textarea = '';
      this.imageSrc = "";
    },
    handConvert() {
      let base64Data = this.textarea.trim();
      const prefix = 'data:image';
      const prefix_tmp = 'data:image/png;base64,';

      // 检查 Base64 数据格式并补充前缀
      if (!base64Data.startsWith(prefix)) {
        base64Data = prefix_tmp + base64Data;
      }
      this.isValidBase64Image(base64Data, (isValid) => {
        if (isValid) {
          // 设置图片源
          this.imageSrc = base64Data;
          this.$message({
            message: '转换成功！',
            type: 'success'
          });
        } else {
          this.$message({
            message: 'Base64 字符串无效或不能显示为图片！',
            type: 'error'
          });
          this.imageSrc = ""
        }
      });

    },
    handDownload() {
      if (this.imageSrc) {
        const link = document.createElement('a');
        link.href = this.imageSrc;
        link.download = 'image.png'; // 默认下载文件名
        link.click();
      } else {
        this.$message({
          message: '请先生成图片后，再点击下载图片！',
          type: 'error'
        });
      }
    },
    isValidBase64Image(base64String, callback) {
      const image = new Image();
      image.onload = () => callback(true);  // 如果图片加载成功
      image.onerror = () => callback(false); // 如果图片加载失败

      // 使用正则检查 Base64 字符串格式
      const base64Pattern = /^data:image\/(png|jpg|jpeg|gif|webp);base64,[A-Za-z0-9+/=]+$/;
      if (!base64Pattern.test(base64String)) {
        callback(false);
        return;
      }

      // 设置图片的 src 属性并开始加载
      image.src = base64String;
    },
  }
};
</script>

<style scoped>
.buttons {
  display: flex;
  justify-content: center; /* 水平居中 */
  gap: 10px; /* 按钮之间的间距 */
  margin: 30px 0; /* 上下30px的间距 */
}
</style>
