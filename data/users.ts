export type UserRole = "admin" | "manager" | "registered";

export type MockUser = {
  email: string;
  password: string;
  role: UserRole;
  name: string;
};

export const INITIAL_USERS: MockUser[] = [
  {
    email: "admin@cineverse.com",
    password: "admin123",
    role: "admin",
    name: "Admin",
  },
  {
    email: "manager@cineverse.com",
    password: "manager123",
    role: "manager",
    name: "Star Cineplex Manager",
  },
  {
    email: "user@cineverse.com",
    password: "user123",
    role: "registered",
    name: "Rahim",
  },
];
