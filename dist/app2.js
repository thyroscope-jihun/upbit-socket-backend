"use strict";
// import WebSocket from "ws";
// import { getMarkets, get5Average } from "./api";
// import axios from "axios";
// import { MarketInfoList } from "./types";
// import moment from "moment";
// import { comparePrice, requestCoinCandles } from "./util";
// import schedule from "node-schedule";
// import Slack from "./slack";
// interface PrevTime {
//   [key: string]: moment.Moment | undefined;
// }
// const startSocket = () => {
//   const socket = new WebSocket("wss://api.upbit.com/websocket/v1");
//   var mappedMarket: any = {};
//   var prevTimes: PrevTime = {};
//   socket.onopen = async () => {
//     mappedMarket = {};
//     prevTimes = {};
//     const data = await getMarkets();
//     const message = [
//       {
//         ticket: "UNIQUE_TICKET",
//       },
//       {
//         type: "ticker",
//         codes: data.map((m) => m.market), // 원하는 마켓 코드들
//       },
//     ];
//     const res = await requestCoinCandles(data.map((m) => m.market));
//     mappedMarket = res.reduce((acc, cur) => {
//       acc[cur.market] = cur;
//       return acc;
//     }, {});
//     socket.send(JSON.stringify(message));
//     //   console.log("dd", mappedMarket);
//   };
//   socket.onmessage = async (event: WebSocket.MessageEvent) => {
//     const message = JSON.parse(event.data.toString());
//     if (message["type"] === "ticker") {
//       const { code, trade_price, timestamp, price } = message;
//       if (prevTimes[code]) {
//         const timeDiffSeconds = moment(timestamp).diff(
//           prevTimes[code]!,
//           "seconds"
//         );
//         if (timeDiffSeconds < 2) {
//           // 이전 데이터와 현재 데이터의 시간 차이가 2초 미만이므로 로직을 실행하지 않음
//           return;
//         }
//       }
//       prevTimes[code] = timestamp;
//       const marketInfo = mappedMarket[code];
//       const res = await comparePrice(price, marketInfo);
//       if (res) {
//         mappedMarket[code] = {
//           ...mappedMarket[code],
//           catchTime: moment().format("YYYYMMDDHHmmss"),
//         };
//         console.log("tt", marketInfo.market, marketInfo.catchTime);
//       }
//     }
//   };
//   socket.onclose = (event: WebSocket.CloseEvent) => {
//     console.log(`websocket closed: ${event.code} ${event.reason}`);
//   };
//   socket.onerror = (event: WebSocket.ErrorEvent) => {
//     console.error(`websocket error: ${event.message}`);
//   };
// };
// const j = schedule.scheduleJob("0 9 * * *", async () => {
//   console.log("start socket");
//   await Slack.sendPrice();
//   startSocket();
// });
// // const j = schedule.scheduleJob("0 25 15 * * *", async () => {
// //   console.log("start socket");
// //   startSocket();
// // });
