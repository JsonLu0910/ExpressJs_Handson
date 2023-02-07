import express, {Request, Response} from 'express';
import { NextFunction } from 'express-serve-static-core';
import helmet from "helmet";
import { getAllEmployeeController,getEmployeeByCompanyIdController,createEmployeeController,updateEmployeeController,loginController } from '../Controllers/userController';
import { createCompanyController, getAllCompanyController, updateCompanyController } from '../Controllers/companyController';
import {validate,dataSchema,employeeCompanyId,employeeDetails,companyDetails,updateCompanyDetail,updateEmployeeDetail} from '../models/schema/agreement.schema'
import { authenticateJWT } from '../Services/routes';
const app = express();
var { expressjwt: jwt } = require("express-jwt");
app.use(helmet());
app.use(express.json());


// hs
// include the JWT auth part to here, refer to the jira task I created for you

app.get("/api/getAllEmployee",authenticateJWT,getAllEmployeeController);
app.get("/api/getAllCompany",authenticateJWT,getAllCompanyController);
//Added zod to validate
app.get("/api/getEmployeeByComp/:CompId",validate(employeeCompanyId),getEmployeeByCompanyIdController);
app.post("/api/createCompany",validate(companyDetails),createCompanyController);
app.post("/api/createEmployee",validate(employeeDetails),createEmployeeController);
app.put("/api/updateCompany",validate(updateCompanyDetail),updateCompanyController);
app.put("/api/updateEmployee",validate(updateEmployeeDetail),updateEmployeeController);

// hs
// the route naming make it consistant, dont use camel case and snake case together
app.get("/api/login",validate(dataSchema),loginController);


app.listen(3000,()=>{
    console.log("listening port http://localhost:3000");
});