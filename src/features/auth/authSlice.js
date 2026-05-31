export const loginSuccess = (user) => ({
  type: 'auth/login',
  payload: user,
})

export const logout = () => ({
  type: 'auth/logout',
})
