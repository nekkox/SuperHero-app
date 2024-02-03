<script setup>
import { useCharacterSearch } from '@/composables/HeroesApi'
import { ref, onMounted, watch } from 'vue';
import LoadingIcon from '@/components/LoadingIcon.vue'
import CharacterCard from '@/components/CharacterCard.vue'
import Pagination from '@/components/Pagination.vue'
import SearchForm from '@/components/SearchForm.vue'

const data = ref()
const isSearching = ref(false)
const currentPage = ref(0)
const totalPages = ref(0)
const searchQuery = ref('')



const getCharacterSearch = async (query, page = currentPage.value) => {

    if (query !== '') {

        isSearching.value = true;
        searchQuery.value = query;
        const characters = await useCharacterSearch(query, page)
        currentPage.value = characters?.offset / characters?.limit || 1;
        totalPages.value = Math.ceil(characters?.total / characters?.limit);
        data.value = characters.results;
        isSearching.value = false;
    } else {
        searchReset()
    }
};

function searchReset() {
    searchQuery.value = "";
    currentPage.value = 0;
    totalPages.value = 0;
    data.value = undefined;
}

function search($event) {
    getCharacterSearch($event);
}


watch(searchQuery, async (newValue, oldValue) => {
    console.log('old: ', oldValue, 'new: ', newValue);
    const characters = await useCharacterSearch(newValue)
    data.value = characters.results;
    console.log(characters);
})

</script>

<template>
    <div>
        <SearchForm :isSearching="isSearching" @searchSubmit="search" />
        <LoadingIcon v-if="isSearching" :text="`Searching by '${searchQuery}'...`"></LoadingIcon>

        <div v-if="data && data.length > 0 && !isSearching">


            <div class="grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:md:grid-cols-4 gap-4">
                <CharacterCard v-for="character in data" :key="character.id" :character="character" />
            </div>
            <Pagination></Pagination>
        </div>

        <div 
        v-if="searchQuery && data && data.length === 0 && !isSearching" 
        class="flex flex-col justify-center items-center p-4 pt-16 min-h-min min-w-screen">
            <div class="mb-4">
                <p>Nothing found for <em class="text-red-600 font-bold">{{ searchQuery }}</em></p>
            </div>
        </div>

    </div>
</template>