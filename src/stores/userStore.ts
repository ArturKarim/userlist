import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getUsers, updateUserPhoto } from '../services/UserService'
import type { User } from '../types/user'

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  // Фильтры
  const minAge = ref<number | null>(null)
  const sortBy = ref<'name' | 'age' | null>(null)
  const sortOrder = ref<'asc' | 'desc'>('asc')

  // Загрузка пользователей
  const fetchUsers = async () => {
    loading.value = true
    error.value = null
    try {
      users.value = await getUsers()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Ошибка загрузки пользователей'
    } finally {
      loading.value = false
    }
  }

  // Обновление фото
  const updatePhoto = async (userId: number, photoUrl: string) => {
    try {
      const updatedUser = await updateUserPhoto(userId, photoUrl)
      const index = users.value.findIndex(u => u.id === userId)
      if (index !== -1) {
        users.value[index] = updatedUser
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Ошибка обновления фотографии'
    }
  }

  //минимальный возраст
  const setMinAge = (age: number | null) => {
    minAge.value = age
  }

  // Сортировка
  const setSort = (by: 'name' | 'age' | null, order: 'asc' | 'desc' = 'asc') => {
    sortBy.value = by
    sortOrder.value = order
  }

  // Отфильтрованные и отсортированные пользователи
  const filteredAndSortedUsers = computed(() => {
    let result = [...users.value]

    // Фильтр по возрасту
    if (minAge.value !== null) {
      result = result.filter(user => user.age >= minAge.value!)
    }

    // Сортировка
    if (sortBy.value === 'name') {
      result.sort((a, b) => {
        const nameA = `${a.firstName} ${a.lastName}`.toLowerCase()
        const nameB = `${b.firstName} ${b.lastName}`.toLowerCase()
        return sortOrder.value === 'asc' 
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA)
      })
    } else if (sortBy.value === 'age') {
      result.sort((a, b) => {
        return sortOrder.value === 'asc' 
          ? a.age - b.age
          : b.age - a.age
      })
    }

    return result
  })

  return {
    users,
    loading,
    error,
    minAge,
    sortBy,
    sortOrder,
    filteredAndSortedUsers,
    fetchUsers,
    updatePhoto,
    setMinAge,
    setSort,
  }
})

