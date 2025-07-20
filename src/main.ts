import './assets/main.css'
import 'primeicons/primeicons.css';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import router from './router';

import { createApp } from 'vue';
import App from './App.vue';
// import ElementPlus from 'element-plus';
// import 'element-plus/dist/index.css';
// import * as ElementPlusIconsVue from '@element-plus/icons-vue';
// import zhCN from 'element-plus/dist/locale/zh-cn.mjs';

const app = createApp(App);

// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component);
// }

// app.use(ElementPlus, {
//   locale: zhCN
// });
app.use(router); // import vue router
// app.use(ElementPlus);
app.use(Toast);

app.mount('#app');
