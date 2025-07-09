export class ServiceError extends Error {
  code: number
  constructor({ code, message }: { code: number, message: string }) {
    super(`Erro ${code}, Mensagem: ${message}`)
    this.code = code
    this.message = message
  }
}
