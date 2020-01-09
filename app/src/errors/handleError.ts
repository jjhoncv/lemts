import { Request, Response, NextFunction } from 'express'
// export class httpError {

// }

// export class httpForbidden extends httpError {
//     public code: number;
//     public message: string;
//     public stack: any;

//     constructor(message: string, stack = null) {
//         super();
//         this.code = 403;
//         this.message = message;
//         this.stack = stack;
//     }
// }

// interface IError {
//     code: number;
//     message: string;
// }

// export const handleError = async (err: IError, req: Request, res: Response, next: NextFunction) => {
//     const { code, message } = err;
//     res.status(code).json({
//         status: "error",
//         code,
//         message
//     });
// }





export class ErrorHandler extends Error {
    public statusCode: number;
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

interface IError {
    statusCode: number;
    message: string;
}

export const handleError = (err: IError, res: Response) => {
    const { statusCode, message } = err;
    res.status(statusCode).json({
        status: "error",
        statusCode,
        message
    });
}