<template>
  <div class="container my-5">
    <user-search-form></user-search-form>
    <b-table :data="renderedData" :columns="columns"></b-table>
    <pagination
      :total="users.length"
      :perPageCount="perPage"
      :current="currentPage"
      @changed="handleChangePage"
    ></pagination>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import Vue from "vue";
import UserSearchForm from "@/components/parts/UserSearchForm.vue";
import { mapState } from "vuex";
import Pagination from "@/components/parts/Pagination.vue";
import {User} from "../interface"

interface Column {
  field: string,
  label: string
}

interface QueryParams {
  [key: string]: string | any
}

export default Vue.extend({
  components: { UserSearchForm, Pagination },
  name: "Home",
  data(): {columns: Column[], currentPage: number, perPage: number} {
    return {
      columns: [
        {
          field: "name",
          label: "Name"
        },
        {
          field: "sex",
          label: "Sex"
        },
        {
          field: "age",
          label: "Age"
        }
      ],
      currentPage: 1,
      perPage: 10
    };
  },
  mounted() {
    const query = this.$route.query;
    if (query && query["page"]) {
      this.currentPage = +query["page"];
    }
  },
  computed: {
    ...mapState(["users"]),
    renderedData(): User[] {
      const startDataIndex = this.perPage * (this.currentPage - 1);
      const endDataIndex = this.perPage * this.currentPage;
      return this.users.slice(startDataIndex, endDataIndex);
    }
  },
  methods: {
    handleChangePage(value: number) {
      this.currentPage = value;
      const query: QueryParams = {
        ...this.$route.query,
        page: this.currentPage
      };
      this.$router.push({ path: "/", query: query });
    }
  }
});
</script>
