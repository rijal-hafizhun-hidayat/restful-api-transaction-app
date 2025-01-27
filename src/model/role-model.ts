import type { role } from "@prisma/client";

export interface RoleResponse {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export function toRolesResponse(roles: role[]): RoleResponse[] {
  return roles.map((role) => ({
    id: role.id,
    name: role.name,
    created_at: role.created_at,
    updated_at: role.updated_at,
  }));
}
