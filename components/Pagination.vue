<template>
  <div class="pagination">
    <button class="page__btn" @click="onPrevPage">Prev</button>
    <div class="page__numbers flex gap-4">
      <div
        v-for="i in 4"
        :key="i"
        class="page"
        :class="{ page__active: i === currentPage }"
        @click="onChangePage(i)"
      >
        {{ i }}
      </div>
    </div>
    <button class="page__btn" @click="onNextPage">Next</button>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Pagination',

  computed: {
    currentPage() {
      return Number(this.$route.query.page || 1);
    },
  },

  methods: {
    onChangePage(page: number) {
      this.$emit('change-page', page);
    },

    onNextPage() {
      if (this.currentPage < 4) {
        this.$emit('change-page', this.currentPage + 1);
      }
    },

    onPrevPage() {
      if (this.currentPage > 1) {
        this.$emit('change-page', this.currentPage - 1);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  gap: 60px;
  justify-content: center;
  align-items: center;

  .page__numbers {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 30px;
    height: 30px;
    border-radius: 8px;
    cursor: pointer;
    color: #9e9e9e;

    .page__active {
      padding: 4px 8px;
      border-radius: 4px;
      color: white !important;
      background-color: #448aff;
    }

    .page:hover {
      color: #448aff;
    }
  }

  .page__btn {
    cursor: pointer;
    color: #9e9e9e;
    border: none;
    background-color: white;

    &:hover {
      color: #448aff;
    }
  }
}
</style>
