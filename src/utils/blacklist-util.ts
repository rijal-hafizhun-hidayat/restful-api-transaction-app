export class BlacklistUtil {
  private static blacklist = new Set<string>();

  static addTokenBlacklist(token: string): void {
    this.blacklist.add(token);
  }

  static hasTokenBlacklist(token: string): boolean {
    return this.blacklist.has(token);
  }
}
