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

// hs
// make sure your name is consistant, developer wont know what is updateComp, use updateCompany instead
import { getAllEmployee,getAllCompany,createCompany, updateCompany } from '../Services/routes';


export const getAllCompanyController =async (req:Request,res:Response,next:NextFunction)=>
{
    try
    {
        
        const result = await getAllCompany(next);
        console.log(res)
        return res.send(result);
    }
    catch(e)
    {
        // hs
        // this one just comsole out the error but it wont retorn to the client,
        // try check how to return error to client side
        // or try refer to my code
        // anything not understand please come to me
        console.log(e);
        return next(e);
    }
}

// hs
// the function naming should consistant, dont some use camel case and some use snake case
export const createCompanyController =async (req:Request,res:Response,next:NextFunction)=>
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
        return next(e);
    }
}

export const updateCompanyController =async (req:Request,res:Response,next:NextFunction)=>
{
    try
    {
        const result = await updateCompany(parseInt(req.body.id),req.body.name);
        console.log(res)
        return res.send(result);
    }
    catch(e)
    {
        console.log(e);
        return next(e);
    }
}


