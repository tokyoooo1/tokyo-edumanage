export async function sendNotification(payload) {
  return {
    id: crypto.randomUUID(),
    status: 'queued',
    ...payload,
  }
}
