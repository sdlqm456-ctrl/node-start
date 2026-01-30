require("dotenv").config({ path: "../.env" });
const cron = require("node-cron");
const transport = require("./nodemailer");

const cron_job = cron.schedule(
  "* * * 1 * *",
  () => {
    transport.sendMail(
      {
        from: process.env.FROM,
        to: "sdlqm456@naver.com",
        subject: "Cron 연습",
        text: "매일발송연습입니다",
      },
      (err) => {
        if (err) {
          console.log("발송실패");
        } else {
          console.log("발송성공");
        }
      },
    );
    console.log("매일발송 시작");
  },
  {
    scheduled: false,
  },
);
// cron_job.start();
module.exports = cron_job;
