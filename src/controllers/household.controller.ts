import expressAsyncHandler from "express-async-handler";
import {Request, Response} from "express";
import HouseholdModel from "../models/household.model";
import winston, {createLogger} from "winston";

const logger = createLogger({
  level: "info",
  transports: [new winston.transports.Console()]
})

export const getAllHouseholds = expressAsyncHandler(async (req: Request, res: Response) => {
  try {
    const households = await HouseholdModel.find();
    res.status(200).json(households)
  } catch (error) {
    res.status(500).json({message: "Error retrieving households"})
  }
})

export const getHouseholdById = expressAsyncHandler(async (req: Request, res: Response) => {
  try {
    const household = await HouseholdModel.findOne({"_id": req.params.id})
    res.status(200).json(household);
  } catch (error) {
    res.status(500).json({message: `Error retrieving household with id ${req.params.id}`})
  }
})

export const saveNewHousehold = expressAsyncHandler(async (req: Request, res: Response) => {
  const householdData = req.body;
  const newHousehold = new HouseholdModel(householdData);
  try {
    await newHousehold.save();
    res.status(201).json(newHousehold.toObject());
  } catch (e) {
    logger.error(e);
    res.status(500).json(e)
  }
})

export const updateHousehold = expressAsyncHandler(async (req: Request, res: Response) => {
  const householdId = req.params.id;
  console.log(`Updating household id: ${householdId}`);
})