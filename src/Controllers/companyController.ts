// import { Request, Response, NextFunction } from 'express';
// import {  PrismaClient } from '@prisma/client';
// import { getAllUser } from '../Services/routes';
// import createHttpError from 'http-errors';
// const prisma = new PrismaClient();

// export const getUser =async (req:Request,res:Response,next:NextFunction)=>
// {
//     try
//     {
//         // const result = await prisma.youtube_channels.findMany();
//         // console.log(result);
//         // return res.send(result);
//     }
//     catch(e)
//     {
//         console.log(e);
//     }
// }

import { Request, Response, NextFunction } from 'express';
import {  PrismaClient } from '@prisma/client';
import { getAllEmployee,getAllCompany,createCompany, updateComp } from '../Services/routes';
import createHttpError from 'http-errors';

export const getAllCompanies =async (req:Request,res:Response,next:NextFunction)=>
{
    try
    {
        
        const result = await getAllCompany();
        console.log(res)
        return res.send(result);
    }
    catch(e)
    {
        console.log(e);
    }
}

export const create_Company =async (req:Request,res:Response,next:NextFunction)=>
{
    try
    {
        const result = await createCompany(req.body.name,req.body.address);
        console.log(res)
        return res.send(result);
    }
    catch(e)
    {
        console.log(e);
    }
}

export const updateCompany =async (req:Request,res:Response,next:NextFunction)=>
{
    try
    {
        const result = await updateComp(parseInt(req.body.id),req.body.name);
        console.log(res)
        return res.send(result);
    }
    catch(e)
    {
        console.log(e);
    }
}


