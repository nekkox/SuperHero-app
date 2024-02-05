<script setup>
import { useCharacterSearch } from '@/composables/HeroesApi'
import { ref, watch } from 'vue';
import LoadingIcon from '@/components/LoadingIcon.vue'
import CharacterCard from '@/components/CharacterCard.vue'
import Pagination from '@/components/Pagination2.vue'
import SearchForm from '@/components/SearchForm.vue'
import { useRoute, useRouter } from 'vue-router';

const data = ref(null)
const isSearching = ref(false)
const currentOffset = ref(0)
const totalPages = ref(0)
const searchQuery = ref('')
const $route = useRoute()
const $router = useRouter()
const currentPage = ref(parseInt($route.params.page));


const getCharacterSearch = async (query, page = 0) => {
    if (query !== '') {

        isSearching.value = true;
        searchQuery.value = query;
        const characters = await useCharacterSearch(query, page)
        currentOffset.value = characters?.offset / characters?.limit || 0;
        totalPages.value = Math.ceil(characters.total / characters.limit);
        data.value = characters.results;

        //initialize first page of results
        if (!$route.params.page && data.value.length != 0 && searchQuery.value != '') {
            $router.push(`/search/${searchQuery.value}/1`)
            if (searchQuery.value == '') {
                searchReset()
                $router.push({ name: 'search' })
            }
        }
        isSearching.value = false;
    }
    else {
        searchReset()
    }
};

function searchReset() {

    searchQuery.value = "";
    currentOffset.value = 0;
    totalPages.value = 0;
    data.value = undefined;
    // $router.push('/search')
}

function search($event) {
    getCharacterSearch($event);
}


//Watch route page param, if there is number then next results
watch(
    () => $route.params.page,
    async (newPage) => {
        currentPage.value = parseInt(newPage)
        if (currentPage.value) {
            await getCharacterSearch(searchQuery.value, newPage);
        }

    }
);

//needed
watch(searchQuery, async (newValue, oldValue) => {
    $router.push('/search')
})
</script>

<template>
    <div>
        <SearchForm :isSearching="isSearching" @searchSubmit="search" />
        <LoadingIcon v-if="isSearching" :text="`Searching by '${searchQuery}'...`"></LoadingIcon>

        <!-- <div v-if="data && data.length > 0 && !isSearching && $route.fullPath !== '/search'">-->
        <div v-if="data && data.length > 0 && !isSearching">


            <div class="grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:md:grid-cols-4 gap-4">
                <CharacterCard v-for="character in data" :key="character.id" :character="character" />
            </div>
            <Pagination :total-pages="totalPages" :path="`/search/${searchQuery}/`" :current-offset="+currentOffset"
                :current-page="currentPage">
            </Pagination>
        </div>

        <div v-if="searchQuery && data && data.length === 0 && !isSearching"
            class="flex flex-col justify-center items-center p-4 pt-16 min-h-min min-w-screen">
            <div class="mb-4">
                <p>Nothing found for <em class="text-red-600 font-bold">{{ searchQuery }}</em></p>
            </div>
        </div>

    </div>
</template>
