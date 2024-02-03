<script setup>
import CardView from '@/components/CardView.vue'

const $props = defineProps(['character'])
</script>

<template>



    <CardView :id="$props.character.id">

        <template v-slot:header>
            <p class="mb-3 clear-both"> {{ $props.character.name }} </p>
        </template>

        <img class="float-left w-12 h-12 mb-2 mr-4 rounded-fullshadow-md aspect-square" :src="`${$props.character.thumbnail.path}.${$props.character.thumbnail.extension}`" />

        

        <div v-if="$props.character.description" class="text-base max-w-prose">{{ $props.character.description }}</div>
    
    </CardView>
</template>