import Vue from 'vue';
import VueRouter from 'vue-router';
import AboutPage from '@/components/AboutPage.vue';
import ContactPage from '@/components/ContactPage.vue';
import HomePage from '@/components/HomePage.vue';
import YaSuoZhuanHuan from '@/components/YaSuoZhuanHuan.vue';
import Base64ToPng from "@/components/Base64ToPng.vue";
import PngToBase64 from "@/components/PngToBase64.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: '/AboutPage',
        name: 'AboutPage',
        component: AboutPage
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
        path: '/',
        name: 'index',
        component: YaSuoZhuanHuan
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});
export default router
