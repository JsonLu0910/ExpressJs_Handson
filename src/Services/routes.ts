import { PrismaClient } from "@prisma/client";
import express,{  Request, Response, NextFunction } from 'express'

const prisma = new PrismaClient();

export const getAllEmployee = async () => 
{
    try{
        const res = await prisma.employee.findMany();
        console.log(res);
        return res;
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

export const getAllCompany = async () => 
{
    try{
        const res = await prisma.company.findMany();
        console.log(res);
        return res;
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

export const getEmployeeByCompany = async (id:number)=>{
    const employee = await prisma.employee.findMany({
        where: {
          companyId:id
        }
      });
    
      return employee;
}

export const createCompany = async (name:string,address:string)=>{
    const company = await prisma.company.create({
        data: {
          name:name,
          address:address
        }
      });
    
      return "company created";
}

export const createEmployee  = async (name:string,address:string,age:number,compId:number)=>{
    const company = await prisma.employee.create({
        data: {
          name:name,
          address:address,
          age:age,
          companyId:compId
        }
      });
    
      return "employee created";
}

export const updateComp  = async (id:number,name:string)=>{
    const res = await prisma.company.update({
        where:{
            id:id
        },
        data:{
            name:name
        }
        })
    
      return "company updated";
}

export const updateEmp  = async (id:number,name:string)=>{
    const res = await prisma.employee.update({
        where:{
            id:id
        },
        data:{
            name:name
        }
        })
    
      return "employee updated";
}