import cors from "cors";
import express from "express";
import { PORT } from "./config";
import { join } from "path";

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
    this.stitics();
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

  stitics() {
    this.app.use(express.static(join(__dirname, "../client/dist")));
  }
}

export default Server;