<template>
  <MainHeader />
  <div class="bg-white px-6 py-32 lg:px-8">
    <div class="mx-auto max-w-3xl text-base/7 text-gray-700">
      <h1 class="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">{{ Blog.title }}</h1>
      <div v-html="Blog.content" class="mt-2 content"></div>
    </div>
  </div>

  <MainFooter />
</template>

<script setup>
  import { useRoute } from 'vue-router';
  import { onMounted, reactive } from 'vue';
  import { db } from '@/firebase/firebase';
  import { getDoc, doc } from 'firebase/firestore';
  import MainHeader from '@/components/header/MainHeader.vue';
  import MainFooter from '@/components/footer/Footer.vue';
  import axios from 'axios';

  const route = useRoute();
  const slug = route.params.id;
  const Blog = reactive({
    title: '',
    content: '',
  });

  const getBlogData = async() => {
    console.log("Fetching...");
    try{
      const response = await axios.get('https://dev.to/api/articles/paalaman45/' + slug);
      Blog.title = response.data.title;
      Blog.content = response.data.body_html;
      console.log(response.data);
    }catch(error){
      console.log(error);
    }
  }
  onMounted(getBlogData);
</script>
