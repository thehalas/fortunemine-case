import express, {Express} from 'express';
import bodyParser from 'body-parser';
import playerRouter from "./routers/playerRouter";
import levelCompletionRewardRouter from "./routers/levelCompletionRewardRouter";

class Server {
    private app: Express;

    constructor() {
        this.app = express();
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json());
        this.routerConfig();
    }

    private routerConfig() {
        this.app.use('/players', playerRouter);
        this.app.use('/level_rewards', levelCompletionRewardRouter);
    }

    public start = (port: number) => {
        return new Promise((resolve, reject) => {
            this.app.listen(port, () => {resolve(port);})
                .on('error', (err: Object) => reject(err));
        });
    }
}

export default Server;