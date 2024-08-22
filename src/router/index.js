import Vue from 'vue';
import VueRouter from 'vue-router';
import ContactPage from '@/components/ContactPage.vue';
import HomePage from '@/components/HomePage.vue';
import YaSuoZhuanHuan from '@/components/YaSuoZhuanHuan.vue';
import Base64ToPng from "@/views/yasuozhuanhuan/Base64ToPng.vue";
import PngToBase64 from "@/views/yasuozhuanhuan/PngToBase64.vue";

import ZhiZuoShengCheng from '@/components/ZhiZuoShengCheng.vue';
import BiaoZhu from "@/views/zhizuoshengcheng/BiaoZhu.vue";

Vue.use(VueRouter);

const routes = [

    {
        path: '/',
        name: 'index',
        component: YaSuoZhuanHuan
    },

    {
        path: '/ContactPage',
        name: 'ContactPage',
        component: ContactPage
    },
    {
        path: '/HomePage',
        name: 'HomePage',
        component: HomePage
    },
    {
        path: '/YaSuoZhuanHuan',
        name: 'YaSuoZhuanHuan',
        component: YaSuoZhuanHuan,
    },
    {
        path: '/Base64ToPng',
        name: 'Base64ToPng',
        component: Base64ToPng
    },
    {
        path: '/PngToBase64',
        name: 'PngToBase64',
        component: PngToBase64
    },
    {
        path: '/ZhiZuoShengCheng',
        name: 'ZhiZuoShengCheng',
        component: ZhiZuoShengCheng
    },
    {
        path: '/BiaoZhu',
        name: 'BiaoZhu',
        component: BiaoZhu
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});
export default router
