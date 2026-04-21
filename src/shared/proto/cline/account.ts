// Proto stub for account

// Export interfaces as values for esbuild compatibility
export const AuthState = {} as AuthState;
export const UserInfo = {} as UserInfo;

export interface UserInfo {
  id: string;
  name: string;
  email?: string;
}

export interface AuthState {
  apiKey?: string;
  user?: UserInfo;
}
