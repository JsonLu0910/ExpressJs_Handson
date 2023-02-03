import express, {Request, Response} from 'express';
import { NextFunction } from 'express-serve-static-core';
import helmet from "helmet";
import { getAllEmployees,getEmployeeByComp,createAEmployee,updateEmployee } from '../Controllers/userController';
import { createACompany, getAllCompanies,updateCompany } from '../Controllers/companyController';

const app = express();
app.use(helmet());
app.use(express.json());

app.get("/api/getAllEmployee",getAllEmployees);
app.get("/api/getAllCompany",getAllCompanies);
app.get("/api/getEmployeeByComp/:CompId",getEmployeeByComp);
//Naming nid to change
app.post("/api/createCompany",createACompany);
app.post("/api/createEmployee",createAEmployee);
app.put("/api/updateCompany",updateCompany);
app.put("/api/updateEmployee",updateEmployee);




app.listen(3000,()=>{
    console.log("listening port http://localhost:3000");
});