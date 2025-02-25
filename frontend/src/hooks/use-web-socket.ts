'use client'

import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { toast } from 'react-hot-toast'
import { userIdInJwt } from '@/utils/user-id-in-jwt'

export const useWebSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const userId = userIdInJwt()

  type Message = {
    type: 'error' | 'success'
    text: string
  }

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_API_BASE_URL);

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('msgToClient', ({ type, text }: Message) => {
      toast[type](text, { duration: 6000 })
    });

    if (userId) {
      socket.on(`msgToClient-${userId}`, ({ type, text }: Message) => {
        toast[type](text, { duration: 6000 })
      });
    }
    
    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  const sendMessage = ({ type, text }: Message) => {
    if (socket) {
      socket.emit('msgToServer', { type, text });
    }
  };

  return { sendMessage };
};