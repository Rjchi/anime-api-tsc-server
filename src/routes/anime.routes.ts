import express from "express";
import controller from "../controllers/anime.controllers";

const router = express.Router();

router
  .get("/api/animes/:page", controller.getAnimes)
  .get("/api/see/:anime/:episode", controller.seeAnime)
  .get("/api/details/:anime", controller.animeDetails);

export default router;
