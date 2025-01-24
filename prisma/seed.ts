import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const items = await prisma.m_barang.createMany({
    data: [
      {
        kode: `B${Math.floor(1000 + Math.random() * 9000)}`,
        harga: 20000.0,
        nama: "kaos kaki",
      },
      {
        kode: `B${Math.floor(1000 + Math.random() * 9000)}`,
        harga: 60000.0,
        nama: "sepatu",
      },
      {
        kode: `B${Math.floor(1000 + Math.random() * 9000)}`,
        harga: 50000.0,
        nama: "baju",
      },
      {
        kode: `B${Math.floor(1000 + Math.random() * 9000)}`,
        harga: 25000.0,
        nama: "topi",
      },
    ],
  });

  const costumers = await prisma.m_costumer.createMany({
    data: [
      {
        kode: `U${Math.floor(1000 + Math.random() * 9000)}`,
        nama: "rijal",
        telp: "081393784144",
      },
      {
        kode: `U${Math.floor(1000 + Math.random() * 9000)}`,
        nama: "hafizhun",
        telp: "081392784144",
      },
      {
        kode: `U${Math.floor(1000 + Math.random() * 9000)}`,
        nama: "hidayat",
        telp: "081393584144",
      },
    ],
  });

  console.log(costumers);
  console.log(items);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
