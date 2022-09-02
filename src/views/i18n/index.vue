<template>
  <div>
    <button class="btn" @click="switchLocale">{{t('locale')}}</button>
    <div>{{t('nav.personalCenter')}}</div>
  </div>
</template>

<script setup>
import useLocale from "@/hooks/useLocale";
const { i18n:{t},
    currentLocale,
    changeLocate } = useLocale()
    const switchLocale = () => {
      if(currentLocale.value ==='zh-cN'){
        changeLocate('en-US')
      }else{
        changeLocate('zh-cN')
      }
    }
</script>

<style lang="less" scoped></style>
