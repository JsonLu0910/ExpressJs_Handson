import express, { Request, Response, NextFunction } from "express";
import { z, AnyZodObject } from "zod";

const app = express();

app.use(express.json());

export const dataSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string"
        }).max(10, { message: "Must be 10 or fewer characters long" }).min(4, { message: "Must be 4 or more characters long" }),
        password: z.string({
            required_error: "Password is required",
        }).max(10, { message: "Must be 10 or fewer characters long" }).min(8, { message: "Must be 8 or more characters long" })

    }),
});

export const validate =
    (schema: AnyZodObject) =>
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                await schema.parseAsync({
                    body: req.body,
                    query: req.query,
                    params: req.params,
                });
                return next();
            } catch (error) {
                return res.status(400).json("Error:" + error);
            }
        };

export const employeeCompanyId = z.object({
    body: z.object({
        companyId: z.number({
            required_error: "Company ID is required",
            invalid_type_error: "Company ID must be a number"
        })
    }),
})

export const employeeDetails = z.object({
    body: z.object({
        name: z.string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string"
        }).max(10, { message: "Must be 10 or fewer characters long" }).min(8, { message: "Must be 8 or more characters long" }),
        password: z.string({
            required_error: "Password is required",
        }).max(10, { message: "Must be 10 or fewer characters long" }).min(8, { message: "Must be 8 or more characters long" })
    }),
    companyId: z.number({
        required_error: "Company ID is required",
        invalid_type_error: "Company ID must be a number"
    }),
    address: z.string({
        required_error: "Address is required",
    }).max(100, { message: "Must be 10 or fewer characters long" }),
    age: z.number({
        required_error: "Age is required",
        invalid_type_error: "Age must be a number"
    })
});

export const companyDetails = z.object({
    body: z.object({
        name: z.string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string"
        }).max(10, { message: "Must be 10 or fewer characters long" }).min(8, { message: "Must be 8 or more characters long" }),
    address: z.string({
        required_error: "Address is required",
    }).max(100, { message: "Must be 10 or fewer characters long" })
})
})

export const updateCompanyDetail = z.object({
    body: z.object({
        name: z.string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string"
        }).max(20, { message: "Must be 20 or fewer characters long" }).min(8, { message: "Must be 8 or more characters long" }),
        id: z.number({
            required_error: "id is required",
        })

    }),
});

export const updateEmployeeDetail = z.object({
    body: z.object({
        name: z.string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string"
        }).max(50, { message: "Must be 50 or fewer characters long" }).min(8, { message: "Must be 8 or more characters long" }),
        id: z.number({
            required_error: "id is required",
        })

    }),
});