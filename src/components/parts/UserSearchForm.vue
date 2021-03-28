<template>
  <div class="user-search-form">
    <div class="columns px-6 py-6">
      <div class="column is-four-fifths">
        <b-field label="Name">
          <b-input
            type="text"
            v-model="filter.name"
            :value="filter.name"
            maxlength="30"
          >
          </b-input>
        </b-field>
        <b-field label="Age">
          <b-input type="number" v-model="filter.age" :value="filter.age">
          </b-input>
        </b-field>
        <b-field label="Simple">
          <b-select
            @input="setGender(filter.gender)"
            v-model="filter.gender"
            class="custom-select is-full"
            placeholder="Select a name"
            expanded
          >
            <option
              v-for="option in options"
              :value="option.id"
              :key="option.id"
            >
              {{ option.name }}
            </option>
          </b-select>
        </b-field>
      </div>
      <div
        class="column is-flex is-flex-direction-column is-justify-content-flex-end"
      >
        <b-button @click="handleSubmit">Submit</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      options: [
        {
          id: 0,
          name: "male",
        },
        {
          id: 1,
          name: "female",
        },
      ],
      filter: {
        gender: null,
        name: "",
        age: null,
      },
    };
  },
  mounted() {
    const query = this.$route.query
    if (query) {
      this.filter = {
        ...this.filter,
        ...query
      }
      this.$store.dispatch('SET_USERS', query) 
    } else {
      this.$store.dispatch('SET_USERS') 
    }
  },
  methods: {
    handleSubmit: function () {
      const filter = {
        ...this.filter,
        age: this.filter.age,
        gender: this.options.find((option) => option.id === this.filter.gender)
          ? this.options.find((option) => option.id === this.filter.gender).name
          : null,
      };
      const query = {}
      Object.keys(filter).forEach((val) => {
        if(filter[val]) {
          if (val === 'gender') {
            query[val] = this.filter.gender
          } else {
            query[val] = filter[val]
          }
        }
      })
      this.$store.dispatch("SET_USERS", filter);
      this.$router.push({path: '/', query: query})
    },
    setGender: function (value) {
      this.gender = value;
    },
  },
});
</script>

<style scoped>
.user-search-form {
  height: 100%;
  background-color: yellow;
}
</style>
