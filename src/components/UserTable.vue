<script setup lang="ts">
import { useUserStore } from '../stores/userStore'


const userStore = useUserStore()

const handleFileUpload = async (event: Event, userId: number) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) return

  if (!file.type.startsWith('image/')) {
    alert('Пожалуйста, выберите изображение')
    return
  }

  const photoUrl = URL.createObjectURL(file)

  await userStore.updatePhoto(userId, photoUrl)

  target.value = ''
}


</script>

<template>
  <div class="user-table-container">
    <h2>Список пользователей</h2>

    <div v-if="userStore.loading" class="loading">
      Загрузка пользователей...
    </div>

    <div v-else-if="userStore.error" class="error">
      {{ userStore.error }}
    </div>

    <div v-else-if="userStore.filteredAndSortedUsers.length === 0" class="empty">
      Пользователи не найдены
    </div>

    <div v-else class="user-list">
      <div
          v-for="user in userStore.filteredAndSortedUsers"
          :key="user.id"
          class="user-item"
      >
        <div class="user-photo">
          <img
              v-if="user.photoUrl"
              :src="user.photoUrl"
              :alt="`${user.firstName} ${user.lastName}`"
              class="photo"
          />
          <div v-else class="photo-placeholder">
            Фото
          </div>
          <label :for="`photo-${user.id}`" class="upload-label">
            Загрузить фото
          </label>
          <input
              :id="`photo-${user.id}`"
              type="file"
              accept="image/*"
              @change="handleFileUpload($event, user.id)"
              class="file-input"
          />
        </div>

        <div class="divider"></div>

        <div class="user-name">
          {{ user.firstName }} {{ user.lastName }}
        </div>

        <div class="divider"></div>

        <div class="user-age">
          {{ user.age }} лет
        </div>

        <div class="divider"></div>

        <div class="user-email">
          {{ user.email }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-table-container {
  width: 100%;
}

.user-table-container h2 {
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  color: #333;
}

.loading,
.error,
.empty {
  text-align: center;
  padding: 2rem;
  font-size: 1.1rem;
}

.error {
  color: #ff6b6b;
}

.empty {
  color: #6c757d;
}

.user-list {
  display: flex;
  flex-direction: column;
  background: white;
  border: 1px solid #e0e0e0;
}

.user-item {
  display: flex;
  align-items: center;
  height: 100px;
  width: 100%;
  border: 1px solid #e0e0e0;
}

.user-photo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 200px;
  height: 100%;
  padding: 0.5rem;
  flex-shrink: 0;
}

.divider {
  width: 1px;
  height: 60%;
  background: #e0e0e0;
  flex-shrink: 0;
}

.user-name {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 100%;
  padding: 0.5rem;
  font-weight: 500;
  flex-shrink: 0;
}

.user-age {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100%;
  padding: 0.5rem;
  flex-shrink: 0;
}

.user-email {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 100%;
  padding: 0.5rem;
}

.photo {
  width: 32px;
  height: 32px;
  border-radius: 2px;
  object-fit: cover;
}

.photo-placeholder {
  width: 32px;
  height: 32px;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 0.8rem;
  font-weight: bold;
  border-radius: 2px;
}

.upload-label {
  padding: 0.2rem 0.5rem;
  background: #42b883;
  color: white;
  border-radius: 2px;
  cursor: pointer;
  font-size: 0.8rem;
}

.file-input {
  display: none;
}

@media (max-width: 768px) {
  .user-item {
    flex-direction: column;
    height: auto;
    padding: 1rem;
    border-bottom: 1px solid #e0e0e0;
  }

  .user-item:last-child {
    border-bottom: none;
  }

  .user-photo,
  .user-name,
  .user-age,
  .user-email {
    width: 100%;
    height: auto;
    padding: 0.5rem 0;
    justify-content: flex-start;
  }

  .divider {
    width: 100%;
    height: 1px;
    background: #e0e0e0;
  }

  .user-photo {
    flex-direction: row;
    gap: 1rem;
    justify-content: flex-start;
  }
}
</style>