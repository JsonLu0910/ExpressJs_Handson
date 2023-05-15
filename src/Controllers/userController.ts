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
import { PrismaClient } from '@prisma/client';
import { getAllEmployee, getEmployeeByCompany, createEmployee, updateEmployee, employeeLogin, deleteEmployee } from '../Services/routes';
import fsExtra from "fs-extra";
import createHttpError from 'http-errors';
import { promises as fsPromises } from 'fs';

const path = require('path');
const fs = require('fs');
const multer = require('multer');
const uuid = require("uuid");
const networkDrive = require('windows-network-drive');

const directory = path.join(__dirname, `../../uploads`);

export const multerStorage = multer.diskStorage({
	destination: (req: any, file: any, cb: (arg0: null, arg1: string) => any) => {
		const exist = fs.existsSync(`${directory}`);
		if (!exist) {
			fs.mkdirSync(`${directory}`);
		}
		return cb(null, `${directory}`);
	},
	filename: (req: any, file: { originalname: any; }, cb: (arg0: null, arg1: string) => void) => {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});

export const upload = multer({
	storage: multerStorage,

});

export const getAllEmployeeController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const result = await getAllEmployee(next);
		return res.send(result);
	}
	catch (e) {
		console.log(e);
		return next(e);
	}
}

export const getEmployeeByCompanyIdController = async (req: Request, res: Response, next: NextFunction) => {
	const CompId = req.params.companyId;
	const result = await getEmployeeByCompany(parseInt(CompId), next);
	console.log(result)
	return res.send(result);
}

export const createEmployeeController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const result = await createEmployee(req.body.name, req.body.address, parseInt(req.body.age), parseInt(req.body.companyId), req.body.password, req.body.role);
		console.log(res)
		return res.send(result);
	}
	catch (e) {
		console.log(e);
		return next(e);
	}
}

export const updateEmployeeController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const result = await updateEmployee(parseInt(req.body.id), req.body.name);
		console.log(res)
		return res.send(result);
	}
	catch (e) {
		console.log(e);
		return next(e);
	}
}

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
	const result = await employeeLogin(req.body.name, req.body.password, next);
	return res.send(result);
}

export const deleteEmployeeController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const result = await deleteEmployee(parseInt(req.body.id), next);
		console.log(res)
		return res.send(result);
	}
	catch (e) {
		console.log(e);
		return next(e);
	}
}

export const uploadFileController = async (res: Response, next: NextFunction, files: any) => {
	try {
		const source = 'C:/Users/arkmind.johnnytin/Desktop/Jason';

		const filePath = files[0].path;
		const destinationFilePath = '\\\\172.16.241.250\\RON-RCASH-WDATA\\redCash\\' + files[0].originalname
		const movedFile = fs.copyFile(filePath, destinationFilePath, (err: any) => {
			if (err) {
				console.log(err);
				return res.status(500).send(err);
			}
		});
		
		res.send('succesfully uploaded');
	}
	catch (e) {
		return next(e);
	}
};

export const getFileController = async (req:Request, res: Response, next: NextFunction) => {
	try{
		
	const { body } =req;
	const destinationFilePath = "\\\\172.16.241.250\\RON-RCASH-WDATA\\redCash\\"+body.fileName+".pdf";	
	res.sendFile(destinationFilePath);
	
	}
	catch(e){
		return next(e);
	}
	
};