<template>
  <div class="app">
    <main class="app-main">
      <Filters/>
      <UserTable/>
    </main>
  </div>
</template>

<script setup >
import { onMounted } from 'vue'
import { useUserStore } from './stores/userStore'
import Filters from './components/Filters.vue'
import UserTable from './components/UserTable.vue'

const userStore = useUserStore()

onMounted(() => {
  userStore.fetchUsers()
})
</script>

<style>
.app {
  min-height: 100vh;
}

.app-main {
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
}

@media (max-width: 768px) {
  .app-main {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .app-main {
    padding: 0.75rem;
  }
}
</style>
