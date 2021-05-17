<template>
  <div class="project-data">
    <div class="data-name">{{ dataName }}</div>
    <div class="data-value">{{ dataValue }}</div>
  </div>
</template>
<script>
/* eslint-disable */

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
  padding-top: 0.85em;
  .data-name {
    color: #006eb5;
    font-size: 12px;
    text-transform: uppercase;
  }
  .data-value {
    font-size: 14px;
    color: #34394c;
  }
}
</style>
