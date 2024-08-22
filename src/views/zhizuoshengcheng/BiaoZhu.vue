<template>
  <div>
    <h1>图片标注</h1>
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
      <el-image class="buttons-img" :src="require('../../../public/yasuozhuanhuan/图片添加.png')" :fit="contain"/>
      <el-row class="buttons">
        <el-button type="primary" plain icon="el-icon-upload el-icon--right">选择图片
        </el-button>
      </el-row>
      <p class="buttons">将图片拖到这里，或点击选择图片</p>
    </div>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm-class">
      <el-row >

        <el-col :span="3" class="el-col-top" style="margin-top: 20px">
          <el-form-item label="形状" prop="shape">
            <el-select v-model="ruleForm.shape" placeholder="请选标注形状">
              <el-option label="矩形" value="rectangle"></el-option>
              <el-option label="圆形" value="circle"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col  v-if="ruleForm.shape==='rectangle'">
          <el-col :span="6" class="el-col-top">

            <el-form-item label="左上角" required>
              <el-col :span="11">
                <el-form-item prop="top_left_x">
                  <el-input v-model="ruleForm.top_left_x" placeholder="x"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2" class="line">-</el-col>
              <el-col :span="11">
                <el-form-item prop="top_left_y">
                  <el-input v-model="ruleForm.top_left_y" placeholder="y"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>

          </el-col>
          <el-col :span="6" class="el-col-top">
            <el-form-item label="右上角" required>
              <el-col :span="11">
                <el-form-item prop="top_right_x">
                  <el-input v-model="ruleForm.top_right_x" placeholder="x"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2" class="line">-</el-col>
              <el-col :span="11">
                <el-form-item prop="top_right_y">
                  <el-input v-model="ruleForm.top_right_y" placeholder="y"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="6" class="el-col-top">
            <el-form-item label="右下角" required>
              <el-col :span="11">
                <el-form-item prop="bottom_right_x">
                  <el-input v-model="ruleForm.bottom_right_x" placeholder="x"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2">-</el-col>
              <el-col :span="11">
                <el-form-item prop="bottom_right_y">
                  <el-input v-model="ruleForm.bottom_right_y" placeholder="y"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="6" class="el-col-top">
            <el-form-item label="左下角" required>
              <el-col :span="11">
                <el-form-item prop="bottom_left_x">
                  <el-input v-model="ruleForm.bottom_left_x" placeholder="x"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2">-</el-col>
              <el-col :span="11">
                <el-form-item prop="bottom_left_y">
                  <el-input v-model="ruleForm.bottom_left_y" placeholder="y"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-col>
        </el-col>

        <el-col  v-if="ruleForm.shape==='circle'">
          <el-col :span="6" class="el-col-top">

            <el-form-item label="圆心坐标" required>
              <el-col :span="11">
                <el-form-item prop="circle_x">
                  <el-input v-model="ruleForm.circle_x" placeholder="x"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2" class="line">-</el-col>
              <el-col :span="11">
                <el-form-item prop="circle_y">
                  <el-input v-model="ruleForm.circle_y" placeholder="y"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="6" class="el-col-top">
            <el-form-item label="半径(px)" prop="circle_radius">
              <el-input v-model="ruleForm.circle_radius" placeholder="半径"></el-input>
            </el-form-item>

          </el-col>
        </el-col>

        <el-col class="el-col-top">
            <el-form-item label="颜色" prop="color">
            <el-color-picker
                v-model="color"
                show-alpha
                :predefine="predefineColors">
            </el-color-picker>
          </el-form-item>
          </el-col >

        <el-col  class="el-col-top">
            <el-form-item class="submit-button">
            <el-button type="primary" @click="drawImageOnCanvas('ruleForm')" plain >立即标注</el-button>
            <el-button @click="resetForm('ruleForm')" plain>重置</el-button>
          </el-form-item>
          </el-col>
      </el-row>
    </el-form>


    <div v-if="imageBase64" style="display: flex;">
      <div class="left">
        <h3>预览：</h3>
        <el-image :src="imageBase64" alt="Preview"/>
      </div>
      <div class="right">
        <div style="display: flex">
          <h3>标注结果：</h3>
          <el-button type="text" icon="el-icon-download" @click="handleDownload">下载结果
          </el-button>
        </div>
        <canvas ref="canvas"></canvas>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'BiaoZhu',
  data() {
    return {
      imageBase64: '',
      contain: "contain",
      color: 'rgba(255, 69, 0, 0.68)',
      predefineColors: [
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
        'rgba(255, 69, 0, 0.68)',
        'rgb(255, 120, 0)',
        'hsv(51, 100, 98)',
        'hsva(120, 40, 94, 0.5)',
        'hsl(181, 100%, 37%)',
        'hsla(209, 100%, 56%, 0.73)',
        '#c7158577'
      ],
      ruleForm: {
        shape: 'rectangle', // 默认选择“矩形”

        // 矩形
        top_left_x: '',
        top_left_y: '',
        top_right_x: '',
        top_right_y: '',
        bottom_right_x: '',
        bottom_right_y: '',
        bottom_left_x: '',
        bottom_left_y: '',

        // 圆形
        circle_x: '',
        circle_y: '',
        circle_radius: '',
      },
      rules: {
        shape: [
          {required: true, message: '请选择活动区域', trigger: 'change'}
        ],
        // 矩形
        top_left_x: [
          {required: true, message: '请输入左上角的x坐标', trigger: 'blur'},
        ],
        top_left_y: [
          {required: true, message: '请输入左上角的y坐标', trigger: 'blur'},
        ],
        top_right_x: [
          {required: true, message: '请输入右上角的x坐标', trigger: 'blur'},
        ],
        top_right_y: [
          {required: true, message: '请输入右上角的y坐标', trigger: 'blur'},
        ],
        bottom_right_x: [
          {required: true, message: '请输入右下角的x坐标', trigger: 'blur'},
        ],
        bottom_right_y: [
          {required: true, message: '请输入右下角的y坐标', trigger: 'blur'},
        ],
        bottom_left_x: [
          {required: true, message: '请输入左下角的x坐标', trigger: 'blur'},
        ],
        bottom_left_y: [
          {required: true, message: '请输入左下角的y坐标', trigger: 'blur'},
        ],
        // 圆形
        circle_x: [
          {required: true, message: '请输入圆心的x坐标', trigger: 'blur'},
        ],
        circle_y: [
          {required: true, message: '请输入圆心的y坐标', trigger: 'blur'},
        ],
        circle_radius: [
          {required: true, message: '请输入圆的半径', trigger: 'blur'},
        ],
      }
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
    async handleDownload() {
      const canvas = this.$refs.canvas;
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'canvas-image.png';
      link.click();
    },


    drawImageOnCanvas(formName) {
      if (!this.imageBase64) {
        this.$message.error('请先上传图片');
        return false
      }
      this.$refs[formName].validate((valid) => {
        console.log("valid is:" + valid)
        if (valid) {
          const canvas = this.$refs.canvas;
          const ctx = canvas.getContext('2d');

          const image = new Image();

          image.src = this.imageBase64; // Assuming imageBase64 contains the base64-encoded image

          image.onload = () => {
            // Set canvas size to match image size
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);

            if (this.ruleForm.shape === 'rectangle') {
              const width = Math.max(this.ruleForm.top_right_x, this.ruleForm.bottom_right_x) - this.ruleForm.top_left_x
              const height = Math.max(this.ruleForm.bottom_left_y, this.ruleForm.bottom_right_y) - this.ruleForm.top_left_y

              // Draw the rectangle
              ctx.beginPath();
              ctx.rect(this.ruleForm.top_left_x, this.ruleForm.top_left_y, width, height);
              ctx.lineWidth = 2;
              ctx.strokeStyle = 'red';
              ctx.stroke();
            } else if (this.ruleForm.shape === 'circle') {
              const x = parseInt(this.ruleForm.circle_x, 10);
              const y = parseInt(this.ruleForm.circle_y, 10);
              const radius = parseInt(this.ruleForm.circle_radius, 10);
              ctx.strokeStyle = this.color;
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.arc(x, y, radius, 0, 2 * Math.PI);
              ctx.stroke();
            }
          };
        } else {
          return false;
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}

</script>

<style>
.dropzone {
  border: 2px dashed #ccc;
  border-radius: 10px;
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
  overflow: hidden;
}

.left {
  margin-right: 2%;
}

.right {
  margin-left: 2%;
  position: relative;
}

canvas {
  width: 100%; /* Make canvas responsive to its container */
  height: auto; /* Maintain aspect ratio */
}

.ruleForm-class {
  margin-top: 20px;
  width: 100%;
  //height: 100px;
  background-color: white;
  border-radius: 10px;
}

.el-col-top {
  min-width: 240px;
}

</style>
