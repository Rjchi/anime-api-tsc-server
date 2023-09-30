"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
/**---------
 * | Routes
 * ---------*/
const anime_routes_1 = __importDefault(require("./routes/anime.routes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = config_1.PORT || "3001";
        this.listen();
        this.middlewares();
        this.routes();
        // this.stitics();
    }
    listen() {
        this.app.listen(this.port, () => console.log(`SERVER ON PORT ${this.port}`));
    }
    routes() {
        this.app.get("/", (req, res) => {
            res.send("API");
        });
        this.app.use(anime_routes_1.default);
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
}
exports.default = Server;
