export class CodeUtil {
  static generateTransactionCode(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const random = Math.floor(1000 + Math.random() * 9000);

    return `${year}${month}-${random}`;
  }

  static generateCustomerCode(): string {
    const random = Math.floor(1000 + Math.random() * 9000);

    return `U${random}`;
  }
}
