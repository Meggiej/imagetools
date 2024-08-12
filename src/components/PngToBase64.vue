<template>
  <div>
    <h1>图片转Base64</h1>
    <div
        class="dropzone"
        @dragover.prevent
        @drop.prevent="handleDrop"
        @click="triggerFileInput"
    >
      <input
          type="file"
          ref="fileInput"
          @change="handleFileChange"
          accept="image/*"
          hidden
      />
      <el-image class="buttons-img" :src="require('../../public/yasuozhuanhuan/图片添加.png')" :fit="contain"/>
      <el-row class="buttons">
        <el-button type="primary" plain icon="el-icon-upload el-icon--right" @click="handleFileChange">选择图片
        </el-button>
      </el-row>
      <p class="buttons">将图片拖到这里，或点击选择图片</p>
    </div>
    <div v-if="imageBase64" style="display: flex;">
      <div class="left">
        <h3>预览：</h3>
        <el-image :src="imageBase64" alt="Preview"/>
      </div>
      <div class="right">
        <div style="display: flex">
          <h3>base64：</h3>
          <el-button type="text" icon="el-icon-copy-document" @click="handleCopy">复制结果
          </el-button>
        </div>
        <el-input
            spellcheck="false"
            type="textarea"
            rows=20
            v-model="imageBase64">
        </el-input>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Base64ToPng',
  data() {
    return {
      imageBase64: '',
      contain: "contain",
    }
  },
  methods: {
    handleDrop(event) {
      const file = event.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        this.convertToBase64(file);
      }
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith('image/')) {
        this.convertToBase64(file);
      }
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    convertToBase64(file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.imageBase64 = reader.result;
      };
      reader.readAsDataURL(file);
    },
    async handleCopy() {
      if (this.imageBase64) {
        try {
          await navigator.clipboard.writeText(this.imageBase64);
          this.$message.success('复制成功！');
        } catch (err) {
          this.$message.error('复制失败！请手动复制。');
          console.error('复制到剪贴板失败:', err);
        }
      }
    }
  }
}

</script>

<style>
.dropzone {
  border: 2px dashed #ccc;
  border-radius: 4px;
  display: inline-block;
  cursor: pointer;
  width: 100%;
  height: 250px;
  position: relative;
  background-color: white;
}

.dropzone input {
  display: none;
}

.buttons {
  display: flex;
  justify-content: center; /* 水平居中 */
  gap: 10px; /* 按钮之间的间距 */
  margin: 10px 0; /* 上下30px的间距 */
}

.dropzone p {
  margin: 0;
  font-size: 16px;
  color: #333;
}

.buttons-img {
  margin-top: 20px;
  width: 100%;
  height: 40%;
}

.left,
.right {
  width: 48%;
}

.left {
  margin-right: 2%;
}

.right {
  margin-left: 2%;
}
</style>
