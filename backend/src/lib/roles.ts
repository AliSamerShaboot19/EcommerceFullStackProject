import type { UserRole } from '../db/schema'

export function parseRole (value: unknown): UserRole {
  const roles: UserRole[] = ['customer', 'support', 'admin']
  return roles.includes(value as UserRole) ? (value as UserRole) : 'customer'
}

export const isAdmin = (role: UserRole) => role === 'admin'

export const isStaff = (role: UserRole) =>
  role === 'admin' || role === 'support'
