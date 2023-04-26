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
exports.getAverage = exports.comparePrice = exports.requestCoinCandles = void 0;
const api_1 = require("./api");
const slack_1 = __importDefault(require("./slack"));
const moment_1 = __importDefault(require("moment"));
const requestCoinCandles = (markets) => __awaiter(void 0, void 0, void 0, function* () {
    const result = [];
    for (let i = 0; i < markets.length; i += 10) {
        const slicedMarkets = markets.slice(i, i + 10);
        const requests = slicedMarkets.map((market) => (0, api_1.get5Average)(market.market, market.marketKo));
        const response = yield Promise.all(requests);
        result.push(response);
        yield new Promise((resolve) => setTimeout(resolve, 1000));
    }
    return result.flatMap((d) => d);
});
exports.requestCoinCandles = requestCoinCandles;
const comparePrice = (price, item) => __awaiter(void 0, void 0, void 0, function* () {
    if ((0, moment_1.default)().diff((0, moment_1.default)(item.catchTime, "YYYYMMDDHHmmss"), "minutes") < 10) {
        return false;
    }
    else if (price > item.envelopplus5) {
        yield slack_1.default.sendEnvelop(item.marketKo, 5, "success");
        return true;
    }
    else if (price < item.envelopmin20) {
        yield slack_1.default.sendEnvelop(item.marketKo, -20, "danger");
        return true;
    }
    else if (price < item.envelopmin5) {
        yield slack_1.default.sendEnvelop(item.marketKo, -5, "warning");
        return true;
    }
    else {
        return false;
    }
});
exports.comparePrice = comparePrice;
const getAverage = (data) => {
    const sum = data.reduce((acc, price) => acc + price, 0);
    return sum / data.length;
};
exports.getAverage = getAverage;
