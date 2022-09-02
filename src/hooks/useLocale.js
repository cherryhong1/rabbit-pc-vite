import Message from "@/components/library/message/message";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
export default function useLocale() {
  const i18n = useI18n()
  const currentLocale = computed(() =>{
    return i18n.locale.value
  })
  const changeLocate = (value) =>{
    i18n.locale.value = value
    localStorage.setItem('locale',value)
    Message({type:'success',text:i18n.t('locale')})
  }
  return {
    i18n,
    currentLocale,
    changeLocate
  }
}