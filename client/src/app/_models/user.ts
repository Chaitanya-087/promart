import { Role } from "./Role";

export interface User  {
    id: String;
    username: string;
    token: string;
    role: Role;
}