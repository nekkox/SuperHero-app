<script setup>
import { useComics, useMarvelAPI } from '@/composables/useComics'
import { ref, onMounted, watch } from 'vue';
import LoadingIcon from '@/components/LoadingIcon.vue'
import ComicCard from '@/components/ComicCard.vue'
import Pagination from '@/components/Pagination.vue'
import { useRoute, useRouter } from "vue-router";

const data = ref()
const isLoading = ref()
const currentPage = ref(0)
const totalPages = ref(0)
const $route = useRoute();
const $router = useRouter();

const getComics = async (page = currentPage.value) => {
    isLoading.value = true;
    //const comics = await useComics(page);
    const comics = await useMarvelAPI('comics',{page:page, query:''});
    { { console.log(comics) } }

    currentPage.value = comics?.offset / comics?.limit || 1;
    totalPages.value = Math.ceil(comics.total / comics.limit);
    console.log(currentPage.value, totalPages.value);

    data.value = comics.results;
    isLoading.value = false;
};

onMounted(async () => {
    getComics(+currentPage.value)
    //useMarvelAPI('comics',{page:+currentPage.value, query:''});

})

if ($route.params.page) {
    currentPage.value = $route.params.page
}

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

            <Pagination :total-pages="totalPages" path="/" :current-page="+currentPage"></Pagination>
        </div>
    </div>
</template>