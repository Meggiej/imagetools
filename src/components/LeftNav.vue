<template>
  <div class="left-nav">
    <ul>
      <li v-for="(item, index) in menuItems" :key="index">
        <router-link :to="item.path">{{ item.name }}</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menuItems: [
        { name: 'Home', path: '/HomePage' },
        { name: 'About', path: '/AboutPage' },
        { name: 'Contact', path: '/ContactPage' }
      ]
    };
  }
};
</script>