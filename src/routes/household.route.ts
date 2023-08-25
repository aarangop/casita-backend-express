import {Router} from "express";
import {saveNewHousehold, updateHousehold} from "../controllers/household.controller";

const router = Router()

// router.get("/", getAllHouseholds);
// router.get("/:id", getHouseholdById);
router.post("/", saveNewHousehold);
router.put("/:id", updateHousehold);
export default router
