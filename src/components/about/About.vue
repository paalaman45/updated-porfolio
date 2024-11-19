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
          <div v-for="feature in features" :key="feature.name" class="relative pl-16">
            <dt class="text-base/7 font-semibold text-gray-100">
              <div class="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                <component :is="feature.icon" class="size-6 text-white" aria-hidden="true" />
              </div>
              {{ feature.name }}
            </dt>
            <dd class="mt-2 text-base/7 text-gray-200">{{ feature.description }}</dd>
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

  const features = [
    {
      name: 'Push to deploy',
      description:
        'Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.',
      icon: CloudArrowUpIcon,
    },
    {
      name: 'SSL certificates',
      description:
        'Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget. Sem sodales gravida quam turpis enim lacus amet.',
      icon: LockClosedIcon,
    },
    {
      name: 'Simple queues',
      description:
        'Quisque est vel vulputate cursus. Risus proin diam nunc commodo. Lobortis auctor congue commodo diam neque.',
      icon: ArrowPathIcon,
    },
    {
      name: 'Advanced security',
      description:
        'Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.',
      icon: FingerPrintIcon,
    },
  ]

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
