<template>
  <MainHeader />
  <div class="bg-white px-6 py-32 lg:px-8">
    <div class="mx-auto max-w-3xl text-base/7 text-gray-700">
      <div class="profile">
        <a href="https://dev.to/paalaman45" class="group block shrink-0">
          <div class="flex items-center">
            <div>
              <img class="inline-block size-9 rounded-full" :src="Blog.author_profile" :alt="Blog.author" />
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-gray-700 group-hover:text-gray-900">{{ Blog.author }}</p>
              <p class="text-xs font-medium text-gray-500 group-hover:text-gray-700">Posted on {{ Blog.published_date }}</p>
            </div>
          </div>
        </a>
      </div>
      <h1 class="mt-2 text-pretty text-5xl font-semibold tracking-tight text-gray-900 sm:text-3xl">{{ Blog.title }}</h1>
      <div class="info mb-5" v-if="Blog.tags.length > 0">
        <div class="flex gap-3">
          <a class="font-bold" :href="dev + tag" v-for="tag in Blog.tags" :key="tag"><span class="text-sky-400">#</span>{{ tag }}</a>
        </div>
      </div>
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
  const dev = "https://dev.to/t/";
  const Blog = reactive({
    title: '',
    content: '',
    profile: '',
    comment_count: 0,
    tags: [],
    author: '',
    author_profile: '',
    published_date: '',
  });

  const getBlogData = async() => {
    console.log("Fetching...");
    try{
      const response = await axios.get('https://dev.to/api/articles/paalaman45/' + slug);
      Blog.title = response.data.title;
      Blog.content = response.data.body_html;
      Blog.profile = response.data.user.profile_image;
      Blog.tags = response.data.tags;
      Blog.author = response.data.user.name;
      Blog.author_profile = response.data.user.profile_image_90;
      Blog.published_date = response.data.readable_publish_date;
      console.log(response.data)
    }catch(error){
      console.log(error);
    }
  }
  onMounted(getBlogData);
</script>
