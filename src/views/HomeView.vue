<script setup>
import { useComics } from '@/composables/useComics'
import { ref, onMounted } from 'vue';


const data = ref()
const isLoading = ref()

const getComics = async () => {
  isLoading.value = true;
  const comics = await useComics();
  data.value = comics.results;
  isLoading.value = false;
};

onMounted(async () => {
  getComics()

})



console.log(data);

</script>

<template>
  <main>
    <h1 class="bg-slate-700">Hello</h1>
    <h1 v-for="(value, index) in data" :key="index">{{ value.name }}</h1>
  </main>
</template>
