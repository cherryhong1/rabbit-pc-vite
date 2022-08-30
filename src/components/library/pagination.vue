<template>
  <div class="pagination">
    <a v-if="myCurPage <= 1" href="javascript:;" class="disabled">上一页</a>
    <a v-else href="javascript:;" @click="changePage(myCurPage - 1)">上一页</a>
    <span v-if="pager.start > 1">...</span>
    <a
      href="javascript:;"
      v-for="i in pager.btnArr"
      :key="i"
      :class="{ active: i === myCurPage }"
      @click="changePage(i)"
      >{{ i }}</a
    >
    <span v-if="pager.end < pager.pageCounter">...</span>
    <a v-if="myCurPage >= pager.end" href="javascript:;" class="disabled"
      >下一页</a
    >
    <a v-else href="javascript:;" @click="changePage(myCurPage + 1)">下一页</a>
  </div>
</template>

<script setup name="pagination">
import { computed, ref, watch } from "vue";
const props = defineProps({
  total: {
    type: Number,
    default: 100,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  curPage: {
    type: Number,
    default: 1,
  },
});
const emits = defineEmits(['curPage-change'])
const myTotal = ref(100); // 总条数
const myPageSize = ref(10); // 每页数
const myCurPage = ref(1); // 当前页数
const btnCount = 5; // 展示按钮数

const pager = computed(() => {
  const pageCount = Math.ceil(myTotal.value / myPageSize.value); // 总页数
  let start = myCurPage.value - Math.floor(btnCount / 2);
  let end = start + btnCount - 1;
  if (start < 1) {
    start = 1;
    end = start + btnCount - 1 > pageCount ? pageCount : start + btnCount - 1;
  }
  if (end > pageCount) {
    end = pageCount;
    start = end - btnCount + 1 < 1 ? 1 : end - btnCount + 1;
  }
  const btnArr = [];
  for (let i = start; i <= end; i++) {
    btnArr.push(i);
  }
  return { pageCount, start, end, btnArr };
});
watch(
  props,
  () => {
    myCurPage.value = props.curPage;
    myPageSize.value = props.pageSize;
    myTotal.value = props.total;
  },
  {
    immediate: true,
  }
);
const changePage = (newPage) => {
  myCurPage.value = newPage;
  emits('curPage-change',newPage)
};
</script>

<style lang="less" scoped>
.pagination {
  display: flex;
  justify-content: center;
  padding: 30px;
  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 5px;
    &:hover {
      color: @xtxColor;
    }
    &.active {
      color: #fff;
      background-color: @xtxColor;
      border-color: @xtxColor;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333;
      }
    }
  }
}
</style>
