export class RoleUtil {
  static async compareRole(roleUser: string, roleCompare: string) {
    if (roleUser === roleCompare) {
      return true;
    } else {
      return false;
    }
  }
}
