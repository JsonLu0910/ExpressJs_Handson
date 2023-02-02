import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    try {
        const channel = { name: 'Jason Lu 5', description: 'Software Engineer', subscribers: 555, link: 'https://www.youtube.com' };
        const data_rows = 
        [
            { name: 'Jason Lu', description: 'Software Engineer', subscribers: 514, link: 'https://www.youtube.com' },
            { name: 'Jason Lu 2', description: 'Software Engineer', subscribers: 514, link: 'https://www.youtube.com' },
            { name: 'Jason Lu 3', description: 'Software Engineer', subscribers: 514, link: 'https://www.youtube.com' },
            { name: 'Jason Lu 4', description: 'Software Engineer', subscribers: 514, link: 'https://www.youtube.com' }
        ];

        const res = await prisma.youtube_channels.createMany({
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