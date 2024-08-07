import { Role } from "./Role";

export interface User  {
    id: String;
    username: string;
    email: string;
    role: Role;
}