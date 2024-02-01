<script setup>
import { useCharacterSearch } from '@/composables/HeroesApi'
import { ref, onMounted, watch } from 'vue';
import LoadingIcon from '@/components/LoadingIcon.vue'
import CharacterCard from '@/components/CharacterCard.vue'
import Pagination from '@/components/Pagination.vue'
import { useRoute } from "vue-router";
import SearchForm from '@/components/SearchForm.vue'

const data = ref()
const isSearching = ref(false)
const currentPage = ref(0)
const totalPages = ref(0)
const $route = useRoute();


const getCharacter = async (page = currentPage.value) => {
    isSearching.value = true;
    const characters = await useCharacterSearch('h',page)
    console.log(characters);
   

    currentPage.value = characters?.offset / characters?.limit || 1;
    totalPages.value = Math.ceil(characters?.total / characters?.limit);

    data.value = characters.results;
    isSearching.value = false;
    console.log(totalPages.value);
};

onMounted(async () => {
    getCharacter(+currentPage.value)
    console.log(await getCharacter(+currentPage.value));
})

if ($route.params.page) {
    currentPage.value = $route.params.page
}

watch(
    () => $route.params.page,
    async (newPage) => {
        await getCharacter(+newPage);
    }
);


</script>

<template>

    <h1>search</h1>
    <SearchForm :isSearching="isSearching"/>
    <CharacterCard v-for="character in data" :key="character.id" :character="character" />
</template>