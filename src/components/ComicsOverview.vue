<script setup>
import { useComics } from '@/composables/useComics'
import { ref, onMounted } from 'vue';
import LoadingIcon from '@/components/LoadingIcon.vue'


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
    <div>
        <div v-if="isLoading">
            <LoadingIcon text="Loading comics" />
        </div>
        <div v-if="data && !isLoading">
            <div class="grid grid-flow-row grid-cols-1 gap-4 text-center md:grid-cols-2	lg:grid-cols-4">

                <div v-for="comic in data" :key="comic.id">{{ comic.name }}</div>

            </div>
        </div>
    </div>
</template>