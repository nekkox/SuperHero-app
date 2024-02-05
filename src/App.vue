<script setup>
import { RouterLink, RouterView } from 'vue-router'
import eventBus from '@/services/eventBus'

function refresh() {
  eventBus.emit("#clicked")
}
</script>

<template>
  <header>
    <div class="text-center my-4">
      <h1 class="font-extrabold uppercase text-6xl mb-20">Marvel DataBase 🔭</h1>
      <nav>
        <RouterLink to="/1" class="px-4 py-2 border-2 rounded-s-md hover:text-slate-600">📒 Comics</RouterLink>
        <RouterLink @click="refresh" to="/search" class="px-4 py-2 border-2 border-s-0 rounded-e-md hover:text-slate-600">
          <span>🦹 Heroes
          </span></RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<style scoped></style>
