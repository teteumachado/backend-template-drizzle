import { hash, compare } from 'bcrypt'

export const CreateHash = (password: string) => {
  return hash(password, 10)
}

export const VerifyHash = (password: string, hash: string) => {
  return compare(password, hash)
}
