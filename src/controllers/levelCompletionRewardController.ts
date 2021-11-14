import {Request, Response} from 'express';
import {LevelCompletionReward} from "../models/levelCompletionReward";

class LevelCompletionRewardController {
    public async bulkCreate(req: Request, res: Response) {
        try {
            const bulk = await LevelCompletionReward.bulkCreate(req.body)
            return res.json(bulk)
        } catch (error) {
            console.log(error)
            return res.status(400).json({is_success: false})
        }
    }
}

export default LevelCompletionRewardController;