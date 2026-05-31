export async function loginWithCredentials(credentials) {
  return {
    id: 'USR-001',
    name: credentials.email?.split('@')[0] || 'EduManage User',
    role: 'admin',
    school: 'EduManage Academy',
  }
}
