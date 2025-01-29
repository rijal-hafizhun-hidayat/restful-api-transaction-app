import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import {
  toLoginResponse,
  type LoginRequest,
  type LoginResponse,
} from "../model/auth-model";
import { BlacklistUtil } from "../utils/blacklist-util";
import { TokenUtil } from "../utils/token-util";
import { AuthValidation } from "../validation/auth-validation";
import { Validation } from "../validation/validation";

export class AuthService {
  static async login(request: LoginRequest): Promise<LoginResponse> {
    const requestBody: LoginRequest = Validation.validate(
      AuthValidation.loginSchema,
      request
    );

    const user = await prisma.user.findUnique({
      where: {
        email: requestBody.email,
      },
    });

    if (!user) {
      throw new ErrorResponse(404, "email atau password salah");
    }

    const isPasswordMatch = await Bun.password.verify(
      requestBody.password,
      user.password
    );

    if (!isPasswordMatch) {
      throw new ErrorResponse(404, "email atau password salah");
    }

    const token: string = await TokenUtil.generateToken(user);

    return toLoginResponse(token);
  }

  static async logout(tokenHeader: string) {
    const [, token] = tokenHeader.split(" ");

    if (BlacklistUtil.hasTokenBlacklist(token)) {
      throw new ErrorResponse(404, "token has been blacklisted");
    }

    BlacklistUtil.addTokenBlacklist(token);
  }
}
