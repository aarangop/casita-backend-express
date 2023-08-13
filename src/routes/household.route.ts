import {Router} from "express";
import {getAllHouseholds, getHouseholdById} from "../controllers/household.controller";

const router = Router()

router.get("/", getAllHouseholds);
router.get("/:id", getHouseholdById)
// router.post("/new_household", createHousehold);

export default router
