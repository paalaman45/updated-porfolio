<template>
  <section class="hero bg-gray-200">
    <div class="hero-content text-center">
      <h1 class="text-4xl font-bold mb-4">{{ welcomeMsg }}</h1>
      <p class="text-lg mb-6">{{ description }}</p>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Get Started
      </button>
    </div>
  </section>
</template>

<script setup>
  const welcomeMsg = "Welcome to Kissel James Portfolio";
  const description = "This shows my Projects, About Me, Services and more!";
</script>