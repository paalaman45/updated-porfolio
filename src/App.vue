<script setup>
  import MainHeader from './components/header/MainHeader.vue';
  import MainFooter from './components/footer/Footer.vue';

  import { useRoute } from 'vue-router';
  import { computed } from 'vue';
  const route = useRoute();
  
</script>

<template>
  <RouterView />
</template>
