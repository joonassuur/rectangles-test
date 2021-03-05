<template>
  <div class="project-data">
    <div class="data-name">{{ dataName }}</div>
    <div class="data-value">{{ dataValue }}</div>
  </div>
</template>
<script>
/* eslint-disable */
import '../../node_modules/veera-styles/scss/main.scss';

export default {
  name: 'ProjectCard',
  props: {
    name: String,
    value: String,
  },
  data() {
    return {
      dataName: this.name,
      dataValue: this.value,
    };
  },
  methods: {},
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.project-data {
  flex: 1 0 50%;
  flex-direction: column;
  text-align: left;
  padding: 0.5em 0;
  .data-name {
    color: #006eb5;
    text-transform: uppercase;
  }
}
</style>
