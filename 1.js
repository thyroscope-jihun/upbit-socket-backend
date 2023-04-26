const moment = require("moment");

const data = [
  {
    market: "USDT-DOGE",
    average: 0.088905276,
    envelopmin5: 0.0844600122,
    envelopmin20: 0.07112422080000001,
    envelopplus5: 0.09335053980000001,
    curTime: moment().format("YYYYMMDDHHmmss"),
  },
  {
    market: "USDT-ZRX",
    average: 0.288177882,
    envelopmin5: 0.2737689879,
    envelopmin20: 0.2305423056,
    envelopplus5: 0.3025867761,
    curTime: moment().format("YYYYMMDDHHmmss"),
  },
];

const obj = data.reduce((acc, cur) => {
  acc[cur.market] = cur;
  return acc;
}, {});

obj["USDT-DOGE"].curTime = "3";

console.log(obj);
