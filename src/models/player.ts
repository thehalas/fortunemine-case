import {
    Sequelize,
    Model,
    DataTypes,
    HasOneGetAssociationMixin,
    HasOneCreateAssociationMixin,
    HasManyGetAssociationsMixin,
    HasManyHasAssociationsMixin,
    HasManyCreateAssociationMixin,
    Association,
} from "sequelize";
import {sequelize} from "../dbconfig/db";
import {Wallet} from "./wallet";
import {Reward} from "./reward";

export class Player extends Model {
    public id!: number; // internal id. not exposed
    public player_id!: string; // will be exposed externally. think of this as a username
    public fullname!: string;
    public email!: string;

    // TS cannot determine model association at compile time we have to declare them here purely virtually
    public getWallet!: HasOneGetAssociationMixin<Wallet>;
    public createWallet!: HasOneCreateAssociationMixin<Wallet>;
    public getRewards!: HasManyGetAssociationsMixin<Reward>;
    public hasRewards!: HasManyHasAssociationsMixin<Reward, number>;
    public createReward!: HasManyCreateAssociationMixin<Reward>;

    // possible inclusions
    public readonly wallet?: Wallet;
    public readonly rewards?: Reward[];


    public static associations: {
        wallet: Association<Player, Wallet>,
        rewards: Association<Player, Reward>,
    };

    toJSON(): object {
        const player = this.get()
        // hide email and internal id
        return {...player, id: undefined, email: undefined}
    }
}

Player.init(
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        player_id: {
            type: DataTypes.STRING, unique: true, allowNull: false,
            validate: {len: [3, 30]}
        },
        fullname: {
            type: DataTypes.STRING, allowNull: false,
            validate: {notEmpty: true}
        },
        email: {
            type: DataTypes.STRING, allowNull: false, unique: true,
            validate: {isEmail: true}
        },
    },
    {
        sequelize,
        tableName: 'players',
        timestamps: false, // we do not need the timestamp for this case
    },
);

Player.hasOne(Wallet, {foreignKey: "player_id", as: "wallet"})
Player.hasMany(Reward, {foreignKey: "player_id", as: "rewards"})
