'use client'

import { createContext, useContext, useState } from 'react'
import { User } from '../types/user'
import { USERS_LIST } from '../constants'

type ActionType = (params: { value: string; label: string } | null) => void

type UsersListContextType = {
  usersList: User[]
  sortBy: ActionType
  sortDirection: ActionType
}

export const UsersListContext = createContext<UsersListContextType>({
  sortBy: () => {},
  sortDirection: () => {},
  usersList: [],
})

type UsersListProviderProps = {
  children: React.ReactNode
}

const UsersListProvider = ({ children }: UsersListProviderProps) => {
  const [usersList, setUsersList] = useState(USERS_LIST)
  const [sortUsersBy, setUsersSortBy] = useState('')
  const [sortDirectionBy, setSortDirectionBy] = useState('')

  const sortBy: ActionType = (params) => {
    if (!params) return

    const sortedUsers = USERS_LIST

    setUsersList(sortedUsers)
  }

  const sortDirection: ActionType = (params) => {
    if (!params) return

    const sortedUsers = USERS_LIST

    setUsersList(sortedUsers)
  }

  return (
    <UsersListContext.Provider value={{ usersList, sortBy, sortDirection }}>
      {children}
    </UsersListContext.Provider>
  )
}

export const useUsersList = () => {
  const context = useContext(UsersListContext)

  if (context === undefined) {
    throw new Error('useUsersList must be used within a UsersListProvider')
  }

  return context
}

export default UsersListProvider
