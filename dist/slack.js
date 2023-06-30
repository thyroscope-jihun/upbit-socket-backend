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
class Slack {
    static get Colors() {
        return {
            primary: "#007bff",
            info: "#027afa",
            success: "#28a745",
            warning: "#ffc107",
            danger: "#dc3545",
        };
    }
    static get Channels() {
        return {
            fiveAverage: "https://hooks.slack.com/services/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",
        };
    }
    //private function
    static sendmessage(message, channel) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!message) {
                console.error("메시지 포멧이 없습니다.");
                return;
            }
            const options = {
                method: "POST",
                baseURL: channel,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                },
                data: JSON.stringify(message),
            };
            try {
                yield axios_1.default.request(options);
            }
            catch (err) {
                //   console.log(err);
                return;
            }
        });
    }
    static sendPrice() {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = {
                text: "서버 재시작",
                attachments: [
                    {
                        color: this.Colors.success,
                        blocks: [
                            {
                                type: "section",
                                fields: [
                                    {
                                        type: "mrkdwn",
                                        text: `서버가 실행되었습니다.`,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            };
            yield this.sendmessage(payload, this.Channels.fiveAverage);
        });
    }
    static sendStart() {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = {
                text: "서버 ON",
                attachments: [
                    {
                        color: this.Colors.success,
                        blocks: [
                            {
                                type: "section",
                                fields: [
                                    {
                                        type: "mrkdwn",
                                        text: `서버가 실행되었습니다.`,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            };
            yield this.sendmessage(payload, this.Channels.fiveAverage);
        });
    }
    static sendEnvelop(market, envelop, color) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = {
                text: `*${market}* *엔벨롭:* ${envelop}`,
                //   attachments: [
                //     {
                //       color: Slack.Colors[color],
                //       blocks: [
                //         {
                //           type: "section",
                //           fields: [
                //             {
                //               type: "mrkdwn",
                //               text: `*${market}* *엔벨롭:* ${envelop}`,
                //             },
                //           ],
                //         },
                //       ],
                //     },
                //   ],
            };
            yield this.sendmessage(payload, this.Channels.fiveAverage);
        });
    }
}
exports.default = Slack;
