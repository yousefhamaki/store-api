import config from "../config";
import mailOptions from "../types/MailOption.type";
import transporter from "./Gmail";

const mail = (options: mailOptions) => {
  options.from = config.EmailGmail;
  const result = {
    status: "waiting",
    data: {},
  };
  transporter.sendMail(options, function (error, info) {
    if (error) {
      result.status = "failed";
      result.data = error;
    } else {
      result.status = "success";
      result.data = info;
    }
  });

  return result;
};

export default mail;
