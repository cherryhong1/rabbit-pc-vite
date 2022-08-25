<template>
  <div class="city" ref="target">
    <div class="select" :class="{ active: visible }">
      <span class="placeholder" @click="toggleOpen">{{fullLocation}}</span>
      <span class="value"></span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="visible">
      <div class="loading" v-if="loading"></div>
      <template v-else>
        <span
          class="ellipsis"
          v-for="cur in curList"
          :key="cur.code"
          @click="changeCity(cur)"
          >{{ cur.name }}</span
        >
      </template>
    </div>
  </div>
</template>

<script setup name="city">
import { computed, reactive, ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { getCityData } from "@/api/cityData";

const props = defineProps({
  fullLocation: {
    type: String,
    default: "",
  },
});
const emits = defineEmits(["change"]);
const visible = ref(false);
const loading = ref(false);
const cityData = ref([]);
const changeResult = reactive({
  provinceCode: "",
  provinceName: "",
  cityCode: "",
  cityName: "",
  countyCode: "",
  countyName: "",
  fullLocation: "",
});

const openDialog = () => {
  visible.value = true;
  loading.value = true;
  getCityData().then((res) => {
    cityData.value = res;
    loading.value = false;
  });
  for (const key in changeResult) {
    changeResult[key] = "";
  }
};
const curList = computed(() => {
  let curList = cityData.value;
  if (changeResult.provinceCode) {
    curList = curList.find(
      (p) => p.code === changeResult.provinceCode
    ).areaList;
  }
  if (changeResult.cityCode) {
    curList = curList.find((c) => c.code === changeResult.cityCode).areaList;
  }
  return curList;
});
const closeDialog = () => {
  visible.value = false;
};
const toggleOpen = () => {
  if (visible.value) {
    closeDialog();
  } else {
    openDialog();
  }
};

const target = ref(null);
onClickOutside(target, () => {
  closeDialog();
});

const changeCity = (item) => {
  if (item.level === 0) {
    changeResult.provinceCode = item.code;
    changeResult.provinceName = item.name;
  }
  if (item.level === 1) {
    changeResult.cityCode = item.code;
    changeResult.cityName = item.name;
  }
  if (item.level === 2) {
    changeResult.countyCode = item.code;
    changeResult.countyName = item.name;
    changeResult.fullLocation = `${changeResult.provinceName} ${changeResult.cityName} ${changeResult.countyName}`;
    closeDialog();
    emits("change", changeResult);
  }
};
</script>

<style lang="less" scoped>
.city {
  display: inline-block;
  position: relative;
  margin-left: 5px;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.visible {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    .iconfont {
      font-size: 12px;
      padding-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    min-height: 30px;
    background: #fff;
    padding: 10px;
    > span {
      width: 130px;
      cursor: pointer;
      text-align: center;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
    .loading {
      height: 290px;
      width: 100%;
      background: url("http://erabbit.itheima.net/img/load.88daf935.gif")
        no-repeat center / contain;
    }
  }
}
</style>
