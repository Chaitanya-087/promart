import { Role } from './role';

export interface User  {
    id: String;
    username: string;
    email: string;
    role: Role;
}