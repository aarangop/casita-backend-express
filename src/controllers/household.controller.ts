import expressAsyncHandler from "express-async-handler";
import {NextFunction, Request, Response} from "express";
import HouseholdModel from "../models/household.model";

export const getAllHouseholds = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const households = await HouseholdModel.find();
        res.status(200).json(households)
    } catch (error) {
        res.status(500).json({message: "Error retrieving households"})
    }
})

export const getHouseholdById = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const household = await HouseholdModel.findOne({"_id": req.params.id})
        res.status(200).json(HouseholdModel);
    } catch (error) {
        res.status(500).json({message: `Error retrieving household with id ${req.params.id}`})
    }
})