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
    modifyRectangles(state, newData) {
      state.rectangles.forEach((rectangle, index) => {
        if (index === newData.index) {
          state.rectangles[index] = newData;
        }
      });
    },
  },
  actions: {
    addRect(context, rect) {
      context.commit('pushRectangles', rect);
    },
    modifyRect(context, newData) {
      context.commit('modifyRectangles', newData);
    },
  },
  modules: {},
});
