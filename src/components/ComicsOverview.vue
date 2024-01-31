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

</script>

<template>
  <div class="bg-slate-500 w-96 rounded-lg mx-auto shadow-lg">
    <ul class="text-center divide-y divide-gray-400">
        <li class="pb-3 pt-3" v-for="(value, index) in data" :key="index">{{ value.name }}</li>
    </ul>
    
  </div>
</template>