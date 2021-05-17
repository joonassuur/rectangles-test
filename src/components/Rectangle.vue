<template>
  <vue-draggable-resizable
    :style="{
      width: rectWidthPer + '%',
      height: rectHeightPer + '%',
      left: rectXPer + '%',
      top: rectYPer + '%',
      transform: 'inherit',
    }"
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
    mouseX: Number,
    mouseY: Number,
    label: String,
    width: Number,
    height: Number,
    uuid: String,
  },
  components: {
    VueDraggableResizable,
  },
  data() {
    return {
      rectWidth: this.width,
      rectHeight: this.height,
      rectX: this.mouseX,
      rectY: this.mouseY,
      labelText: this.label,

      rectWidthPer: undefined,
      rectHeightPer: undefined,
      rectXPer: undefined,
      rectYPer: undefined,

      parentContainerRef: {},
    };
  },
  methods: {
    deleteRect() {
      this.$store.dispatch('deleteRect', {
        uuid: this.uuid,
      });
    },
    editRect(xPos, yPos, width, height) {
      if (xPos !== undefined && yPos !== undefined) {
        this.rectX = xPos;
        this.rectY = yPos;
        this.rectXPer = (xPos / this.parentContainerRef.offsetWidth) * 100;
        this.rectYPer = (yPos / this.parentContainerRef.offsetHeight) * 100;
      }
      if (width !== undefined && height !== undefined) {
        this.rectWidth = width;
        this.rectHeight = height;
        this.rectWidthPer = (width / this.parentContainerRef.offsetWidth) * 100;
        this.rectHeightPer =
          (height / this.parentContainerRef.offsetHeight) * 100;
      }
      this.$store.dispatch('modifyRect', {
        mouseX: this.rectX,
        mouseY: this.rectY,
        width: this.rectWidth,
        height: this.rectHeight,
        label: this.labelText,
        uuid: this.uuid,
      });
    },
    calculateContainerDims() {
      this.parentContainerRef = this.$parent.$el;
      const parentWidth = this.parentContainerRef.getBoundingClientRect().width;
      const parentHeight = this.parentContainerRef.getBoundingClientRect()
        .height;
      this.rectWidthPer = (this.rectWidth / parentWidth) * 100;
      this.rectHeightPer = (this.rectHeight / parentHeight) * 100;

      const rectXPer = (this.rectX / parentWidth) * 100;
      const rectYPer = (this.rectY / parentHeight) * 100;

      this.rectXPer = rectXPer;
      this.rectYPer = rectYPer;
    },
  },
  mounted() {
    this.calculateContainerDims();
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
