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
          width: 100,
          height: 100,
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
  height: 500px;
  width: 100%;
  margin: 0 auto;
  border: 1px solid red;
  position: relative;
}
</style>
