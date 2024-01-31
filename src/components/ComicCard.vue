<script setup>
import CardView from '@/components/CardView.vue'
const $props = defineProps(['comic'])

</script>

<template>
    <CardView>
        <template v-slot:header>
          <p class="mb-5">  {{ $props.comic.title }} </p>
        </template>

        <template v-slot:default>
        <img 
        class="aspect-[150/228] shadow-xl mr-4 float-left" 
        :src="`${$props.comic.thumbnail.path}.${$props.comic.thumbnail.extension}`" 
        width="150"/>    
        </template>

    </CardView>
</template>