<template>
  <div class="bg-gray-900 py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto">
        <h2 class="text-pretty text-4xl font-semibold tracking-tight text-white sm:text-5xl">{{ projectData.title }}</h2>
        <p class="mt-6 text-lg/8 text-gray-300">{{ projectData.description }}</p>
      </div>
      <ul role="list" class="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4">
        <li v-for="project in projectLists" :key="project.project_Name">
          <img class="aspect-[14/13] w-full rounded-2xl object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80" alt="" />
          <h3 class="mt-6 text-lg/8 font-semibold tracking-tight text-white">{{ project.project_Name }}</h3>
          <!-- <p class="text-base/7 text-gray-300">{{ person.role }}</p>
          <p class="text-sm/6 text-gray-500">{{ person.location }}</p> -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { db } from '../../firebase/firebase.js';
  import { addDoc, collection, doc, getDoc, getDocs, query } from 'firebase/firestore';

  const projectData = ref({
    title: '',
    description: ''
  });
  const projectLists = ref(null);

  const fetchProjectInfo = async () => {
    try {
      // Reference to the specific document in Firestore
      const docRef = doc(db, 'projects', 'project_info');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // Save the data to projectData
        projectData.value = docSnap.data();
        console.log('Project data fetched successfully:', projectData.value);
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching project data:', error);
    }
  };

  const getProjectLists = async() => {
    const projects = [];
    try {
      const projectListRef = collection(db, "project_list");
      const q = query(projectListRef);
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const project = {
          project_Name: doc.data().project_name,
          project_Link: doc.data().project_link,
        };
        projects.push(project);
      });
      projectLists.value = projects;
      console.log('Project list fetched successfully:', projectLists.value);
    } catch (error) {
      console.error('Error fetching project list:', error);
    }
  };
  onMounted(fetchProjectInfo);
  onMounted(getProjectLists);

  const people = [
    {
      name: 'Leslie Alexander',
      role: 'Co-Founder / CEO',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
      location: 'Toronto, Canada',
    },
    // More people...
  ]
</script>
project_description
""
(string)


project_image
""
(string)


project_link
"http://tiny.kvpaalaman.site/"
(string)


project_name
"URL Shortener"
(string)


project_type
"Vue"