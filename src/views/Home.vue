<template>
  <div class="rectangles-container" @mousedown="addRect">
    <template v-for="(rect) in rectangles">
      <Rectangles
        :key="rect.uuid"
        :uuid="rect.uuid"
        :label="rect.label"
        :mouseX="rect.mouseX"
        :mouseY="rect.mouseY"
        :width="rect.width"
        :height="rect.height"
      />
    </template>
  </div>
</template>

<script>
// @ is an alias to /src
import { uuid } from 'vue-uuid';
import Rectangles from '@/components/Rectangles.vue';

export default {
  name: 'Home',
  components: {
    Rectangles,
  },
  computed: {
    rectangles() {
      return this.$store.state.rectangles;
    },
  },
  methods: {
    addRect(e) {
      if (e.target.className === 'rectangles-container') {
        this.$store.dispatch('addRect', {
          mouseX: e.offsetX,
          mouseY: e.offsetY,
          label: '',
          width: 150,
          height: 150,
          uuid: uuid.v4(),
        });
      }
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.rectangles-container {
  height: 700px;
  width: 1000px;
  margin: 0 auto;
  border: 1px solid red;
  position: relative;
}
</style>
