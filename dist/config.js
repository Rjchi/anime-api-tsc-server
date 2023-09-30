"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BASE_URL_2 = exports.PORT = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.PORT = process.env.PORT;
exports.BASE_URL_2 = process.env.BASE_URL_2;
