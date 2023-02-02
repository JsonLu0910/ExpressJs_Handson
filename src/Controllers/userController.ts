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
import { getAllEmployee, getEmployeeByCompany,createEmployee,updateEmp } from '../Services/routes';
import createHttpError from 'http-errors';

export const getAllEmployees =async (req:Request,res:Response,next:NextFunction)=>
{
    try
    {
        const result = await getAllEmployee();
        return res.send(result);
    }
    catch(e)
    {
        console.log(e);
    }
}

export const getEmployeeByComp = async (req:Request,res:Response,next:NextFunction)=>
{
    
    const CompId = req.params.CompId;
    const result = await getEmployeeByCompany(parseInt(CompId));
    return res.send(result);
}

export const createAEmployee =async (req:Request,res:Response,next:NextFunction)=>
{
    try
    {
        const result = await createEmployee(req.body.name,req.body.address,parseInt(req.body.age),parseInt(req.body.compId));
        console.log(res)
        return res.send(result);
    }
    catch(e)
    {
        console.log(e);
    }
}

export const updateEmployee =async (req:Request,res:Response,next:NextFunction)=>
{
    try
    {
        const result = await updateEmp(parseInt(req.body.id),req.body.name);
        console.log(res)
        return res.send(result);
    }
    catch(e)
    {
        console.log(e);
    }
}
