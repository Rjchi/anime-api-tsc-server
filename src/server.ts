import cors from "cors";
import express from "express";
import { PORT } from "./config";

/**---------
 * | Routes
 * ---------*/
import animeRoutes from "./routes/anime.routes";

class Server {
  private app: express.Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = PORT || "3001";
    this.listen();
    this.middlewares();
    this.routes();
  }

  listen() {
    this.app.listen(this.port, () =>
      console.log(`SERVER ON PORT ${this.port}`)
    );
  }

  routes() {
    this.app.use(animeRoutes);
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors())
  }
}

export default Server;