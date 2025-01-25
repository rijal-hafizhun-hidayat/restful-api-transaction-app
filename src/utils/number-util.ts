export class NumberUtil {
  static formatToRupiah(amount: number): string {
    return amount.toLocaleString("id-ID");
  }
}
