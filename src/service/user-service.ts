import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import {
  toUsersWithRoleResponse,
  toUserWithRoleResponse,
  type UserRequest,
  type UserWithRoleResponse,
} from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";

export class UserService {
  static async storeUser(request: UserRequest): Promise<UserWithRoleResponse> {
    const requestBody: UserRequest = Validation.validate(
      UserValidation.userWithRoleSchema,
      request
    );

    const isEmailExist = await prisma.user.findUnique({
      where: {
        email: requestBody.email,
      },
    });

    if (isEmailExist) {
      throw new ErrorResponse(404, "email already exist");
    }

    const hashPassword = Bun.password.hashSync(requestBody.password);

    const [storeUser] = await prisma.$transaction([
      prisma.user.create({
        data: {
          name: requestBody.name,
          email: requestBody.email,
          password: hashPassword,
          user_role: {
            create: {
              role_id: requestBody.role.id,
            },
          },
        },
        include: {
          user_role: {
            include: {
              role: true,
            },
          },
        },
      }),
    ]);

    return toUserWithRoleResponse(storeUser);
  }

  static async getAllUsersWithRole(
    search?: string
  ): Promise<UserWithRoleResponse[]> {
    const filterConditions: any = {};

    if (search) {
      filterConditions.OR = [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }

    const result = await prisma.user.findMany({
      where: filterConditions,
      include: {
        user_role: {
          include: {
            role: true,
          },
        },
      },
    });

    return toUsersWithRoleResponse(result);
  }

  static async getUserByUserId(userId: number): Promise<UserWithRoleResponse> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        user_role: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!user) {
      throw new ErrorResponse(404, "user not found");
    }

    return toUserWithRoleResponse(user);
  }

  static async destroyUserByUserId(
    userId: number
  ): Promise<UserWithRoleResponse> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        user_role: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!user) {
      throw new ErrorResponse(404, "user not found");
    }

    const [destroyUser] = await prisma.$transaction([
      prisma.user.delete({
        where: {
          id: userId,
        },
        include: {
          user_role: {
            include: {
              role: true,
            },
          },
        },
      }),
    ]);

    return toUserWithRoleResponse(destroyUser);
  }

  static async updateUserByUserId(
    request: UserRequest,
    userId: number
  ): Promise<UserWithRoleResponse> {
    const requestBody: UserRequest = Validation.validate(
      UserValidation.updateUserSchema,
      request
    );

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new ErrorResponse(404, "pengguna tidak ditemukan");
    }

    if (user.email !== requestBody.email) {
      const isEmailExist = await prisma.user.findUnique({
        where: {
          email: requestBody.email,
        },
      });

      if (isEmailExist) {
        throw new ErrorResponse(404, "email sudah ada");
      }
    }

    if (requestBody.password !== "") {
      requestBody.password = await Bun.password.hash(requestBody.password);
    } else {
      requestBody.password = user.password;
    }

    const [updateUser] = await prisma.$transaction([
      prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          name: requestBody.name,
          email: requestBody.email,
          password: requestBody.password,
          user_role: {
            update: {
              role_id: requestBody.role.id,
            },
          },
        },
        include: {
          user_role: {
            include: {
              role: true,
            },
          },
        },
      }),
    ]);

    return toUserWithRoleResponse(updateUser);
  }
}
