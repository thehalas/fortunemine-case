import {Request, Response} from 'express';
import {Player} from "../models/player";
import {Reward} from "../models/reward";
import {LevelCompletionReward} from "../models/levelCompletionReward";

class PlayerController {

    public async save(req: Request, res: Response) {
        try {
            const player = await Player.create(req.body)
            const wallet = await player.createWallet()
            const data = {is_success: true, state: {player, wallet, rewards: []}}
            return res.json(data)
        } catch (error) {
            console.log(error)
            return res.status(400).json({is_success: false})
        }
    }

    public async get(req: Request, res: Response) {
        try {
            const player = await Player.findOne({where: {player_id: req.params.player_id}})
            if (player) {
                const [wallet, rewards] = await Promise.all([player.getWallet(), player.getRewards()])
                const data = {is_success: true, state: {player, wallet, rewards}}
                return res.json(data)
            } else {
                return res.status(404).json({is_success: false})
            }
        } catch (error) {
            console.log(`Error: ${error}`)
            return res.status(404).json({is_success: false})
        }
    }

    public async levelUp(req: Request, res: Response) {
        try {
            const player = await Player.findOne({where: {player_id: req.params.player_id}})
            if (player) {
                let wallet = await player.getWallet()
                const lvlReward = await LevelCompletionReward.findByPk(wallet.level)
                if (lvlReward) {
                    wallet = await wallet.increment({level: 1})
                    await player.createReward({coin: lvlReward.coin, energy: lvlReward.energy})
                    const rewards = await player.getRewards()
                    const data = {is_success: true, state: {player, wallet, rewards}}
                    return res.json(data)
                } else {
                    res.status(404).json({is_success: false})
                }
            } else {
                res.status(404).json({is_success: false})
            }
        } catch (error) {
            console.log(`Error: ${error}`)
            res.status(404).json({is_success: false})
        }
    }

    public async collectReward(req: Request, res: Response) {
        try {
            const [player, reward] = await Promise.all([
                Player.findOne({where: {player_id: req.params.player_id}}),
                Reward.findByPk(req.params.reward_id)
            ])
            if (player && reward && reward.player_id === player.id) {
                let wallet = await player.getWallet()
                wallet = await wallet.increment({coin: reward.coin, energy: reward.energy})
                await reward.destroy()
                const rewards = await player.getRewards()
                const data = {is_success: true, state: {player, wallet, rewards}}
                return res.json(data)
            } else {
                return res.status(404).json({is_success: false})
            }
        } catch (error) {
            console.log(`Error: ${error}`)
            return res.status(404).json({is_success: false})
        }
    }

}

export default PlayerController;