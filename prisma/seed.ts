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

  const customer = await prisma.m_customer.createMany({
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

  const user = await prisma.user.create({
    data: {
      name: "rijal hafizhun hidayat",
      email: "rijal.1344@gmail.com",
      password:
        "$argon2id$v=19$m=65536,t=2,p=1$gbeDqrnOu39J7WmVAe+jC4/6y6wHu81SOPELbwxaJ7M$Wznj+VARyCqJzz5HGNe9djenbP9DPN/4c1tK2412nSo",
    },
  });

  const roles = await prisma.role.createMany({
    data: [
      {
        name: "admin",
      },
      {
        name: "teller",
      },
    ],
  });

  const roleAdmin = await prisma.role.findUnique({
    where: {
      name: "admin",
    },
  });

  const user_role = await prisma.user_role.create({
    data: {
      user_id: user.id,
      role_id: roleAdmin!.id,
    },
  });

  console.log(customer);
  console.log(items);
  console.log(user);
  console.log(roles);
  console.log(user_role);
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
