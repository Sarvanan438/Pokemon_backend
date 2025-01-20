export interface UserDTO {
    username: string;
    email: string;
    password: string;
    id?:string;
    createdAt?:Date;
    updatedAt?:Date;
}
export interface LoginDTO {
    username: string;
    password: string;
}