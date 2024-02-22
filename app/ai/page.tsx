'use client'

import { Input } from "@nextui-org/input";
import { Button, ButtonGroup } from "@nextui-org/button";
import { useState } from "react";
import React from "react";
import { Avatar, AvatarGroup, AvatarIcon } from "@nextui-org/avatar";

const apiUrl = 'http://localhost:3000/api/llm';

type ChatMessage = {
  avatarUrl: string
  name: string
  message: string
  date: Date
}

export default function App() {
  const [inputText, setInputText] = useState("")
  const [chat, setChat] = useState<ChatMessage[]>([])

  const submitPrompt = async () => {

    const newChat = [...chat]

    newChat.push({
      avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      name: "User",
      message: inputText,
      date: new Date()
    })
    setChat(newChat)

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: inputText }),
      });

      const botReply = await response.json()

      const newChat2 = [...newChat]

      newChat2.push({
        avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        name: "Gemini",
        message: botReply.message,
        date: new Date()
      })
      setChat(newChat2)

      if (response.ok) {
        console.log('Prompt submitted successfully', inputText, await response.json());
      } else {
        console.error('Error submitting prompt');
      }
    } catch (error) {
      console.error('Error submitting prompt', error);
    }


  };





  const placements = [
    "outside-left",
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-default-500 text-small">Enter Yout Prompt To Ai</h3>
        <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
          {placements.map((placement) => (
            <>
              <React.Fragment key={placement}>
                <Input
                  key={placement}
                  type="text"
                  label="Prompt"
                  value={inputText[0]}
                  labelPlacement={placement}
                  onChange={(e) => setInputText([e.target.value])}
                />
                <Button color="primary" variant="ghost" onClick={submitPrompt}>
                  Send
                </Button>
              </React.Fragment>
            </>
          ))}
        </div>
        {chat.map((m,i) => (
          <div key={i}>
            <div className="flex gap-5">
              <Avatar isBordered radius="full" size="md" />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-small font-semibold leading-none text-default-600">{m.name}</h4>
                <h5 className="text-small tracking-tight text-default-400">{m.date.toLocaleTimeString()}</h5>
                <p>{m.message}</p>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

