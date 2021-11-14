import {Sequelize} from 'sequelize';

const dbUrl: string = process.env.DB_URL || 'postgres://user:password@localhost:5432/case-db';
// TODO(get db url from a config file, instead of using hardcoded url)
export const sequelize: Sequelize = new Sequelize(dbUrl, {benchmark: true, logging: console.log});

sequelize.sync()
    .then(() => {
        console.log('Synced to DB');
    })
    .catch(err => {
        console.error('Failed to sync to the DB:', err);
    });

