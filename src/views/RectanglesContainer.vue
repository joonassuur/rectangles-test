<template>
  <div
    class="rectangles-container"
    @mousedown="addRect"
  >
    <img
      src="https://cdn.britannica.com/57/92857-050-8D5A0A8E/bull-moose-water.jpg"
      alt=""
    />
    <template v-for="rect in rectangles">
      <Rectangle
        :key="rect.uuid"
        :uuid="rect.uuid"
        :label="rect.label"
        :x="rect.x"
        :y="rect.y"
        :width="rect.width"
        :height="rect.height"
      />
    </template>
  </div>
</template>

<script>
import { uuid } from 'vue-uuid';
import Rectangle from '../components/Rectangle.vue';

export default {
  name: 'RectanglesContainer',
  components: {
    Rectangle,
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
          x: e.offsetX,
          y: e.offsetY,
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
  width: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  max-width: 1000px;
  margin: 0 auto;
  border: 1px solid red;
  position: relative;
  img {
    position: relative;
    width: 100%;
    z-index: -1;
  }
}
</style>
