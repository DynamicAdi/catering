import { adminModel } from './mongo/schema.js';
import admin from './firebase.js'; // Firebase Admin SDK initialized

export const sendNotificationToAdmins = async (orderDetails) => {
  try {
    // Fetch all admins
    const admins = await adminModel.find({});

    // Collect all tokens into a flat array
    const tokens = admins.reduce((allTokens, admin) => {
      return allTokens.concat(admin.firebaseToken); // Flatten tokens into a single array
    }, []).filter(token => token); // Ensure no empty tokens
    console.log(tokens); //
    
    if (tokens.length > 0) {
      const message = {
        notification: {
          title: 'Hey! New order arrived!',
          body: `Order from ${orderDetails.name} with ${orderDetails.items.length} items.\nDate: ${orderDetails.date}\nFunction Type: ${orderDetails.functionType}\nAddress: ${orderDetails.address}\nPhone: ${orderDetails.phone}\nEmail: ${orderDetails.email}`,
        }
      };

      // Loop through each token and send the notification
      const sendNotifications = tokens.map(token => {
        return admin.messaging().send({ ...message, token });
      });

      // Wait for all notifications to be sent
      const responses = await Promise.all(sendNotifications);

      console.log('Successfully sent notifications:', responses.length);
    } else {
      console.log('No tokens available to send notifications.');
    }
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};
