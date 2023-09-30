"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const anime_controllers_1 = __importDefault(require("../controllers/anime.controllers"));
const router = express_1.default.Router();
router
    .get("/api/animes/:page", anime_controllers_1.default.getAnimes)
    .get("/api/see/:anime/:episode", anime_controllers_1.default.seeAnime)
    .get("/api/details/:anime", anime_controllers_1.default.animeDetails);
exports.default = router;
