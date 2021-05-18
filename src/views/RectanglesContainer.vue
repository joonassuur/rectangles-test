<template>
  <div
    :style="{
      height: height + 'px',
      backgroundImage:
        'url(https://cdn.britannica.com/57/92857-050-8D5A0A8E/bull-moose-water.jpg)',
    }"
    class="rectangles-container"
    @mousedown="addRect"
  >
    <img
      id="image-tag"
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
  data() {
    return {
      height: null,
    };
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
    resizeContainer() {
      const image = document.querySelector('#image-tag');
      image.style.display = 'block';
      this.height = image.getBoundingClientRect().height;
      image.style.display = 'none';
    },
  },
  mounted() {
    this.resizeContainer();
    window.addEventListener('resize', this.resizeContainer);
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
    visibility: hidden;
    position: relative;
    width: 100%;
  }
}
</style>
