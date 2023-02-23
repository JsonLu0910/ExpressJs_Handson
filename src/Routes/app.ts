import express, {Request, Response} from 'express';
import { NextFunction } from 'express-serve-static-core';
import helmet from "helmet";
import { getAllEmployeeController,getEmployeeByCompanyIdController,createEmployeeController,updateEmployeeController,loginController, deleteEmployeeController } from '../Controllers/userController';
import { createCompanyController, getAllCompanyController, updateCompanyController } from '../Controllers/companyController';
import {validate,dataSchema,employeeCompanyId,employeeDetails,companyDetails,updateCompanyDetail,updateEmployeeDetail} from '../models/schema/agreement.schema'
import { authenticateJWT } from '../Services/routes';
const app = express();
const cors = require("cors")
var { expressjwt: jwt } = require("express-jwt");
const useragent = require('express-useragent')
app.set('trust proxy', true);
app.use(cors());
app.use(useragent.express())
app.use(cors({origin:'*'}))
app.use(helmet());
app.use(express.json());

app.use((req, res, next) => {
	res.header('Access-Control-ALlow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-ALlow-Credentials', 'false');
	next();
});

app.get("/",(req,res)=>{
	res.send("hello world..");
})
// hs
// include the JWT auth part to here, refer to the jira task I created for you

app.get("/api/getAllEmployee",authenticateJWT,getAllEmployeeController);
app.get("/api/getAllCompany",authenticateJWT,getAllCompanyController);
//Added zod to validate
app.get("/api/getEmployeeByComp/:companyId",authenticateJWT,getEmployeeByCompanyIdController);
app.post("/api/createCompany",authenticateJWT,createCompanyController);
app.post("/api/createEmployee",authenticateJWT,createEmployeeController);
app.put("/api/updateCompany",authenticateJWT,updateCompanyController);
app.put("/api/updateEmployee",authenticateJWT,updateEmployeeController);
app.delete("/api/deleteEmployee",authenticateJWT,deleteEmployeeController);
// hs
// the route naming make it consistant, dont use camel case and snake case together
app.post("/api/login",loginController);


app.listen(3000,()=>{
    console.log("listening port http://localhost:3000");
});