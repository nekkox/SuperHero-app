<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import eventBus from '@/services/eventBus'

const $router = useRouter()
const $props = defineProps(['isSearching'])
const query = ref("")
const $emit = defineEmits(['searchSubmit'])
let timeout = 0

//emitted to parent component
function search() {
    $emit('searchSubmit', query.value)
}


onMounted(() => {
    eventBus.on('#clicked', reset)
})

function reset() {
    query.value = ''
    $router.push({ name: 'search' })
}

function debouncedSearch() {
    clearTimeout(timeout)
    timeout = setTimeout(async () => {
        search();
    }, 1000)
}

watch(query, () => {
    debouncedSearch()
})

</script>

<template>
    <form class="flex justify-center my-8" @submit.prevent="search()">
        <input id="searchHeroes" type="text" placeholder="Search..." v-model="query" :disabled="$props.isSearching" class="
        px-3 py-2 
        border border-slate-300 text-slate-800 
        rounded-md rounded-r-none
        focus:border-slate-500 focus:outline-none
        disabled:opacity-40
        " />

        <button type="submit" :disabled="$props.isSearching" class="
        bg-slate-500 
        hover:bg-slate-600
        px-4 py-2
        text-sm font-bold text-white
        rounded-md rounded-l-none
        transition-colors duration-300
        disabled:opacity-35">🔍 Search</button>
    </form>
</template>

