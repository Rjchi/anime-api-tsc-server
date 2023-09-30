"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const slug_1 = __importDefault(require("slug"));
const cheerio_1 = require("cheerio");
const config_js_1 = require("../config.js");
/**-----------------------------------------------
 * |  Aqui obtenemos los animes por pagina
 -----------------------------------------------*/
const getAnimes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = req.params.page ? req.params.page : "1";
        const { data } = yield axios_1.default.get(`${config_js_1.BASE_URL_2}anime?page=${page}&status=&type=&order`);
        const $ = (0, cheerio_1.load)(data);
        let animes = [];
        $("div.listupd article.bs").each((i, el) => {
            const name = $(el).find("div > a > div.tt > h2").text();
            const sanitizedName = name
                .replace(/\//g, "-")
                .replace(/×/g, "x")
                .replace(/\./g, "-");
            animes.push({
                name: sanitizedName,
                img: $(el).find("div > a > div.limit img").attr("src")
                    ? $(el).find("div > a > div.limit img").attr("src")
                    : "https://freerangestock.com/sample/120162/sun-over-mountains-vector-graphic.jpg",
                dubbing: $(el).find("div > a > div.limit > div.bt > span.sb").text(),
            });
        });
        if (animes.length > 0) {
            return res.status(200).json(animes);
        }
        else {
            return res.status(404).json({ message: `No se encontraror animes.` });
        }
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }
});
/**-----------------------------------------------
 * |  Aqui obtenemos los enlaces de reproducción
 -----------------------------------------------*/
const seeAnime = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const anime = (0, slug_1.default)(req.params.anime, "-");
        const episode = req.params.episode ? req.params.episode.trim() : "1";
        const { data } = yield axios_1.default.get(`${config_js_1.BASE_URL_2}${anime === "go-toubun-no-hanayome" ? "go-toubun-no-hanayome∽" : anime}-episodio-${episode}-sub-espanol`);
        const $ = (0, cheerio_1.load)(data);
        let links = [];
        $("div.mobius select option").each((i, el) => {
            const htmlString = Buffer.from($(el).attr("value") || "", "base64").toString("utf-8");
            const match = htmlString.match(/src="([^"]+)"/);
            const url = match ? match[1] : null;
            if (url) {
                links.push({ link: url });
            }
        });
        if (links.length > 0) {
            return res.status(200).json(links);
        }
        else {
            return res.status(404).json({ message: `No se encontraron enlaces.` });
        }
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }
});
/**-----------------------------------------------
 * |  Aqui obtenemos los detalles de un anime
 -----------------------------------------------*/
const animeDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const anime = (0, slug_1.default)(req.params.anime, "-");
        const { data } = yield axios_1.default.get(`${config_js_1.BASE_URL_2}anime/${anime}`);
        const $ = (0, cheerio_1.load)(data);
        let details = [];
        $("div.infox").each((i, el) => {
            const genres = [];
            const information = [];
            const episodes = [];
            $(el)
                .find("div.ninfo > div.info-content > div.genxed > a")
                .each((item, genre) => {
                genres.push($(genre).text());
            });
            $(el)
                .find("div.ninfo > div.info-content > div.spe > span")
                .each((items, info) => {
                information.push($(info).text());
            });
            details.push({
                name: $(el).find("h1").text(),
                image: "",
                genres: genres,
                information: information,
                description: $(el)
                    .find("div.ninfo > div.info-content > div.entry-content > p")
                    .first()
                    .text(),
                episodes: episodes,
            });
        });
        $("div div.num")
            .find("li > a > div.epl-num")
            .each((item, element) => {
            details[0].episodes.push($(element).text());
        });
        details[0].image = $("div.bigcontent div.thumbook")
            .find("div > img")
            .attr("src")
            ? $("div.bigcontent div.thumbook").find("div > img").attr("src")
            : "https://freerangestock.com/sample/120162/sun-over-mountains-vector-graphic.jpg";
        if (details.length !== 0) {
            return res.status(200).json(details);
        }
        else {
            return res.status(404).json({ message: `No hay detalles para ${anime}` });
        }
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }
});
const controllers = {
    getAnimes,
    seeAnime,
    animeDetails,
};
exports.default = controllers;
