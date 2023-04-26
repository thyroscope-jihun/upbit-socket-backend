import { get5Average } from "./api";
import Slack from "./slack";
import moment from "moment";
import { MarketInfo } from "./types";

export const requestCoinCandles = async (
  markets: { market: string; marketKo: string }[]
): Promise<any[]> => {
  const result: any[] = [];
  for (let i = 0; i < markets.length; i += 10) {
    const slicedMarkets = markets.slice(i, i + 10);
    const requests = slicedMarkets.map((market) =>
      get5Average(market.market, market.marketKo)
    );
    const response = await Promise.all(requests);
    result.push(response);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  return result.flatMap((d) => d);
};

export const comparePrice = async (price: number, item: MarketInfo) => {
  if (moment().diff(moment(item.catchTime, "YYYYMMDDHHmmss"), "minutes") < 10) {
    return false;
  } else if (price > item.envelopplus5) {
    await Slack.sendEnvelop(item.marketKo, 5, "success");
    return true;
  } else if (price < item.envelopmin20) {
    await Slack.sendEnvelop(item.marketKo, -20, "danger");
    return true;
  } else if (price < item.envelopmin5) {
    await Slack.sendEnvelop(item.marketKo, -5, "warning");
    return true;
  } else {
    return false;
  }
};

export const getAverage = (data: number[]) => {
  const sum = data.reduce((acc, price) => acc + price, 0);
  return sum / data.length;
};
