import { createContext, createElement, useContext, useMemo, useReducer } from 'react'
import { initialState, rootReducer } from './rootReducer'

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(rootReducer, initialState)
  const value = useMemo(() => ({ state, dispatch }), [state])

  return createElement(StoreContext.Provider, { value }, children)
}

export function useAppStore() {
  const store = useContext(StoreContext)

  if (!store) {
    throw new Error('useAppStore must be used inside StoreProvider')
  }

  return store
}
