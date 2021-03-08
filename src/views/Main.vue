<template>
  <div class="main">
    <template v-for="(project, index) in getCardData">
      <ProjectListItem :key="index" :data="project" />
    </template>
  </div>
</template>
<script>
import cardData from '../mockAPI/cardData.json';
import ProjectListItem from '../components/ProjectListItem.vue';

export default {
  name: 'Main',
  components: {
    ProjectListItem,
  },
  computed: {
    getCardData() {
      return cardData.projects;
    },
  },
  methods: {},
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.main {
  display: flex;
    flex-wrap: wrap;

}
</style>
