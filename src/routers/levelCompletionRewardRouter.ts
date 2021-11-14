import {Router} from 'express';
import LevelCompletionRewardController from "../controllers/levelCompletionRewardController";

const router = Router();
const controller = new LevelCompletionRewardController();

router.post('/bulk_add', controller.bulkCreate);

export default router;