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
const ws_1 = __importDefault(require("ws"));
const api_1 = require("./api");
const moment_1 = __importDefault(require("moment"));
const util_1 = require("./util");
const node_schedule_1 = __importDefault(require("node-schedule"));
const slack_1 = __importDefault(require("./slack"));
var plus5EnvelopList = [];
var plus20EnvelopList = [];
var minus5EnvelopList = [];
var minus20EnvelopList = [];
const startSocket = () => {
    const socket = new ws_1.default("wss://api.upbit.com/websocket/v1");
    var mappedMarket = {};
    var prevTimes = {};
    socket.onopen = () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("socket open");
        mappedMarket = {};
        prevTimes = {};
        const data = yield (0, api_1.getMarkets)();
        const filteredData = data.filter((r) => r.market.includes("KRW"));
        const message = [
            {
                ticket: "UNIQUE_TICKET",
            },
            {
                type: "ticker",
                codes: filteredData.map((m) => m.market), // 원하는 마켓 코드들
            },
        ];
        const res = yield (0, util_1.requestCoinCandles)(filteredData.map((m) => {
            return {
                market: m.market,
                marketKo: m.korean_name,
            };
        }));
        mappedMarket = res.reduce((acc, cur) => {
            acc[cur.market] = cur;
            return acc;
        }, {});
        socket.send(JSON.stringify(message));
    });
    socket.onmessage = (event) => __awaiter(void 0, void 0, void 0, function* () {
        const message = JSON.parse(event.data.toString());
        if (message["type"] === "ticker") {
            const { code, trade_price, timestamp } = message;
            if (prevTimes[code]) {
                const timeDiffSeconds = (0, moment_1.default)(timestamp).diff(prevTimes[code], "seconds");
                if (timeDiffSeconds < 2) {
                    // 이전 데이터와 현재 데이터의 시간 차이가 2초 미만이므로 로직을 실행하지 않음
                    return;
                }
            }
            prevTimes[code] = timestamp;
            const marketInfo = mappedMarket[code];
            const res = yield (0, util_1.comparePrice)(trade_price, marketInfo);
            if (res) {
                mappedMarket[code] = Object.assign(Object.assign({}, mappedMarket[code]), { catchTime: (0, moment_1.default)().format("YYYYMMDDHHmmss") });
                console.log("tt", marketInfo.market, marketInfo.catchTime);
            }
        }
    });
    socket.onclose = (event) => {
        console.log(`websocket closed: ${event.code} ${event.reason}`);
    };
    socket.onerror = (event) => {
        console.error(`websocket error: ${event.message}`);
    };
};
const j = node_schedule_1.default.scheduleJob("0 9 * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("start socket");
    yield slack_1.default.sendPrice();
    startSocket();
}));
startSocket();
// const j = schedule.scheduleJob("0 25 15 * * *", async () => {
//   console.log("start socket");
//   startSocket();
// });
