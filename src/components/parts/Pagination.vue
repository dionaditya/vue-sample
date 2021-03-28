<template>
  <b-pagination
    :total="total"
    v-model="current"
    :range-before="rangeBeforePage"
    :range-after="rangeAfterPage"
    :order="orderPage"
    :size="sizePage"
    :simple="isSimpleStyle"
    :rounded="isRoundedStyle"
    :per-page="perPageCount"
    :icon-prev="prevIcon"
    :icon-next="nextIcon"
    @change="handleChangePage"
    aria-next-label="Next page"
    aria-previous-label="Previous page"
    aria-page-label="Page"
    aria-current-label="Current page"
  >
  </b-pagination>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: 'pagination',
  props: [
    "total",
    "current",
    "rangeBefore",
    "rangeAfter",
    "order",
    "size",
    "isSimple",
    "isRounded",
    "perPage",
    "arrow"
  ],
  data() {
    return {
      rangeBeforePage: this.rangeBefore || 3,
      rangeAfterPage: this.rangeAfter || 1,
      orderPage: this.order || '',
      sizePage: this.size || '',
      isSimpleStyle: this.isSimple || false,
      isRoundedStyle: this.isRounded || false ,
      perPageCount: this.perPage || 10,
      prevIcon: this.arrow || "chevron-left",
      nextIcon: this.arrow || "chevron-right",
    };
  },
  mounted() {
    console.log(this.total)
  },
  methods: {
    handleChangePage(currentPage) {
      this.$emit('changed', currentPage)
    }
  },
  watch: { 
    total: function(newVal, oldVal) { // watch it
      console.log('Prop changed: ', newVal, ' | was: ', oldVal)
    }
  }
});
</script>

<style scoped></style>