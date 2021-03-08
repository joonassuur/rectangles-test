<template>
  <div class="project-list-item" :class="{ inactive: !isActive }">
    <div class="header-area">
      <h2>{{ name }}</h2>
      <a href="#" class="edit-project">Edit</a>
    </div>
    <div class="data-container">
      <ProjectData name="Area Size" :value="areaSize" />
      <ProjectData name="Date Range" :value="dateRange" />
      <ProjectData name="Observation Cases" :value="observationCases" />
      <ProjectData name="Species Detected" :value="speciesDetected" />
    </div>
    <div class="footer-area">
      <div v-if="!isActive" class="inactive-badge">Inactive</div>
      <a href="#" class="see-more">See more ></a>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import '../../node_modules/veera-styles/scss/main.scss';
import ProjectData from './ProjectData.vue';

export default {
  name: 'ProjectListItem',
  props: {
    data: Object,
  },
  components: {
    ProjectData,
  },
  data() {
    return {
      name: this.data.name,
      dateRange: this.data.dateRange,
      areaSize: this.data.areaSize,
      observationCases: this.data.observationCases,
      speciesDetected: this.data.speciesDetected,
      isActive: this.data.isActive,
    };
  },
  methods: {},
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.project-list-item {
  &.inactive {
    background: #f2f3f3;
    .footer-area {
      justify-content: space-between;
    }
  }
  flex: 1 0 33.33%;
  border: 1px solid #d2d3d8;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  text-align: left;
  margin: 0.5em;
  padding: 16px;
  max-width: 375px;
  width: 100%;
  .header-area {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #d2d3d8;
    padding-bottom: 8px;
    .edit-project {
      color: #005aa3;
      font-size: 14px;
    }
  }
  .data-container {
    flex-wrap: wrap;
    display: flex;
  }
  .footer-area {
    margin-top: 1em;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-top: 1px solid #d2d3d8;
    padding-top: 8px;
    .inactive-badge {
      background-color: #6b6e7d;
      border-radius: 20px;
      font-size: 11px;
      padding: 0.4em 1.7em;
      color: #fff;
    }
    .see-more {
      color: #005aa3;
      font-size: 14px;
    }
  }
}
</style>
