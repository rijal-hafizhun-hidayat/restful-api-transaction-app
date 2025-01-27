import type { role } from "@prisma/client";

export interface UserRequest {
  name: string;
  email: string;
  password: string;
  role: role;
}
export interface UserWithUserRoleAndRole {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  user_role: UserRoleWithRole | null;
}

export interface UserRoleWithRole {
  id: number;
  role_id: number;
  user_id: number;
  created_at: Date;
  updated_at: Date;
  role: role;
}

export interface UserWithRoleResponse {
  id: number;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  role: role | null;
}

export function toUserWithRoleResponse(
  user: UserWithUserRoleAndRole
): UserWithRoleResponse {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.created_at,
    updated_at: user.updated_at,
    role: user.user_role
      ? {
          id: user.user_role.role.id,
          name: user.user_role.role.name,
          created_at: user.user_role.role.created_at,
          updated_at: user.user_role.role.updated_at,
        }
      : null,
  };
}

export function toUsersWithRoleResponse(
  users: UserWithUserRoleAndRole[]
): UserWithRoleResponse[] {
  return users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.created_at,
    updated_at: user.updated_at,
    role: user.user_role
      ? {
          id: user.user_role.role.id,
          name: user.user_role.role.name,
          created_at: user.user_role.role.created_at,
          updated_at: user.user_role.role.updated_at,
        }
      : null,
  }));
}
