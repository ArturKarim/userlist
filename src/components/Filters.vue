<template>
  <div class="filters">
    <h2>Фильтры и сортировка</h2>

    <div class="filters-row">
      <div class="filter-group">
        <label for="minAge">Минимальный возраст:</label>
        <input
            id="minAge"
            v-model.number="minAgeInput"
            type="number"

            placeholder="Например: 18"
        />
      </div>

      <div class="filter-group">
        <label for="sortBy">Сортировка:</label>
        <select id="sortBy" v-model="sortByInput">
          <option :value="null">Без сортировки</option>
          <option value="name">По имени</option>
          <option value="age">По возрасту</option>
        </select>
        <button
            v-if="sortByInput"
            @click="toggleSortOrder"
            class="sort-order-btn"
            type="button"
            :title="sortOrderInput === 'asc' ? 'По возрастанию' : 'По убыванию'"
        >
          {{ sortOrderInput === 'asc' ? '↑' : '↓' }}
        </button>
      </div>

      <button
          v-if="minAgeInput !== null || sortByInput !== null"
          @click="clearFilters"
          class="clear-all-btn"
          type="button"
      >
        Сбросить фильтры
      </button>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, watch } from 'vue'
import { useUserStore } from '../stores/userStore'
import { debounce } from '../utils/debounce'

const userStore = useUserStore()

const minAgeInput = ref<number | null>(userStore.minAge)
const sortByInput = ref<'name' | 'age' | null>(userStore.sortBy)
const sortOrderInput = ref<'asc' | 'desc'>(userStore.sortOrder)

// Дебаунс
const applyMinAgeFilter = debounce((value: number | null) => {

  userStore.setMinAge(value)
}, 500)


watch(minAgeInput, (newValue) => {
  applyMinAgeFilter(newValue)
})

watch([sortByInput, sortOrderInput], () => {
  if (sortByInput.value) {
    userStore.setSort(sortByInput.value, sortOrderInput.value)
  } else {
    userStore.setSort(null)
  }
})

const toggleSortOrder = () => {
  sortOrderInput.value = sortOrderInput.value === 'asc' ? 'desc' : 'asc'
  if (sortByInput.value) {
    userStore.setSort(sortByInput.value, sortOrderInput.value)
  }
}

const clearFilters = () => {
  minAgeInput.value = null
  sortByInput.value = null
  sortOrderInput.value = 'asc'
  userStore.setMinAge(null)
  userStore.setSort(null)
}
</script>


<style scoped>
.filters {
  background: #f5f5f5;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.filters h2 {
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  color: #333;
}

.filters-row {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  align-items: flex-end;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 200px;
}

.filter-group label {
  font-weight: 500;
  color: #555;
  font-size: 0.9rem;
}

.filter-group input,
.filter-group select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.filter-group input[type="number"] {
  -moz-appearance: textfield;
}

.filter-group input[type="number"]::-webkit-inner-spin-button,
.filter-group input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.filter-group input:focus,
.filter-group select:focus {
  outline: none;
  border-color: #42b883;
}

.clear-btn,
.sort-order-btn,
.clear-all-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.clear-btn {
  background: #ff6b6b;
  color: white;
  margin-top: 0.5rem;
}

.clear-btn:hover {
  background: #ff5252;
}

.sort-order-btn {
  background: #42b883;
  color: white;
  margin-top: 0.5rem;
  font-size: 1.2rem;
  padding: 0.5rem 0.75rem;
}

.sort-order-btn:hover {
  background: #35a372;
}

.clear-all-btn {
  background: #6c757d;
  color: white;
  align-self: flex-end;
}

.clear-all-btn:hover {
  background: #5a6268;
}

@media (max-width: 768px) {
  .filters-row {
    flex-direction: column;
  }

  .filter-group {
    width: 100%;
  }

  .clear-all-btn {
    align-self: stretch;
  }
}
</style>

