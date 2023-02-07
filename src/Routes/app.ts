import express, {Request, Response} from 'express';
import { NextFunction } from 'express-serve-static-core';
import helmet from "helmet";
import { getAllEmployees,getEmployeeByComp,create_Employee,updateEmployee,Login } from '../Controllers/userController';
import { create_Company, getAllCompanies,updateCompany } from '../Controllers/companyController';
import {validate,dataSchema,employeeCompanyId,employeeDetails,companyDetails,updateCompanyDetail,updateEmployeeDetail} from '../models/schema/agreement.schema'
const app = express();
var { expressjwt: jwt } = require("express-jwt");
app.use(helmet());
app.use(express.json());


// hs
// include the JWT auth part to here, refer to the jira task I created for you
app.get("/api/getAllEmployee",getAllEmployees);
app.get("/api/getAllCompany",getAllCompanies);
//Added zod to validate
app.get("/api/getEmployeeByComp/:CompId",validate(employeeCompanyId),getEmployeeByComp);
app.post("/api/createCompany",validate(companyDetails),create_Company);
app.post("/api/createEmployee",validate(employeeDetails),create_Employee);
app.put("/api/updateCompany",validate(updateCompanyDetail),updateCompany);
app.put("/api/updateEmployee",validate(updateEmployeeDetail),updateEmployee);

// hs
// the route naming make it consistant, dont use camel case and snake case together
app.get("/api/Login",validate(dataSchema),Login);


app.listen(3000,()=>{
    console.log("listening port http://localhost:3000");
});