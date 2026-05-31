import NavIcon from '../components/ui/NavIcon'

export const routeConfig = [
  {
    path: '/',
    href: '#/',
    label: 'Dashboard',
    allowedRoles: ['admin', 'teacher', 'student', 'parent'],
    icon: (
      <NavIcon>
        <path d="M4 13h6V4H4z" />
        <path d="M14 20h6V4h-6z" />
        <path d="M4 20h6v-3H4z" />
      </NavIcon>
    ),
  },
  {
    path: '/students',
    href: '#/students',
    label: 'Students',
    allowedRoles: ['admin', 'teacher'],
    icon: (
      <NavIcon>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </NavIcon>
    ),
  },
  {
    path: '/attendance',
    href: '#/attendance',
    label: 'Attendance',
    allowedRoles: ['admin', 'teacher', 'student', 'parent'],
    icon: (
      <NavIcon>
        <path d="M8 2v4" />
        <path d="M16 2v4" />
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="m9 14 2 2 4-5" />
      </NavIcon>
    ),
  },
  {
    path: '/academics',
    href: '#/academics',
    label: 'Academics',
    allowedRoles: ['admin', 'teacher', 'student'],
    icon: (
      <NavIcon>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z" />
      </NavIcon>
    ),
  },
  {
    path: '/fees',
    href: '#/fees',
    label: 'Fees',
    allowedRoles: ['admin', 'parent'],
    icon: (
      <NavIcon>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 10h18" />
        <path d="M7 15h3" />
      </NavIcon>
    ),
  },
  {
    path: '/teachers',
    href: '#/teachers',
    label: 'Teachers',
    allowedRoles: ['admin'],
    icon: (
      <NavIcon>
        <path d="M12 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
        <path d="M4 22a8 8 0 0 1 16 0" />
        <path d="M18 2v4" />
      </NavIcon>
    ),
  },
  {
    path: '/reports',
    href: '#/reports',
    label: 'Reports',
    allowedRoles: ['admin'],
    icon: (
      <NavIcon>
        <path d="M4 19V5" />
        <path d="M4 19h16" />
        <path d="M8 16v-5" />
        <path d="M12 16V8" />
        <path d="M16 16v-3" />
      </NavIcon>
    ),
  },
  {
    path: '/communication',
    href: '#/communication',
    label: 'Messages',
    allowedRoles: ['admin', 'teacher', 'student', 'parent'],
    icon: (
      <NavIcon>
        <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
      </NavIcon>
    ),
  },
]

export const roleRoutes = {
  admin: routeConfig,
  teacher: routeConfig.filter((route) => route.allowedRoles.includes('teacher')),
  student: routeConfig.filter((route) => route.allowedRoles.includes('student')),
  parent: routeConfig.filter((route) => route.allowedRoles.includes('parent')),
}

export function getRoutesForRole(role = 'admin') {
  return roleRoutes[role] ?? roleRoutes.admin
}

export function getRouteByPath(path) {
  return routeConfig.find((route) => route.path === path)
}
