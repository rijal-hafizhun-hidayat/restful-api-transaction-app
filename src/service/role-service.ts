import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import {
  toRoleResponse,
  toRolesResponse,
  type RoleRequest,
  type RoleResponse,
} from "../model/role-model";
import { RoleValidation } from "../validation/role-validation";
import { Validation } from "../validation/validation";

export class RoleService {
  static async getAllRoles(): Promise<RoleResponse[]> {
    const roles = await prisma.role.findMany();

    return toRolesResponse(roles);
  }

  static async storeRole(request: RoleRequest): Promise<RoleResponse> {
    const requestBody: RoleRequest = Validation.validate(
      RoleValidation.roleSchema,
      request
    );

    const role = await prisma.role.findUnique({
      where: {
        name: requestBody.name,
      },
    });

    if (role) {
      throw new ErrorResponse(404, "nama role sudah ada");
    }

    const [storeRole] = await prisma.$transaction([
      prisma.role.create({
        data: {
          name: requestBody.name,
        },
      }),
    ]);

    return toRoleResponse(storeRole);
  }

  static async destroyRoleByRoleId(roleId: number): Promise<RoleResponse> {
    const role = await prisma.role.findUnique({
      where: {
        id: roleId,
      },
    });

    if (!role) {
      throw new ErrorResponse(404, "role tidak ditemukan");
    }

    const [destroyRole] = await prisma.$transaction([
      prisma.role.delete({
        where: {
          id: roleId,
        },
      }),
    ]);

    return toRoleResponse(destroyRole);
  }

  static async getRoleByRoleId(roleId: number): Promise<RoleResponse> {
    const role = await prisma.role.findUnique({
      where: {
        id: roleId,
      },
    });

    if (!role) {
      throw new ErrorResponse(404, "role tidak ditemukan");
    }

    return toRoleResponse(role);
  }

  static async updateRoleByRoleId(
    request: RoleRequest,
    roleId: number
  ): Promise<RoleResponse> {
    const requestBody: RoleRequest = Validation.validate(
      RoleValidation.roleSchema,
      request
    );

    const role = await prisma.role.findUnique({
      where: {
        id: roleId,
      },
    });

    if (!role) {
      throw new ErrorResponse(404, "role tidak ditemukan");
    }

    const [updateRole] = await prisma.$transaction([
      prisma.role.update({
        where: {
          id: roleId,
        },
        data: {
          name: requestBody.name,
        },
      }),
    ]);

    return toRoleResponse(updateRole);
  }
}
