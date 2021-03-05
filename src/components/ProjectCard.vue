<template>
  <div class="project-card">
    <div class="header-area">
      <h2>{{ projectName }}</h2>
      <div class="edit-project"></div>
    </div>
    <div class="data-container">
      <ProjectData name="Area Size" :value="areaSize" />
      <ProjectData name="Area Name" :value="areaName" />
      <ProjectData name="Observation Points" :value="observationPoints" />
      <ProjectData name="Species Detected" :value="speciesDetected" />
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import '../../node_modules/veera-styles/scss/main.scss';
import ProjectData from '../components/ProjectData.vue';

export default {
  name: 'ProjectCard',
  props: {
    data: Object,
  },
  components: {
    ProjectData,
  },
  data() {
    return {
      projectName: this.data.projectName,
      areaName: this.data.areaName,
      areaSize: this.data.areaSize,
      observationPoints: this.data.observationPoints,
      speciesDetected: this.data.speciesDetected,
    };
  },
  methods: {},
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.project-card {
  border: 1px solid;
  text-align: left;
  margin: 0.5em;
  padding: 0.5em;
  max-width: 375px;
  width: 100%;
  .data-container {
      flex-wrap: wrap;
      display: flex;
  }
}
</style>
