<script setup>

const props = defineProps(['text'])
</script>

<template>
    <div class="flex flex-col justify-center items-center p-4 pt-16 min-h-min min-w-screen">
        <div v-if="props.text" class="mb-4">
            {{ text }}
        </div>
        <div class="flex space-x-2 animate-pulse">
            <div class="w-3 h-3 bg-red-500 rounded-full"></div>
            <div class="w-3 h-3 bg-red-500 rounded-full"></div>
            <div class="w-3 h-3 bg-red-500 rounded-full"></div>
        </div>
    </div>
</template>