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
import { getAllEmployee, getEmployeeByCompany,createEmployee,updateEmployee,employeeLogin } from '../Services/routes';
import createHttpError from 'http-errors';

export const getAllEmployeeController =async (req:Request,res:Response,next:NextFunction)=>
{
    try
    {
        const result = await getAllEmployee(next);
        return res.send(result);
    }
    catch(e)
    {
        console.log(e);
        return next(e);
    }
}

export const getEmployeeByCompanyIdController = async (req:Request,res:Response,next:NextFunction)=>
{
    
    const CompId = req.params.CompId;
    const result = await getEmployeeByCompany(parseInt(CompId));
    return res.send(result);
}

export const createEmployeeController =async (req:Request,res:Response,next:NextFunction)=>
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
        return next(e);
    }
}

export const updateEmployeeController =async (req:Request,res:Response,next:NextFunction)=>
{
    try
    {
        const result = await updateEmployee(parseInt(req.body.id),req.body.name);
        console.log(res)
        return res.send(result);
    }
    catch(e)
    {
        console.log(e);
        return next(e);
    }
}

export const loginController = async (req:Request, res:Response, next:NextFunction)=>
{
    const result = await employeeLogin(req.body.name,req.body.password);
    return res.send(result);
}
