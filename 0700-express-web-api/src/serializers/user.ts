export type UserResponse = {
  id: string;
  username: string;
  email: string;
  status: string;
};

export type UserShowResponse = {
  data: UserResponse;
};

export function serializeUser(user: UserResponse): UserResponse {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    status: user.status,
  };
}
