import { loginWithCredentials } from './authAPI'

export async function login(credentials) {
  return loginWithCredentials(credentials)
}
