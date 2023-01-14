const { axiosPOST } = require('../../utils/request');

class NotificationService {
  static sendSMS = async (payload) => {
    const response = await axiosPOST(
      `${process.env.NOTIFICATION_BASE_URL}/api/v1/notification/sms`,
      payload,
      {
        'Content-Type': ['application/json', 'application/json'],
        Authorization: `Bearer ${process.env.SERVICE_TOKEN}`,
      }
    );
    return response;
  };
}

module.exports = {
  NotificationService,
};
