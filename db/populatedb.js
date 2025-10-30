const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function create() {
    await prisma.item.create({
        data: {
            name: "Filtro de Óleo",
            description: "Filtro de óleo para carros",
            price: 29.99,
            quantity: 100
        },
    });
}

create()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });