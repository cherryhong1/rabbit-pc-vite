import { createI18n } from 'vue-i18n';

// 自定义国际化文件
import zh_CN from './lang/zh_CN';
import en_US from './lang/en_US';

const defaultLocale = localStorage.getItem('locale') || 'en-US'
const i18n = createI18n({
    legacy: false, // Composition API 模式
    globalInjection: true, // 全局注册 $t方法
    allowComposition:true,
    // 默认语言
    locale: 'zh_CN',
    // 语言库
    messages: {
        zh_CN: zh_CN,
        en_US: en_US
    }
})
export default i18n;
