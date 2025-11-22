import type { User } from '../types/user'


const mockUsers: User[] = [
  { id: 1, firstName: 'Иван', lastName: 'Иванов', age: 25, email: 'ivan@example.com' },
  { id: 2, firstName: 'Мария', lastName: 'Петрова', age: 30, email: 'maria@example.com' },
  { id: 3, firstName: 'Алексей', lastName: 'Сидоров', age: 17, email: 'alex@example.com' },
  { id: 4, firstName: 'Елена', lastName: 'Козлова', age: 28, email: 'elena@example.com' },
]


const delay = (ms: number = 500): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms))
}


export const getUsers = async (): Promise<User[]> => {
  await delay(300)
  return [...mockUsers]
}


export const updateUserPhoto = async (userId: number, photoUrl: string): Promise<User> => {
  await delay(200)
  const user = mockUsers.find(u => u.id === userId)
  if (!user) {
    throw new Error('Пользователь не найден')
  }
  user.photoUrl = photoUrl
  return { ...user }
}

