import { Role } from "@/generated/enums"

export {}

declare global {
    interface CustomJwtSessionClaims  {
        role?: Role
    }
}