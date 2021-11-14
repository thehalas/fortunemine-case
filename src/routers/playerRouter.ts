import { Router } from 'express';
import PlayerController from '../controllers/playerController';

const router = Router();
const playerController = new PlayerController();

router.post('/add', playerController.save);
router.get('/:player_id/state', playerController.get);
router.post('/:player_id/levelup', playerController.levelUp);
router.post('/:player_id/collect/:reward_id', playerController.collectReward);

export default router;