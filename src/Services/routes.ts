import { PrismaClient } from "@prisma/client";
import express, { Request, Response, NextFunction } from 'express'

const jsonWebToken = require('jsonwebtoken');
const prisma = new PrismaClient();
const myJWTSecretKey = 'my-secret-key';
export const getAllEmployee = async () => {
    try {
        const res = await prisma.employee.findMany();
        console.log(res);
        return res;
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

export const getAllCompany = async () => {
    try {
        const res = await prisma.company.findMany();
        console.log(res);
        return res;
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

export const getEmployeeByCompany = async (id: number) => {
    const employee = await prisma.employee.findMany({
        where: {
            companyId: id
        }
    });

    return employee;
}

export const createCompany = async (name: string, address: string) => {
    const company = await prisma.company.create({
        data: {
            name: name,
            address: address
        }
    });

    return "company created";
}

export const createEmployee = async (name: string, address: string, age: number, compId: number) => {
    const company = await prisma.employee.create({
        data: {
            name: name,
            address: address,
            age: age,
            companyId: compId
        }
    });

    return "employee created";
}

export const updateComp = async (id: number, name: string) => {
    const res = await prisma.company.update({
        where: {
            id: id
        },
        data: {
            name: name
        }
    })

    return "company updated";
}

export const updateEmp = async (id: number, name: string) => {
    const res = await prisma.employee.update({
        where: {
            id: id
        },
        data: {
            name: name
        }
    })

    return "employee updated";
}

export const EmployeeLogin = async (name: string, password: string) => {
    const res = await prisma.employee.findMany
        ({
            where: { name: name, password: password }
        })
    if (res) {
        // sign with default (HMAC SHA256) 
        const payload =
        {
            name:res[0].name,
            address:res[0].address,
            age:res[0].age,
            companyId:res[0].companyId,
            password:res[0].password,
            createdAt:res[0].createdAt,
            updatedAt:res[0].updatedAt,
        }
        const token = jsonWebToken.sign(payload, myJWTSecretKey);
        return {token:token};
    }

}
