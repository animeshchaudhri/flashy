export type Roles = "admin" | "moderator" | "user";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}
export interface Links {
  label: string;
  href: string;
  icon: React.ReactNode;
}
export {};
