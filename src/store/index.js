import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [new VuexPersistence().plugin],
  state: {
    rectangles: [],
  },
  mutations: {
    pushRectangles(state, rect) {
      state.rectangles.push(rect);
    },
    deleteRectangle(state, { uuid }) {
      state.rectangles.forEach((rect, index) => {
        if (rect.uuid === uuid) {
          state.rectangles.splice(index, 1);
        }
      });
    },
    modifyRectangles(state, newData) {
      state.rectangles.forEach((rect, index) => {
        if (rect.uuid === newData.uuid) {
          state.rectangles[index] = newData;
        }
      });
    },
  },
  actions: {
    addRect(context, rect) {
      context.commit('pushRectangles', rect);
    },
    deleteRect(context, uuid) {
      context.commit('deleteRectangle', uuid);
    },
    modifyRect(context, newData) {
      context.commit('modifyRectangles', newData);
    },
  },
  modules: {},
});
