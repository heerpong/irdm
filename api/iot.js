const axios = require('axios');

const PROXY_BOT_TOKEN = '8080658025:AAFO6bBloTjHcXc6pIOHooP8stHYdsv9xcA'; //FaceVariety Staffpush // ใส่ Bot Token ของ Proxy Bot
const CHANNEL_CHAT_ID = -1002262254691'; //FaceVariety Staffpush // หรือ Chat ID ของ Channel Telegram

async function sendMessageToChannel(message) {
  const url = `https://api.telegram.org/bot${PROXY_BOT_TOKEN}/sendMessage`;
  try {
    const response = await axios.post(url, {
      chat_id: CHANNEL_CHAT_ID,
      text: message,
    });
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw new Error('Failed to send message');
  }
}

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const data = req.body;
    if (data.message) {
      try {
        await sendMessageToChannel(data.message);
        res.status(200).json({ status: 'ok' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    } else {
      res.status(400).json({ error: 'Invalid data' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
