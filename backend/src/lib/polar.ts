import { ENV } from './env'
import { CheckoutCreateBody } from './types'

export async function polarCreateCheckout (env: ENV, body: CheckoutCreateBody) {
  const token = env.POLAR_ACCESS_TOKEN
  if (!token) throw new Error('POLAR_ACCESS_TOKEN is not configured')

  const res = await fetch(`${env.POLAR_API_BASE}/v1/checkouts`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  if (!res.ok) {
    const errText = await res.text()
    throw new Error(`Polar checkout failed : ${res.status} ${errText}`)
  }

  const data = (await res.json()) as { id: string; url: string }
  return { id: data.id, url: data.url }
}
