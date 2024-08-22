<template>
  <div>
    <input type="file" @change="handleFileChange" />
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
export default {
  name: 'ImageCanvas',

  data() {
    return {
      image: null,
      canvasWidth: 0,
      canvasHeight: 0,
    };
  },

  methods: {
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.loadImage(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    },

    loadImage(src) {
      const img = new Image();
      img.onload = () => {
        this.drawImageOnCanvas(img);
      };
      img.src = src;
    },

    drawImageOnCanvas(img) {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext('2d');

      this.canvasWidth = img.width;
      this.canvasHeight = img.height;

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      // Example coordinates for a rectangle
      const rectCoords = [
        { x: 50, y: 50 },
        { x: 150, y: 50 },
        { x: 150, y: 150 },
        { x: 50, y: 150 }
      ];

      this.drawRectangle(ctx, rectCoords);
    },

    drawRectangle(ctx, coords) {
      if (coords.length !== 4) {
        console.error('Coordinates must be an array of 4 points');
        return;
      }

      ctx.beginPath();
      ctx.moveTo(coords[0].x, coords[0].y);

      for (let i = 1; i < coords.length; i++) {
        ctx.lineTo(coords[i].x, coords[i].y);
      }

      ctx.closePath(); // Close the path to complete the rectangle
      ctx.strokeStyle = 'green'; // Color of the rectangle's border
      ctx.lineWidth = 2; // Width of the rectangle's border
      ctx.stroke();
    }
  }
};
</script>

<style scoped>
canvas {
  border: 1px solid #ccc;
}
</style>
