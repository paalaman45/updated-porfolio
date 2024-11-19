<template>
  <div class="bg-white">
    <div class="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20">
      <div class="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
        <div class="px-6 lg:px-0 lg:pt-4">
          <div class="mx-auto max-w-2xl">
            <div class="max-w-lg">
              <h1 class="mt-10 text-pretty text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">Kissel James Paalaman</h1>
              <div class="h-14">
                <p class="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">{{ displayedText }}<span class="cursor">|</span></p>
              </div>
              <div class="mt-10 flex items-center gap-x-6">
                <a href="#" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Documentation</a>
                <a href="https://github.com/paalaman45" class="text-sm/6 font-semibold text-gray-900">View on GitHub <span aria-hidden="true">→</span></a>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen">
          <div class="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 md:-mr-20 lg:-mr-36" aria-hidden="true" />
          <div class="shadow-lg md:rounded-3xl">
            <div class="bg-indigo-500 [clip-path:inset(0)] md:[clip-path:inset(0_round_theme(borderRadius.3xl))]">
              <div class="absolute -inset-y-px left-1/2 -z-10 ml-10 w-[200%] skew-x-[-30deg] bg-indigo-100 opacity-20 ring-1 ring-inset ring-white md:ml-20 lg:ml-36" aria-hidden="true" />
              <div class="relative px-6 pt-8 sm:pt-16 md:pl-16 md:pr-0">
                <div class="mx-auto max-w-2xl md:mx-0 md:max-w-none">
                  <div class="w-screen overflow-hidden rounded-tl-xl bg-gray-900">
                    <div class="flex bg-gray-800/40 ring-1 ring-white/5">
                      <div class="-mb-px flex text-sm/6 font-medium text-gray-400">
                        <div class="border-b border-r border-b-white/20 border-r-white/10 bg-white/5 px-4 py-2 text-white">tailwind.config.js</div>
                        <div class="border-r border-gray-600/10 px-4 py-2">Welcome.vue</div>
                      </div>
                    </div>
                    <div class="px-6 whitespace-pre-wrap">
                      <!-- Code Here -->
<code v-html="highlightedCode" class="text-wrap"></code>
                      <!-- CODE -->
                    </div>
                  </div>
                </div>
                <div class="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 md:rounded-3xl" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';

  const show = ref(true);

  // Manually add color classes to specific parts of the code
  const highlightedCode = ref(`<span class="text-red-400">&lt;template&gt;</span>
  <span class="text-red-400">&lt;section</span> <span class="text-purple-400">class</span><span class="text-blue-400">="hero bg-gray-200"</span><span class="text-red-400">&gt;</span>
    <span class="text-red-400">&lt;div</span> <span class="text-purple-400">class</span><span class="text-blue-400">="hero-content text-center"</span><span class="text-red-400">&gt;</span>
      <span class="text-red-400">&lt;h1</span> <span class="text-purple-400">class</span><span class="text-blue-400">="text-4xl font-bold mb-4"</span><span class="text-red-400">&gt;</span><span class="text-gray-300">{{ welcomeMsg }}</span><span class="text-red-400">&lt;/h1&gt;</span>
    <span class="text-red-400">&lt;/div&gt;</span>
  <span class="text-red-400">&lt;/section&gt;</span>
<span class="text-red-400">&lt;/template&gt;</span>

<span class="text-red-400">&lt;script setup&gt;</span>
  <span class="text-purple-400">const</span><span class="text-gray-300"> welcomeMsg = </span></span><span class="text-green-400">"Welcome to Kissel James Portfolio"</span>;
<span class="text-red-400">&lt;/script&gt;</span>`);

  const texts = ref([
    "Expert Web Development and Server Solutions.",
    "Crafting Efficient, Secure, and Scalable Solutions.",
    "Expertise in creating responsive designs and managing complex server configurations."
  ]);

  const displayedText = ref("");
  let currentIndex = 0;

  const typeText = () => {
    let index = 0;
    const interval = setInterval(() => {
      displayedText.value += texts.value[currentIndex][index];
      index++;

      // Clear interval when the full text is typed
      if (index === texts.value[currentIndex].length) {
        clearInterval(interval);
        setTimeout(deleteText, 3000); // Wait 3 seconds before deleting
      }
    }, 30); // Typing speed
  };

  const deleteText = () => {
    let index = displayedText.value.length;
    const interval = setInterval(() => {
      displayedText.value = displayedText.value.slice(0, index - 1);
      index--;

      // Clear interval when the text is fully deleted
      if (index === 0) {
        clearInterval(interval);
        currentIndex = (currentIndex + 1) % texts.value.length; // Move to the next text
        typeText(); // Start typing the next text
      }
    }, 10); // Deleting speed
  };

  onMounted(() => {
    typeText();
  });
</script>

<style scoped>
.cursor {
  animation: blink 1s step-end infinite;
  font-weight: 100;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
