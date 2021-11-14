import {Model, DataTypes} from 'sequelize';
import {sequelize} from '../dbconfig/db';

export class Wallet extends Model {
    public id!: number;
    public level!: number;
    public coin!: number;
    public energy!: number;
    // foreign key references Player
    public player_id!: number;

    toJSON(): object {
        // hide player_id, wallet id
        return {...this.get(), player_id: undefined, id: undefined}
    }
}

Wallet.init(
    {
        id: {type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true},
        level: {type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 1},
        coin: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
        energy: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
    },
    {
        sequelize,
        tableName: 'wallets',
        timestamps: false,
    },
);