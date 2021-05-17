<template>
  <vue-draggable-resizable
    :w="rectWidth"
    :h="rectHeight"
    :x="rectX"
    :y="rectY"
    @dragging="editRect"
    @resizing="editRect"
    :parent="true"
    class-name-active="my-active-class"
    class-name-handle="resize-handle"
  >
    <div class="label-button">
      <input
        :size="labelText.length || 1"
        v-model="labelText"
        type="text"
        @input="editRect"
      />
      <button @click="deleteRect">X</button>
    </div>
  </vue-draggable-resizable>
</template>

<script>
/* eslint-disable */
import VueDraggableResizable from 'vue-draggable-resizable';
import 'vue-draggable-resizable/dist/VueDraggableResizable.css';

export default {
  name: 'Rectangle',
  props: {
    x: Number,
    y: Number,
    width: Number,
    height: Number,
    label: String,
    uuid: String,
  },
  components: {
    VueDraggableResizable,
  },
  data() {
    return {
      isResizeActive: false,

      rectWidth: this.width,
      rectHeight: this.height,
      rectX: this.x,
      rectY: this.y,
      labelText: this.label,

      parentWidth: undefined,
      parentHeight: undefined,
      rectPerWidth: undefined,
      rectPerHeight: undefined,
      rectPerX: undefined,
      rectPerY: undefined,

      parentContainerRef: {},
    };
  },
  methods: {
    deleteRect() {
      this.$store.dispatch('deleteRect', {
        uuid: this.uuid,
      });
    },
    dispatchCoords() {
      this.$store.dispatch('modifyRect', {
        x: this.rectX,
        y: this.rectY,
        width: this.rectWidth,
        height: this.rectHeight,
        label: this.labelText,
        uuid: this.uuid,
      });
    },
    editRect(xPos, yPos, width, height) {
      this.calculateRectPercentages(); //should run only once at the beginning

      if (xPos !== undefined && yPos !== undefined) {
        this.rectX = xPos;
        this.rectY = yPos;
      }
      if (width !== undefined && height !== undefined) {
        this.rectWidth = width;
        this.rectHeight = height;
      }
      this.dispatchCoords();
    },
    calculateContainerDims() {
      this.parentContainerRef = this.$parent.$el;
      const parentWidth = this.parentContainerRef.getBoundingClientRect().width;
      const parentHeight = this.parentContainerRef.getBoundingClientRect()
        .height;
      this.parentWidth = parentWidth;
      this.parentHeight = parentHeight;
    },
    calculateRectDims() {
      this.calculateContainerDims();

      if (this.rectPerWidth) {
        this.rectWidth = Math.round(
          this.parentWidth * (this.rectPerWidth / 100)
        );
      }
      if (this.rectPerHeight) {
        this.rectHeight = Math.round(
          this.parentHeight * (this.rectPerHeight / 100)
        );
      }
      if (this.rectPerX) {
        this.rectX = Math.round(this.parentWidth * (this.rectPerX / 100));
      }
      if (this.rectPerY) {
        this.rectY = Math.round(this.parentHeight * (this.rectPerY / 100));
      }
      this.dispatchCoords();
    },
    calculateRectPercentages() {
      const rectanglePercentageWidth =
        (this.rectWidth / this.parentWidth) * 100;
      const rectanglePercentageHeight =
        (this.rectHeight / this.parentHeight) * 100;
      const rectanglePercentageX = (this.rectX / this.parentWidth) * 100;
      const rectanglePercentageY = (this.rectY / this.parentHeight) * 100;
      this.rectPerWidth = rectanglePercentageWidth;
      this.rectPerHeight = rectanglePercentageHeight;
      this.rectPerX = rectanglePercentageX;
      this.rectPerY = rectanglePercentageY;
    },
  },
  mounted() {
    this.calculateRectDims();
    this.calculateRectPercentages();
    window.addEventListener('resize', this.calculateRectDims);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.draggable {
  cursor: move;
}
.label-button {
  display: flex;
  justify-content: space-between;
  position: relative;
  top: 0px;
  left: -2px;
  input {
    text-align: left;
    min-width: 50px;
    border: none;
    background: rgb(107, 212, 8);
    color: #000;
    padding: 5px;
    cursor: text;
  }
  button {
    background: rgb(107, 212, 8);
    border: none;
    color: #000;
    cursor: pointer;
    position: relative;
    right: -4px;
  }
}
</style>
<style lang="scss">
.vdr {
  border: 2px solid rgb(107, 212, 8);
}
.my-active-class {
  border: 2px solid rgb(107, 212, 8);
  .handle {
    background: rgb(107, 212, 8);
  }
}

.resize-handle {
  width: 10px;
  height: 10px;
  background: #fff;
  position: absolute;
  box-sizing: border-box;
  border: 1px solid #6bd408;

  &-tm,
  &-mr,
  &-bm,
  &-ml {
    display: none !important;
  }

  &.resize-handle-tl {
    top: -5px;
    left: -5px;
    cursor: nw-resize;
    z-index: 99;
  }
  &.resize-handle-tr {
    top: -5px;
    right: -5px;
    cursor: ne-resize;
    z-index: 99;
  }
  &.resize-handle-br {
    bottom: -5px;
    right: -5px;
    cursor: se-resize;
  }
  &.resize-handle-bl {
    bottom: -5px;
    left: -5px;
    cursor: sw-resize;
  }
}
</style>
