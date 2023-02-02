import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    try {
        const data_rows = 
        [
            { name: 'Jason', address: 'test address 1',age:20,companyId:1},
            { name: 'John', address: 'test address 2',age:22,companyId:2},
            { name: 'Jack', address: 'test address 3',age:23,companyId:3},
            { name: 'Lee', address: 'test address 4',age:24,companyId:4},
        ];

        const res = await prisma.employee.createMany({
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