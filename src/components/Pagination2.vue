<script setup>
import { useRoute } from 'vue-router';
const $route = useRoute()
const $props = defineProps(['totalPages', 'currentOffset', 'path', 'currentPage'])

const isOnFirstPage = $route.params.page == 1;
const isOnLastPage = $route.params.page == $props.totalPages;

</script>

<template>
    <nav v-if="$props.totalPages > 1" class="flex justify-center my-8">

        <!---------------------- FIRST -------------------->
        <span
            class="mr-4 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            <RouterLink :to="`${path}1`" v-if="!isOnFirstPage">First</RouterLink>
            <span v-else class="opacity-50" aria-hidden="true">First</span>
        </span>

        <!---------------------- PREVIOUS -------------------->
        <span
            class="mr-4 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            <RouterLink :to="`${path}${$route.params.page - 1}`" v-if="!isOnFirstPage">
                Previous</RouterLink>
            <span v-else class="opacity-50" aria-hidden="true">Previous</span>
        </span>

        <!---------------------- CURENT & TOTALPAGES -------------------->
        <span class="font-semibold">Page {{ $props.currentPage }} of {{ totalPages }}</span>


        <!---------------------- NEXT -------------------->
        <span
            class="ml-4 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            <RouterLink :to="`${path}${$props.currentPage + 1}`" v-if="!isOnLastPage">Next</RouterLink>
            <span v-else class="opacity-50" aria-hidden="true">Next</span>
        </span>


        <!---------------------- LAST -------------------->
        <span
            class="ml-4 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            <RouterLink :to="`${path}${totalPages - 0}`" v-if="!isOnLastPage">Last</RouterLink>
            <span v-else class="opacity-50" aria-hidden="true">Last</span>
        </span>
    </nav>
</template>