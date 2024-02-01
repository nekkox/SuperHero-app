<script setup>

import { useRouter } from 'vue-router';

const $props = defineProps(['totalPages', 'currentPage', 'path'])

const isOnFirstPage = $props.currentPage === 1;
const isOnLastPage = $props.currentPage === $props.totalPages;




</script>

<template>
    <nav v-if="$props.totalPages > 1" class="flex justify-center my-8">
        <span
            class="mr-4 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            <RouterLink :to="`${path}`" v-if="!isOnFirstPage">First</RouterLink>
            <span v-else class="opacity-50" aria-hidden="true">First</span>
        </span>

        <span
            class="mr-4 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            <RouterLink :to="`${path}${currentPage - 1}`" v-if="!isOnFirstPage">
                Previous</RouterLink>
            <span v-else class="opacity-50" aria-hidden="true">Previous</span>
        </span>

        <span class="font-semibold">Page {{ currentPage }} of {{ totalPages }}</span>

        <span
            class="ml-4 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            <RouterLink :to="`${path}${currentPage + 1}`" v-if="!isOnLastPage">Next</RouterLink>
            <span v-else class="opacity-50" aria-hidden="true">Next</span>
        </span>

        <span
            class="ml-4 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            <RouterLink :to="`${path}${totalPages}`" v-if="!isOnLastPage">Last</RouterLink>
            <span v-else class="opacity-50" aria-hidden="true">Last</span>
    </span>
</nav></template>