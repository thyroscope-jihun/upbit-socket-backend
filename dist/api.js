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
exports.get5Average = exports.getMarkets = void 0;
const axios_1 = __importDefault(require("axios"));
const moment_1 = __importDefault(require("moment"));
const util_1 = require("./util");
const baseUrl = "https://api.upbit.com/v1";
const getMarkets = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.get(`${baseUrl}/market/all`, {
        headers: {
            Accept: "application/json",
        },
    });
    return data;
});
exports.getMarkets = getMarkets;
const get5Average = (market, marketKo) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.get(`${baseUrl}/candles/days?market=${market}&count=5`, {
        headers: {
            Accept: "application/json",
        },
    });
    return {
        market,
        marketKo,
        average: (0, util_1.getAverage)(data.map((d) => d.prev_closing_price)),
        envelopmin5: (0, util_1.getAverage)(data.map((d) => d.prev_closing_price)) * 0.95,
        envelopmin20: (0, util_1.getAverage)(data.map((d) => d.prev_closing_price)) * 0.8,
        envelopplus5: (0, util_1.getAverage)(data.map((d) => d.prev_closing_price)) * 1.05,
        catchTime: (0, moment_1.default)().add(-10, "minutes").format("YYYYMMDDHHmmss"),
    };
});
exports.get5Average = get5Average;
