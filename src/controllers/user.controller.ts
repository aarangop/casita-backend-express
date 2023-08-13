import {Request, Response} from "express";
import User, {IUser} from "../models/user.model";
import expressAsyncHandler from "express-async-handler";
import winston from "winston";

const logger = winston.createLogger({
    level: "info",
    transports: [new winston.transports.Console()]
})

export const getAllUsers = expressAsyncHandler(async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server error"});
    }
});

export const createUser = expressAsyncHandler(async (req: Request, res: Response) => {
    try {
        const user = req.body as IUser;

        const newUser = new User(user);
        const result = await newUser.save();

        res.status(201).json({
            message: "User registered successfully",
            id: result.id.toString()
        })
    } catch (error) {
        logger.error("Error registering user");
        res.status(500).json({message: "Error registering user"});
    }
})