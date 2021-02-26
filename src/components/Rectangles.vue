<template>
  <vue-draggable-resizable
    :w="rectWidth"
    :h="rectHeight"
    :x="rectX"
    :y="rectY"
    @dragging="editRect"
    @resizing="editRect"
    :parent="true"
  >
    <input v-model="labelText" type="text" @input="editRect" />
    <button @click="deleteRect">del</button>
    <p>
      X: {{ rectX }} / Y: {{ rectY }} - Width: {{ rectWidth }} / Height:
      {{ rectHeight }}
    </p>
  </vue-draggable-resizable>
</template>

<script>
/* eslint-disable  */
import VueDraggableResizable from 'vue-draggable-resizable';
import 'vue-draggable-resizable/dist/VueDraggableResizable.css';

export default {
  name: 'HelloWorld',
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
    editRect(x, y, width, height) {
      if (x && y) {
        this.rectX = x;
        this.rectY = y;
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
</style>
