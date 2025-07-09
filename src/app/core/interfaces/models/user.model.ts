import { RoleModel } from "./role.model";

export interface UserModel {
    id: number,
    name: string,
    surname: string,
    email: string,
    username: string,
    token: string,
    role: RoleModel
}