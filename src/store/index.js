import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Users:[],
    id:10,
    temp:"",
  },
  getters: {
    getUsers(state){
      return state.Users;
    },
    getTemp(state){
      return state.temp;
    }

  },
  mutations: {
    userNow(state,payload){
      state.temp=payload;
    },
    addUser(state,payload){
      state.id++;
      payload.id=state.id;
      state.Users.unshift(payload)
    },
    setUsers(state,payload){
      state.Users=payload;
      state.id=10;
    },
    setNewUsers(state,payload){
      state.Users=payload;
    },
    deleteUser(state,payload){
      state.Users=state.Users.filter(e=>e.id!=payload);
    }
  },
  actions: {
    editUser(state,payload){
      let datanew=[];
      let data=Array.from(state.getters.getUsers);
      for(let i=0;i<data.length;i++){
        data[i].id==payload.id?datanew.push(payload):datanew.push(data[i]);
      }
    this.commit('setNewUsers',datanew);
    },
    
  },
  modules: {
  }
})
