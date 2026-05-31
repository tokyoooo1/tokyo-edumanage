export default function Unauthorized({ message = 'You are not authorized to view this page.' }) {
  return (
    <section className="empty-state">
      <h2>Unauthorized</h2>
      <p>{message}</p>
    </section>
  )
}
