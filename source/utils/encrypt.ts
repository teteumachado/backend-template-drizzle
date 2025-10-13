import { createCipheriv, createDecipheriv, randomBytes } from 'crypto'

export const encrypt = (text: string) => {
  const key =  Buffer.from(process.env.PRIVATE_KEY!, 'hex')
  const iv = randomBytes(16)
  const cipher = createCipheriv('aes-256-cbc', key, iv)
  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return `${iv.toString('hex')}:${encrypted}`
}

export const decrypt = (text: string) => {
  const key =  Buffer.from(process.env.PRIVATE_KEY!, 'hex')
  const [iv, encrypted] = text.split(':')
  const decipher = createDecipheriv('aes-256-cbc', key, Buffer.from(iv, 'hex'))
  let decrypted = decipher.update(encrypted, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}
