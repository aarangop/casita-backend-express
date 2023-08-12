import {NextFunction, Request, Response, Router} from "express";
import User from '../models/User'

const router = Router()

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find().populate('users');
        res.json(users)
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server error"});
    }
});

export default router