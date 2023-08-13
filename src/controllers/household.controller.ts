import expressAsyncHandler from "express-async-handler";
import {NextFunction, Request, Response} from "express";
import Household from "../models/Household";

export const getAllHouseholds = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const households = await Household.find();
        res.status(200).json(households)
    } catch (error) {
        res.status(500).json({message: "Error retrieving households"})
    }
})

export const getHouseholdById = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const household = await Household.findOne({"_id": req.params.id})
        res.status(200).json(Household);
    } catch (error) {
        res.status(500).json({message: `Error retrieving household with id ${req.params.id}`})
    }
})