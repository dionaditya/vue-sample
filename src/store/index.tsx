import Vue from 'vue'
import titanic from "@/assets/titanic.json";
import { List } from "linqts";
import { Filter, User } from "../interface";
import MiniSearch from 'minisearch'
import Vuex from "vuex";

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    users: titanic
  },
  mutations: {
    SET_USERS: (state, users) => {
      state.users = [...users];
    }
  },
  actions: {
    SET_USERS: (context, filter?: Filter) => {
      if (filter) {
        const filterUser = (data: User[]) => {
          const userList = new List(data);
          const filteredList = userList.Where(user => {
            return filter.age && filter.gender
              ? user?.age === +filter.age && user.sex === filter.gender
              : filter.age
              ? user?.age === +filter.age
              : filter.gender
              ? user?.sex === filter.gender
              : true;
          });
          return filteredList.ToArray()
        }
        if (filter.name) {
          const miniSearch = new MiniSearch({
            fields: ["name"], // fields to index for full-text search,
            storeFields: ['id', 'name'] 
          })
          const origin = titanic.map((val, i) => {
            return {
              ...val,
              id: i
            }
          })
          miniSearch.addAll(origin)
          const result = miniSearch.search(filter.name);
          const resultSearch = new List(result)
          const originList = new List(origin)
          const resultList = originList.Join(
            resultSearch, 
            passenger => passenger.id, 
            searchResult => searchResult.id, 
            (passenger, _) => passenger
          )
          const filteredUser = filterUser(resultList.ToArray())
          context.commit("SET_USERS", filteredUser);
        } else {
          const filteredUser = filterUser(titanic)
          context.commit("SET_USERS", filteredUser);
        }
      } else {
        context.commit("SET_USERS", titanic);
      }
    }
  }
});
