export type UserRole = "admin" | "manager" | "registered";

export type MockUser = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
};
