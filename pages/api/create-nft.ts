import { createClient } from '@supabase/supabase-js';

import axios from 'axios';
import FormData from 'form-data';
const supabaseUrl = "https://gtrvjdtwdfnbjeytdjvv.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0cnZqZHR3ZGZuYmpleXRkanZ2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MjA0NTU4MSwiZXhwIjoxOTk3NjIxNTgxfQ.ngROr05aRAXWDnPvI3xpvxfBjzLvb36_8TBv6Ouwb2c";
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
    
  
    try{

      const { imageURL, name, username, description, voiceURL, prompt, fee, wallet } = req.body;
 
      console.log(imageURL, name, username, description, voiceURL, prompt, fee, wallet)

      const { data: insertedData, error } = await supabase.from("agents").insert({name, username, description, audio_id: voiceURL, prompt, fee, wallet, image_url: imageURL});

  
  
  

      res.status(200).send(insertedData);
    } catch (error) {
      console.log(error)
      const { detail } = error.response.data;
      res.status(422).json({ detail });
    }
  }

