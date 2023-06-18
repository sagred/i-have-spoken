import axios from 'axios';
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  

export default async function handler(req, res) {
  const { text, actor, voice_id } = req.body;
//YcxoHAHbwyYtOgZkDFya - Elon
  //fE5q6eHg0oQ7PyXTVJ1d - SRK
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: text,
    temperature: 0.5,
    max_tokens: 60,
    top_p: 1.0,
    frequency_penalty: 0.5,
    presence_penalty: 0.0,
  });


  const responseText = response.data.choices[0].text
  const altertedRestext = responseText.replace(/\n/g, '');

  const headers = {
    'xi-api-key': process.env.API_KEY,
  };

  const data = {
    text: altertedRestext,
    voice_settings: {
      stability: 0,
      similarity_boost: 0,
    },
  };

  try {
    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${voice_id}`,
      data,
      { headers, responseType: 'arraybuffer' }
    );

    res.setHeader('Content-Type', 'audio/mpeg');
    res.status(200).send(response.data);
  } catch (error) {
    const { detail } = error.response.data;
    res.status(422).json({ detail });
  }
}
