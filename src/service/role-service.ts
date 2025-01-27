import { prisma } from "../app/database";
import { toRolesResponse, type RoleResponse } from "../model/role-model";

export class RoleService {
  static async getAllRoles(): Promise<RoleResponse[]> {
    const roles = await prisma.role.findMany();

    return toRolesResponse(roles);
  }
}
