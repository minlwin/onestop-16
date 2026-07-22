type Role = 'Customer' | 'Shopper' | 'Admin'

export interface AuthResult {
    name: string
    roles: Role[]
    accessToken: string
    refreshToken: string
}

export type UserInfo = Omit<AuthResult, 'accessToken' | 'refreshToken'>
