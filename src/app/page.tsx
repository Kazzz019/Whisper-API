"use client"
import { ChangeEvent, useState, useEffect } from 'react';
import { Textarea } from "@material-tailwind/react";

export default function Home() {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [convertedText, setConvertedText] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const NumberOfChunks = (fileSize: number): number => {
    const sizePerChunk = 25 * 1024 * 1024; // 25MB
    return Math.ceil(fileSize / sizePerChunk);
  };
  

  const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      console.log("Selected file:", file);
      const data = new FormData();
      data.append("file", file);
      data.append("model", "whisper-1");
      
      setFormData(data);

      // check if the size is less than 25MB
      if (file.size > 25 * 1024 * 1024) {
        alert("Please upload an audio file less than 25MB");
        return;
      }
    }
  };

      const sendAudio = async () => {
          if (!formData) return;
          setLoading(true);

          console.log("Sending audio data to OpenAI...");
          const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
            },
            method: "POST",
            body: formData,
          });
      
          const data = await res.json();
          console.log("Received response from OpenAI:", data);
          
          setLoading(false);
      
          setConvertedText(data.text);}

  return (
            <section className="w-full vh-100 pt-10 pb-10 bg-black">
              <div className="container px-4 md:px-6">
                <div className="grid gap-6 items-center">
                  <div className="flex flex-col justify-center space-y-4 text-center">
                    <div className="space-y-2">
                      <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                        Convert audio file to text
                      </h1>
                      <p className=" text-zinc-200 md:text-2xl dark:text-zinc-100 mx-auto">
                        Put the audio file less than 25mb.
                      </p>
                    </div>
                    <div className="w-full max-w-sm space-y-2 mx-auto">
                      <div className="flex space-x-2" >
                        <input
                          className="max-w-lg flex-1 bg-gray-800 text-white border-gray-900"
                          placeholder="Enter your audio file"
                          type="file"  
                          accept="audio/*" 
                          onChange={handleFile}
                        />
                        <button className="bg-white text-black cursor-pointer" onClick={sendAudio}>Convert to text</button>
                      </div>
                      </div>
                  </div>
                </div>
                </div>
                <div className = "mx-10">
                  <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your text
                  </label>
                  <textarea
                    id="message"
                    className="block p-2.5 w-full text-sm h-96 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write your thoughts here..."
                    defaultValue={convertedText} />
                    {loading && <p className="text-center text-white">ロード中...</p>}
                </div>    
                    
              
            </section>
           )}