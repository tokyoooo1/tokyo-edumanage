import { useAuth } from '../../../hooks/useAuth'

const roles = [
  {
    role: 'admin',
    title: 'School Administrator',
    description: 'Full access to enrollment, academics, fees, reports, teachers, and communication.',
  },
  {
    role: 'teacher',
    title: 'Teacher',
    description: 'Take attendance, manage academic work, view students, and communicate with families.',
  },
  {
    role: 'student',
    title: 'Student',
    description: 'View timetable, attendance, learning materials, grades, and announcements.',
  },
  {
    role: 'parent',
    title: 'Parent / Guardian',
    description: 'Monitor attendance, pay fees, receive alerts, and communicate with teachers.',
  },
]

export default function LoginPage() {
  const { loginAsRole } = useAuth()

  function handleLogin(role) {
    loginAsRole(role)
    window.location.replace('#/')
  }

  return (
    <main className="min-h-screen bg-slate-100 px-5 py-8 text-slate-700">
      <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl content-center gap-8">
        <div className="max-w-2xl">
          <span className="text-xs font-black uppercase text-teal-700">EduManage Access</span>
          <h1 className="mt-3 text-4xl font-black text-slate-950 md:text-5xl">
            Choose a role to preview the school portal
          </h1>
          <p className="mt-4 text-base text-slate-600">
            This mock login lets you test the administrator, teacher, student, and parent experiences before backend authentication is connected.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {roles.map((item) => (
            <article
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
              key={item.role}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-slate-950">{item.title}</h2>
                  <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                </div>
                <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-black uppercase text-teal-700">
                  {item.role}
                </span>
              </div>
              <button
                className="mt-5 inline-flex w-full justify-center rounded-lg bg-teal-700 px-4 py-3 font-black text-white hover:bg-teal-800"
                type="button"
                onClick={() => handleLogin(item.role)}
              >
                Continue as {item.title}
              </button>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
