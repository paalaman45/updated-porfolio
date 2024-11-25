<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-3xl">
      <h2 class="text-center mb-5 text-3xl font-medium">Create Blog</h2>
      <div class="w-full">
        <input v-model="BlogTitle" type="text" name="title" id="title" class="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" placeholder="Blog Title" />
      </div>
      <div id="app" class="h-fit">
        <div class="mt-2">
          <ckeditor v-model="editorData" :editor="editor" :config="editorConfig" />
        </div>
      </div>
      <div class="flex justify-end mt-2">
        <button @click="saveBlog" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Publish
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    ClassicEditor,
    Bold,
    Essentials,
    Heading,
    Italic,
    Paragraph,
    List,
    Plugin,
    ButtonView
  } from 'ckeditor5';
  import { Ckeditor } from '@ckeditor/ckeditor5-vue';

  import 'ckeditor5/ckeditor5.css';
  import { collection, addDoc } from 'firebase/firestore';
  import { db } from '@/firebase/firebase.js';

  export default {
    name: 'app',
    components: {
      Ckeditor
    },
    data() {
      return {
        BlogTitle: "",
        editor: ClassicEditor,
        editorData: '',
        editorConfig: {
          plugins: [
            ClassicEditor,
            Bold,
            Essentials,
            Heading,
            Italic,
            Paragraph,
            List,
            Plugin,
            ButtonView
          ],
          toolbar: [
            'undo', 'redo', '|',
            'heading', '|',
            'bold', 'italic', '|',
            'fontColor', 'fontBackgroundColor', '|',
            'alignment', '|',
            'link', 'blockquote', '|',
            'bulletedList', 'numberedList', '|',
            'imageUpload', '|',
            'insertTable', '|',
            'undo', 'redo'
          ],
          heading: {
            options: [
              { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
              { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
              { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
              { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
              { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
              { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' }
            ]
          },
          fontColor: {
            colors: [
              { color: 'hsl(0, 0%, 0%)', label: 'Black' },
              { color: 'hsl(0, 75%, 60%)', label: 'Red' },
              { color: 'hsl(30, 75%, 60%)', label: 'Orange' },
              { color: 'hsl(60, 75%, 60%)', label: 'Yellow' },
              { color: 'hsl(120, 75%, 60%)', label: 'Green' },
              { color: 'hsl(180, 75%, 60%)', label: 'Cyan' },
              { color: 'hsl(240, 75%, 60%)', label: 'Blue' },
              { color: 'hsl(300, 75%, 60%)', label: 'Magenta' }
            ],
            columns: 5
          },
          fontBackgroundColor: {
            colors: [
              { color: 'hsl(0, 0%, 0%)', label: 'Black' },
              { color: 'hsl(0, 75%, 60%)', label: 'Red' },
              { color: 'hsl(30, 75%, 60%)', label: 'Orange' },
              { color: 'hsl(60, 75%, 60%)', label: 'Yellow' },
              { color: 'hsl(120, 75%, 60%)', label: 'Green' },
              { color: 'hsl(180, 75%, 60%)', label: 'Cyan' },
              { color: 'hsl(240, 75%, 60%)', label: 'Blue' },
              { color: 'hsl(300, 75%, 60%)', label: 'Magenta' }
            ],
            columns: 5
          },
          image: {
            toolbar: ['imageTextAlternative', '|', 'imageStyle:full', 'imageStyle:side']
          },
          table: {
            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
          }
        }
      };
    },
    methods: {
      async saveBlog(){
        try{
          const BlogData = {
            title: this.BlogTitle,
            content: this.editorData,
            date: new Date().toISOString()
          }
          const projectListRef = collection(db, "blogs");
          const docRef = await addDoc(projectListRef,BlogData);
          console.log("Blog Successfully Added:", docRef.id);
        }catch(error){
          console.log(error);
        }
      }
    }
  };
</script>
