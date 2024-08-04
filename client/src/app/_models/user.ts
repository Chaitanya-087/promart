export interface User  {
    id: String;
    username: string;
    token: string;
    role: "User" | "Admin" | "Viewer";
}