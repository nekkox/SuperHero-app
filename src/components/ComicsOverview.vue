<script setup>
import { useComics } from '@/composables/HeroesApi'
import { ref, onMounted, watch } from 'vue';
import LoadingIcon from '@/components/LoadingIcon.vue'
import ComicCard from '@/components/ComicCard.vue'
import Pagination from '@/components/Pagination.vue'
import { useRoute } from "vue-router";


const data = ref()
const isLoading = ref()
const currentPage = ref(0)
const totalPages = ref(0)
const $route = useRoute();


const getComics = async (page = currentPage.value) => {
    isLoading.value = true;
    const comics = await useComics(page)
    console.log(comics);

    currentPage.value = comics?.offset / comics?.limit || 0;
    totalPages.value = Math.ceil(comics.total / comics.limit);

    data.value = comics.results;
    isLoading.value = false;
};

onMounted(async () => {
    getComics(+currentPage.value)
    console.log(totalPages.value);

})

/*
if ($route.params.page) {
    currentPage.value = $route.params.page
}
*/

watch(
    () => $route.params.page,
    async (newPage) => {
        await getComics(+newPage);
    }
);
</script>

<template>
    <div>

        <div v-if="isLoading">
            <LoadingIcon text="Loading comics" />
        </div>
        <div v-if="data && !isLoading">
            <div class="mb-9 grid grid-flow-row grid-cols-1 gap-4 text-center md:grid-cols-2 lg:grid-cols-4">

                <ComicCard v-for="comic in data" :key="comic.id" :comic="comic" />
            </div>

            <Pagination :total-pages="totalPages" path="/" :current-offset="+currentPage"></Pagination>
        </div>
    </div>
</template>