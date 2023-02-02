import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    try {
        const data_rows = 
        [
            { name: 'company 1', address: 'test address 1'},
            { name: 'company 2', address: 'test address 2'},
            { name: 'company 3', address: 'test address 3'},
            { name: 'company 4', address: 'test address 4'},
        ];

        const res = await prisma.company.createMany({
             data: data_rows,
             skipDuplicates :true
        })

        console.log(res);
    }
    catch (e) {
        console.log(e);
    }
    finally {
        async () => {
            await prisma.$disconnect();
        }
    }
}

main();