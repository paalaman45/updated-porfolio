<script setup>
  import MainHeader from './components/header/MainHeader.vue';
  import MainFooter from './components/footer/Footer.vue';
</script>

<template>
  <MainHeader />
  <RouterView />
  <MainFooter />
</template>
