import {Model, DataTypes} from 'sequelize';
import {sequelize} from '../dbconfig/db';

export class LevelCompletionReward extends Model {
    public level!: number;
    public coin!: number;
    public energy!: number;
}

LevelCompletionReward.init(
    {
        level: {type: DataTypes.INTEGER.UNSIGNED, primaryKey: true},
        coin: {type: DataTypes.INTEGER, defaultValue: 0},
        energy: {type: DataTypes.INTEGER, defaultValue: 0},
    },
    {
        sequelize,
        tableName: 'level_completion_rewards',
        timestamps: false,
    },
);
