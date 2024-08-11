import { Roles } from "../types/globals";

export interface ProtectedRouteProps {
  allowedRoles: Roles[];
  children: React.ReactNode;
}
