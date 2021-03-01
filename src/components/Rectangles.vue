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
      <input v-model="labelText" type="text" @input="editRect" />
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
.label-button {
  display: flex;
  justify-content: space-between;
  position: relative;
  top: -25px;
  left: -2px;
  input {
    border: none;
    background: rgb(107, 212, 8);
    color: white;
    padding: 5px;
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

.resize-handle-br {
  bottom: 0px;
  right: 0px;
  cursor: se-resize;
  width: 15px;
  height: 15px;
  background: #6bd408;
  position: absolute;
  box-sizing: border-box;
}
// .resize-handle-bl {
//   bottom: -10px;
//   left: -10px;
//   cursor: sw-resize;
//   width: 10px;
//   height: 10px;
//   background: #6bd408;
//   border: 1px solid #333;
//   position: absolute;
//   box-sizing: border-box;
// }
// .resize-handle-bm {
//   bottom: -10px;
//   left: 50%;
//   margin-left: -5px;
//   cursor: s-resize;
//   width: 10px;
//   height: 10px;
//   background: #6bd408;
//   border: 1px solid #333;
//   position: absolute;
//   box-sizing: border-box;
// }
</style>
