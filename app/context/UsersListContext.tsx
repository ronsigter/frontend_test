'use client'

import { createContext, useContext, useRef, useState } from 'react'
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

const sortingFunction = (
  a: User,
  b: User,
  sortBy: string,
  direction: string
) => {
  // Sort by name by default
  let valA = a.name
  let valB = b.name

  if (sortBy === 'company') {
    valA = a.company.name
    valB = b.company.name
  }

  if (sortBy === 'email') {
    valA = a.email
    valB = b.email
  }

  if (direction === 'descending') return valA < valB ? 1 : valA > valB ? -1 : 0

  // Sort in Ascending order by default
  return valA < valB ? -1 : valA > valB ? 1 : 0
}

const UsersListProvider = ({ children }: UsersListProviderProps) => {
  const [usersList, setUsersList] = useState(USERS_LIST)
  const sortUsersBy = useRef('')
  const sortDirectionBy = useRef('')

  const sortBy: ActionType = (params) => {
    if (!params) return
    const { value } = params
    const direction = sortDirectionBy.current

    const sortedUsers = [...USERS_LIST].sort((a, b) =>
      sortingFunction(a, b, value, direction)
    )

    sortUsersBy.current = value
    setUsersList(sortedUsers)
  }

  const sortDirection: ActionType = (params) => {
    if (!params) return
    const { value } = params
    const sortBy = sortUsersBy.current

    const sortedUsers = [...USERS_LIST].sort((a, b) =>
      sortingFunction(a, b, sortBy, value)
    )

    sortDirectionBy.current = value
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
