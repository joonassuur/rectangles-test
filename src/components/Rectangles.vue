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
      <input :size="labelText.length || 1" v-model="labelText" type="text" @input="editRect" />
      <button @click="deleteRect">X</button>
    </div>
    <!-- <p>
      X: {{ rectX }} / Y: {{ rectY }} - Width: {{ rectWidth }} / Height:
      {{ rectHeight }}
    </p> -->
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
  data() {
    return {
      rectWidth: this.width,
      rectHeight: this.height,
      rectX: this.mouseX,
      rectY: this.mouseY,
      labelText: this.label,
    };
  },
  methods: {
    deleteRect() {
      this.$store.dispatch('deleteRect', {
        uuid: this.uuid,
      });
    },
    editRect(xPos, yPos, width, height) {
      console.log(this.labelText)
      if (xPos && yPos) {
        this.rectX = xPos;
        this.rectY = yPos;
      }
      if (width && height) {
        this.rectWidth = width;
        this.rectHeight = height;
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
  },
  components: {
    VueDraggableResizable,
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
.draggable  {
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
    color: white;
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
