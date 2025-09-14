import { getTestUser } from './get-user.ts'
import { loginUser } from './login.ts'
import { registerUser } from './register.ts'


export function utils() {
  return {
    getTestUser,
    loginUser,
    registerUser,
  }
}