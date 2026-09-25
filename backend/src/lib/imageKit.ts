import ImageKit, { NotFoundError } from '@imagekit/nodejs'
import type { ENV } from './env'

export async function deleteImageKitAssest (
  env: ENV,
  storedFileId: string | null
) {
  if (!storedFileId) return
  const client = new ImageKit({ privateKey: env.IMAGEKIT_PRIVATE_KEY })
  try {
    await client.files.delete(storedFileId)
  } catch (error: unknown) {
    if (error instanceof NotFoundError) return
    throw error
  }
}
