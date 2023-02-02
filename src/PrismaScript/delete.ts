import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main()
{
    try
    {               
        const res = await prisma.youtube_channels.delete({
            where:{
                id:5
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