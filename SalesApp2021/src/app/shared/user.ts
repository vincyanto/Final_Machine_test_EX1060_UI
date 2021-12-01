import { Role } from "./role";
export class User{
    UserId: number;
    UserName: string;
    UserPassword: string;
    RoleId:number;
    //object oriented model
    Role:Role;
}
