<template>
  <div class="main">
    <template v-for="(project, index) in getCardData">
      <ProjectCard :key="index" :data="project" />
    </template>
  </div>
</template>
<script>
import cardData from '../mockAPI/cardData.json';
import ProjectCard from '../components/ProjectCard.vue';

export default {
  name: 'Main',
  components: {
    ProjectCard,
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
}
</style>
