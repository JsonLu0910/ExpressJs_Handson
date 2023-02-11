import { Prisma, PrismaClient } from "@prisma/client";
import express, { Request, Response, NextFunction } from 'express'

const jsonWebToken = require('jsonwebtoken');

const myJWTSecretKey = 'my-secret-key';
const refreshTokenSecret = 'yourrefreshtokensecrethere';
const refreshTokens = [];
const prisma = new PrismaClient();

async function throwError()
{
    throw new Error("error detected!");

}

export const getAllEmployee = async (next: NextFunction) => {
    try {
        const res = await prisma.employee.findMany();
        console.log(res);
        return res;
    }
    catch (e) {
        console.log(e);
        return next(e);
    }
    finally {
        async () => {
            await prisma.$disconnect();
        }
    }
}

export const getAllCompany = async (next: NextFunction) => {
    try {
        const res = await prisma.company.findMany();
        console.log(res);
        return res;
    }
    catch (e) {
        console.log(e);
        return next(e);
    }
    finally {
        async () => {
            await prisma.$disconnect();
        }
    }
}

export const getEmployeeByCompany = async (id: number,next:NextFunction) => {
    try {
        const employee = await prisma.employee.findMany({
          where: {
            companyId: id,
          },
        });
    
        if(employee.length>0)
        {
            console.log(employee)
            return employee
        }
        else {
            return "no record found"
        }

      }   catch (e) {
        console.log(e);
        return next(e);
    }
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

export const createEmployee = async (name: string, address: string, age: number, companyId: number, password: string,role:string) => {
    const company = await prisma.employee.create({
        data: {
            name: name,
            address: address,
            age: age,
            companyId: companyId,
            role: role,
            password: password
        }
    });

    return "employee created";
}

export const updateCompany = async (id: number, name: string) => {
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

export const updateEmployee = async (id: number, name: string) => {
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

export const employeeLogin = async (name: string, password: string, next: NextFunction) => {
    try {
        const res = await prisma.employee.findMany
            ({
                where: { name: name, password: password }
            })
        if (res.length > 0) {
            // sign with default (HMAC SHA256) 
            console.log(res)
            const payload =
            {
                name: res[0].name,
                address: res[0].address,
                age: res[0].age,
                companyId: res[0].companyId,
                password: res[0].password,
                role: res[0].role,
                createdAt: res[0].createdAt,
                updatedAt: res[0].updatedAt,

            }
            const token = jsonWebToken.sign(payload, myJWTSecretKey);
            //Added a refresh token
            const refreshToken = jsonWebToken.sign(payload, refreshTokenSecret);

            refreshTokens.push(refreshToken);
            return { token: token, refreshToken: refreshToken };
        }
        else {
            return "no record found"
        }
    }
    catch (e) {
        console.log(e);
        return next(e);
    }



}

//Function to authenticate the user's JWT token
export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jsonWebToken.verify(token, myJWTSecretKey, (err: any) => {
            if (err) {
                return res.sendStatus(403);
            }

            next();
        });
    } else {
        res.sendStatus(401);
    }
};

export const deleteEmployee = async (id: number, next: NextFunction) => {
    try {
        const deletedEmployee = await prisma.employee.delete({
          where: {
            id: id,
          },
        });
        return "employee deleted";
      } catch (error) {
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === "P2025"
        ) {
            console.log("employee not found")
          return "employee not found";
        } 
        else console.error(error);
      }

}

export const deleteCompany = async (id: number) => {
    const res = await prisma.company.delete({
        where: {
            id: id
        }
    })

    return "company deleted";
}

export const getAllEmployeeWithName = async (next: NextFunction) => {
    try {
        const res = await prisma.employee.findMany();
        console.log(res);
        return res;
    }
    catch (e) {
        console.log(e);
        return next(e);
    }
    finally {
        async () => {
            await prisma.$disconnect();
        }
    }
}
