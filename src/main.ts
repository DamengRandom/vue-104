import './assets/main.css'
import 'primeicons/primeicons.css';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import router from './router';

import { createApp } from 'vue';
import App from './App.vue';
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';
// import ElementPlus from 'element-plus';
// import 'element-plus/dist/index.css';
// import * as ElementPlusIconsVue from '@element-plus/icons-vue';
// import zhCN from 'element-plus/dist/locale/zh-cn.mjs';

const app = createApp(App);

// Create a QueryClient instance
const queryClient = new QueryClient();

// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component);
// }

// app.use(ElementPlus, {
//   locale: zhCN
// });
app.use(router); // import vue router
// app.use(ElementPlus);
app.use(Toast);
app.use(VueQueryPlugin, { queryClient });

app.mount('#app');
