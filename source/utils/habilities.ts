export type Role = keyof typeof ROLES
export type Habilitie = (typeof ROLES)[Role][number]

export const ROLES = {
  SUPER_ADMIN: [
    'manage:leads'
  ],
  ADMIN: [
    'view:leads'
  ],
  USER: []
} as const

export const hasHabilitie = (role: Role, habilities: Habilitie[]) => {
  return habilities.some((habilitie) => (ROLES[role] as readonly Habilitie[]).includes(habilitie))
}

export const hasManyHabilties = (role: Role, habilities: Habilitie[]) => {
  return habilities.every((habilitie) => hasHabilitie(role, [habilitie]))
}
