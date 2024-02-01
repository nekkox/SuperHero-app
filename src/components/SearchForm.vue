<script setup>
import { ref } from 'vue';

const $props = defineProps(['isSearching'])
const query = ref("")
const $emit = defineEmits(['searchSubmit'])

function search(){
    $emit('searchSubmit', query.value)
    console.log("submitted");
}
</script>

<template>
    <form class="flex justify-center my-8">
        <input type="text" placeholder="Search..." v-model="query" :disabled="$props.isSearching"
        class="
        px-3 py-2 
        border border-slate-300 text-slate-800 
        rounded-md rounded-r-none
        focus:border-slate-500 focus:outline-none
        disabled:opacity-40
        " />

        <button type="submit" :disabled="isSearching" 
        class="
        bg-slate-500 
        hover:bg-slate-600
        px-4 py-2
        text-sm font-bold text-white
        rounded-md rounded-l-none
        transition-colors duration-300
        disabled:opacity-35">🔍 Search</button>
    </form>
</template>


disabled:opacity-40  focus:outline-none
focus:border-slate-500"