import { StoreProvider } from './store'

export default function AppProviders({ children }) {
  return <StoreProvider>{children}</StoreProvider>
}
