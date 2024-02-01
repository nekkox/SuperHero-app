<script setup>
import CardView from '@/components/CardView.vue'

const $props = defineProps(['character'])
</script>

<template>



    <CardView :id="$props.character.id">

        <img :src="`${$props.character.thumbnail.path}.${$props.character.thumbnail.extension}`"
            class="float-left w-12 h-12 mb-2 mr-4 rounded-fullshadow-md aspect-square" />

        <template v-slot:header>
            <p class="mb-5"> {{ $props.character.name }} </p>
        </template>

        <div class="text-base max-w-prose">{{ $props.character.description }}</div>
    </CardView>
</template>