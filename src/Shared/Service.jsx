import axios from 'axios';
import SendBird from 'sendbird';

// Get SendBird API configuration from .env file
const appId = import.meta.env.VITE_SENDBIRD_APP_ID;
const apiToken = import.meta.env.VITE_SENDBIRD_API_TOKEN;

// Initialize SendBird SDK
const sb = new SendBird({ appId });

// Create SendBird User
export const CreateSendBirdUser = async (userId, nickname, profileUrl) => {
  try {
    const response = await axios.post(`https://api-${appId}.sendbird.com/v3/users`, {
      user_id: userId,
      nickname: nickname,
      profile_url: profileUrl,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Api-Token': apiToken,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating SendBird user:', error.message);
    throw error;
  }
};

// Create SendBird Channel
export const CreateSendBirdChannel = async (users, title) => {
  try {
    const response = await axios.post(`https://api-${appId}.sendbird.com/v3/group_channels`, {
      user_ids: users,
      is_distinct: true,
      name: title,
      operator_ids: [users[0]], // Make the current user the operator
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Api-Token': apiToken,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating SendBird channel:', error.message);
    throw error;
  }
};

// Send Offer Message
export const SendOfferMessage = async (channelUrl, message) => {
  try {
    // Connect to SendBird using the SDK
    sb.connect(channelUrl, (user, error) => {
      if (error) {
        console.error('Error connecting to SendBird:', error);
        return;
      }

      // Once connected, send a message
      const params = new sb.UserMessageParams();
      params.message = message;

      sb.GroupChannel.getChannel(channelUrl, (channel, error) => {
        if (error) {
          console.error('Error getting channel:', error);
          return;
        }

        channel.sendUserMessage(params, (message, error) => {
          if (error) {
            console.error('Error sending offer message:', error);
            return;
          }
          console.log('Offer message sent:', message);
        });
      });
    });
  } catch (error) {
    console.error('Error sending offer message:', error.message);
    throw error;
  }
};
