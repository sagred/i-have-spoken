import axios from 'axios';
const { Configuration, OpenAIApi } = require("openai");
import { createClient } from "@supabase/supabase-js";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
const openai = new OpenAIApi(configuration);
  



const supabaseUrl = "https://gtrvjdtwdfnbjeytdjvv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0cnZqZHR3ZGZuYmpleXRkanZ2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MjA0NTU4MSwiZXhwIjoxOTk3NjIxNTgxfQ.ngROr05aRAXWDnPvI3xpvxfBjzLvb36_8TBv6Ouwb2c";
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  const { text, actor, voice_id, user_id } = req.body;
//YcxoHAHbwyYtOgZkDFya - Elon
  //fE5q6eHg0oQ7PyXTVJ1d - SRK
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: text + "Write a reply in less than 300 characters",
    temperature: 0.5,
    max_tokens: 60,
    top_p: 1.0,
    frequency_penalty: 0.5,
    presence_penalty: 0.0,
  });


  const responseText = response.data.choices[0].text
  const altertedRestext = responseText.replace(/\n/g, '');

  const {error} =  await supabase
  .from('chat')
  .insert({ user_id: user_id, user_message: text, ai_message: responseText })

  console.log(error)

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
