<template>
	<section class="py-6 sm:py-12 dark:bg-gray-100 dark:text-gray-800">
		<div class="container p-6 mx-auto space-y-8" bis_skin_checked="1">
			<div class="space-y-6 text-center" bis_skin_checked="1">
        <div class="px-4 py-10 text-center sm:px-6 lg:px-8">
          <h1 class="text-4xl font-bold tracking-tight text-gray-900">{{ projectData.title }}</h1>
          <p class="mx-auto mt-4 max-w-xl text-base text-gray-500">{{ projectData.description }}</p>
        </div>
			</div>
			<div class="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4" bis_skin_checked="1">
				<article class="shadow-sm hover:shadow-lg flex flex-col dark:bg-gray-50" v-for="project in projectLists" :key="project.project_Id" :id="project.project_Id" v-show="project.show">
					<a rel="noopener noreferrer" href="#" aria-label="Te nulla oportere reprimique his dolorum">
						<img alt="" class="object-cover w-full h-52 dark:bg-gray-500" :src="project.img">
					</a>
					<div class="flex flex-col flex-1 p-6" bis_skin_checked="1">
						<a rel="noopener noreferrer" href="#" aria-label="Te nulla oportere reprimique his dolorum"></a>
						<a rel="noopener noreferrer" href="" class="text-xs tracking-wider uppercase hover:underline dark:text-violet-600">{{ project.project_Type }}</a>
						<a target="_blank" :href="project.project_Link"><h3 class="hover:underline flex-1 py-2 text-lg font-semibold leading-snug">{{ project.project_Name }}</h3></a>
            
						<!-- <div class="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:text-gray-600" bis_skin_checked="1">
							<span>June 1, 2020</span>
							<span>2.1K views</span>
						</div> -->
					</div>
				</article>
			</div>

      <div class="flex justify-center">
        <button type="button" class="rounded-md bg-indigo-600 px-6 py-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">More Projects</button>
      </div>
		</div>
	</section>
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
          project_Id: doc.id,
          project_Name: doc.data().project_name,
          project_Link: doc.data().project_link,
          project_Type: doc.data().project_type,
          show: doc.data().show,
          img: doc.data().project_img,
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