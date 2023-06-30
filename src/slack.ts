import axios from "axios";

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
      fiveAverage:
        "https://hooks.slack.com/services/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",
    };
  }
  //private function
  private static async sendmessage(message: any, channel: string) {
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
      await axios.request(options);
    } catch (err) {
      //   console.log(err);
      return;
    }
  }

  static async sendPrice() {
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
    await this.sendmessage(payload, this.Channels.fiveAverage);
  }

  static async sendStart() {
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
    await this.sendmessage(payload, this.Channels.fiveAverage);
  }

  static async sendEnvelop(
    market: string,
    envelop: number,
    color: keyof typeof Slack.Colors
  ) {
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
    await this.sendmessage(payload, this.Channels.fiveAverage);
  }
}

export default Slack;
