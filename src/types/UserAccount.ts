export interface UserAccount {
  id?: number;
  username: string;
  email?: string;
  // JWT or session token returned by the API
  token?: string;
}
