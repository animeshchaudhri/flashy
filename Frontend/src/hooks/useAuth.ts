import { useUser } from "@clerk/clerk-react";

type UserRole = "user" | "admin";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any; // You might want to define a more specific type for your user
  role: UserRole;
}

export function useAuth(): AuthState {
  const { isSignedIn, user, isLoaded } = useUser();

  // Determine the user's role based on Clerk's public metadata
  // This assumes you've set up roles in Clerk's dashboard
  const role: UserRole = (user?.publicMetadata?.role as UserRole) || "user";

  return {
    isAuthenticated: isSignedIn || false,
    isLoading: !isLoaded,
    user,
    role,
  };
}
