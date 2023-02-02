import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main()
{
    try
    {               
        const res = await prisma.youtube_channels.updateMany({
            where:{
                id:1
            },
            data:{
                subscribers:600
            }
            })
            console.log(res);
    }
    catch(e)
    {
        console.log(e);
    }
    finally
    {
        async()=>
        {
            await prisma.$disconnect();
        }
    }
}

main();