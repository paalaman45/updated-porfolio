<template>
  <div class="bg-white px-6 py-32 lg:px-8">
    <div class="mx-auto max-w-3xl text-base/7 text-gray-700">
      <h1 class="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">{{ Blog.title }}</h1>
      <div v-html="Blog.content" class="mt-2"></div>
    </div>
  </div>
</template>

<script setup>
  import { useRoute } from 'vue-router';
  import { onMounted, reactive } from 'vue';
  import { db } from '@/firebase/firebase';
  import { getDoc, doc } from 'firebase/firestore';

  const route = useRoute();
  const BlogID = route.params.id;
  const Blog = reactive({
    title: '',
    content: '',
  });

  const getBlogData = async() => {
    console.log("Fetching...");
    try{
      const docRef = doc(db, 'blogs', BlogID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        Object.assign(Blog, docSnap.data());
        console.log(docSnap.data().content);
      } else {
        console.log('No such document!');
      }
    }catch(error){
      console.log(error);
    }
  }
  onMounted(getBlogData);
</script>
