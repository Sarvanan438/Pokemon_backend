import { LoginDTO, UserDTO } from "../dto/user";
export default interface UserDTOFactory{
    createUserDTO(data: Partial<UserDTO>): UserDTO
    createLoginDTO(data: Partial<LoginDTO>): LoginDTO
}

export class SimpleUserDTOFactory implements UserDTOFactory {
     createUserDTO(data: Partial<UserDTO>): UserDTO {
        return data as UserDTO;
    }

     createLoginDTO(data: Partial<LoginDTO>): LoginDTO {
        return data as LoginDTO
    }
}

