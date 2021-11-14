import {Model, DataTypes} from 'sequelize';
import {sequelize} from '../dbconfig/db';

export class Reward extends Model {
    public id!: string;
    public coin!: number;
    public energy!: number;
    // foreign key references Player
    public player_id!: number;

    toJSON(): object {
        const reward = this.get()
        // expose id as reward_id. hide player_id. expose coin and energy encapsulated in reward object
        return {reward_id: reward.id, reward: {...reward, id: undefined, player_id: undefined}}
    }
}

Reward.init(
    {
        id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
        coin: {type: DataTypes.INTEGER, defaultValue: 0},
        energy: {type: DataTypes.INTEGER, defaultValue: 0},
    },
    {
        sequelize,
        tableName: 'rewards',
        timestamps: false,
    },
);
