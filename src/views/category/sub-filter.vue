<template>
  <div class="sub-filter" v-if="filtersData && !filtersLoading">
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <span
          v-for="brand in filtersData.brands"
          :key="brand.id"
          :class="{ active: filtersData.selectedBrand === brand.id }"
          @click="changeBrand(brand.id)"
          >{{ brand.name }}</span
        >
      </div>
    </div>
    <div class="item" v-for="p in filtersData.saleProperties" :key="p.id">
      <div class="head">{{ p.name }}:</div>
      <div class="body">
        <span :class="{active:p.selectedProp === attr.id}" v-for="attr in p.properties" :key="attr.id" @click="changeAttr(p,attr.id)">
          {{ attr.name }}</span
        >
      </div>
    </div>
  </div>
  <div class="sub-filter" v-else>
    <skeleton class="item" width="800px" height="40px"></skeleton>
    <skeleton class="item" width="800px" height="40px"></skeleton>
    <skeleton class="item" width="600px" height="40px"></skeleton>
    <skeleton class="item" width="600px" height="40px"></skeleton>
    <skeleton class="item" width="600px" height="40px"></skeleton>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { findSubCategory } from "@/api/category";
import { ref, watch } from "vue";

const emits = defineEmits(["filter-change"]);
const route = useRoute();
let filtersData = ref([]);
let filtersLoading = ref(false);
watch(
  () => route.params.id,
  (newVal) => {
    if (newVal && route.path === `/category/sub/${route.params.id}`) {
      filtersLoading.value = true;
      findSubCategory(route.params.id).then((res) => {
        res.result.selectedBrand = null;
        res.result.brands.unshift({
          id: null,
          name: "全部",
        });
        res.result.saleProperties.forEach((item) => {
          item.selectedProp = undefined;
          item.properties.unshift({
            id: null,
            name: "全部",
          });
        });
        filtersData.value = res.result;
        filtersLoading.value = false;
      });
    }
  },
  {
    immediate: true,
  }
)

const getFilterParams = () => {
  const filterParams = {};
  const attrs = [];
  filterParams.brandId = filtersData.value.selectedBrand;
  filtersData.value.saleProperties.forEach((item) => {
    const attr = item.properties.find((p) => p.id === item.selectedProp);
    if (attr && attr.id !== undefined) {
      attrs.push({
        groupName: item.name,
        propertyName: attr.name,
      });
    }
  });
  if (attrs.length) filterParams.attrs = attrs;
  return filterParams;
};

const changeBrand = (brandId) => {
  if (filtersData.value.selectedBrand === brandId) return;
  filtersData.value.selectedBrand = brandId;
  emits("filter-change", getFilterParams());
};

const changeAttr = (p, attrId) => {
  if (p.selectedProp === attrId) return;
  p.selectedProp = attrId;
  emits("filter-change", getFilterParams());
};

</script>

<style lang="less" scoped>
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      span {
        margin-right: 36px;
        transition: all 1s;
        display: inline-block;
        &:hover,
        &.active {
          color: @xtxColor;
        }
      }
    }
  }
  .skeleton {
    padding: 10px 0;
  }
}
</style>
