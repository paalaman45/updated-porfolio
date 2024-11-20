<template>
  <div class="bg-gray-900 py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:text-center">
        <img class="inline-block size-40 rounded-full" :src="ProfilePic" alt="Kissel James Profile Picture" />
        <h2 class="text-base/7 font-semibold text-indigo-600">{{ PersonalData.name }}</h2>
        <p class="mt-2 text-pretty text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-balance">{{ PersonalData.label }}</p>
        <p class="mt-6 text-lg/8 text-gray-100">{{ PersonalData.description }}</p>
      </div>
      <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          <div v-for="service in services" :key="service.name" class="relative pl-16">
            <dt class="text-base/7 font-semibold text-gray-100">
              <div class="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                <component :is="service.icon" class="size-6 text-white" aria-hidden="true" />
              </div>
              {{ service.name }}
            </dt>
            <dd class="mt-2 text-base/7 text-gray-200">{{ service.description }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/vue/24/outline';
  import ProfilePic from '@/assets/images/profile.png';
  import { ref, onMounted, reactive } from 'vue';
  import { db } from '../../firebase/firebase.js';
  import { addDoc, collection, doc, getDoc, getDocs, query } from 'firebase/firestore';

  const services = [
    {
      name: 'Web Hosting',
      description: 'Weekly Backups, SSL Certificate, Security Updates',
      icon: CloudArrowUpIcon,
    },
    {
      name: 'Web Development',
      description: 'Laravel, Vue, Hosting & Security',
      icon: CloudArrowUpIcon,
    },
    {
      name: 'Web Design',
      description: 'WordPress, Mobile Responsiveness, Hosting & Security',
      icon: CloudArrowUpIcon,
    },
    {
      name: 'Maintenance & Security',
      description: 'Manage Website, DDOS Protection, Weekly Backups',
      icon: CloudArrowUpIcon,
    }
  ];

  const PersonalData = reactive({
    name: '',
    label: '',
    description: ''
  });

  const getPersonalInfo = async () => {
    try{
      const docRef = doc(db, 'profile_info', 'VearSU60piXlB3csfeaB');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // Save the data to projectData
        PersonalData.name = docSnap.data().name;
        PersonalData.label = docSnap.data().label;
        PersonalData.description = docSnap.data().description;
        console.log("Name: " + PersonalData.name);
        console.log("Label: " + PersonalData.label);
        console.log("Description: " + PersonalData.description);
      } else {
        console.log('No such document!');
      }
    }catch(error){
      console.error('Error fetching project data:', error);
    }
  }
  getPersonalInfo();
</script>
