export class CreateUserDto {
    readonly first_name: string
    readonly last_name: string
    readonly user_email: string
    readonly user_phone: string
    user_password: string
    readonly isActive?: boolean

}