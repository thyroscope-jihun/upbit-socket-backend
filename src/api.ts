import axios from "axios";
import moment from "moment";
import { getAverage } from "./util";
const baseUrl = "https://api.upbit.com/v1";

export const getMarkets = async (): Promise<
  {
    market: string;
    korean_name: string;
    english_name: string;
  }[]
> => {
  const { data } = await axios.get(`${baseUrl}/market/all`, {
    headers: {
      Accept: "application/json",
    },
  });
  return data;
};

export const get5Average = async (market: string, marketKo: string) => {
  const { data } = await axios.get(
    `${baseUrl}/candles/days?market=${market}&count=5`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  return {
    market,
    marketKo,
    average: getAverage(data.map((d: any) => d.prev_closing_price)),
    envelopmin5: getAverage(data.map((d: any) => d.prev_closing_price)) * 0.95,
    envelopmin20: getAverage(data.map((d: any) => d.prev_closing_price)) * 0.8,
    envelopplus5: getAverage(data.map((d: any) => d.prev_closing_price)) * 1.05,
    catchTime: moment().add(-10, "minutes").format("YYYYMMDDHHmmss"),
  };
};
