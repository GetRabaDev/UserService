const { axiosPOST } = require('../../utils/request');
const axios = require('axios');

class NotificationService {
  static sendSMS = async (payload) => {
    console.log(payload);
    const response = await axiosPOST(
      `${process.env.NOTIFICATION_BASE_URL}/api/v1/notification/sms`,
      payload,
      {
        Authorization: `Bearer ${process.env.SERVICE_TOKEN}`,
      }
    );
    return response;
  };
}

module.exports = {
  NotificationService,
};
