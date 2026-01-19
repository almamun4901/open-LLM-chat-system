'use client'

import { messageReducer } from "@/reducers/messageReducer";
import { useReducer, useState, useRef, useEffect } from "react";
import ChatHeader from "@/components/ChatHeader";
import MessageInput from "@/components/MessageInput";

export default function Chat() {

    const [inputMessage, setInputMessage] = useState("")
    const [messages, dispatch] = useReducer(messageReducer, [])
    const [isLoading, setIsLoading] = useState(false)
    const [isConencted, setIsConnected] = useState(false)
    const wsRef = useRef<WebSocket | null>(null)

    const sendMessage = () => {
        const trimmed = inputMessage.trim()

        if (!trimmed || !isConencted || isLoading) return

        dispatch({
            type: "ADD_MESSAGE",
            payload: {
                id: Math.random().toString(),
                text: trimmed,
                sender: "user",
                timestamp: new Date(),
                feedback: null
            }
        })

        setIsLoading(true)
        setInputMessage("")

        wsRef.current?.send(JSON.stringify({ message: trimmed, streaming: true }))
    }

    const addMessage = (text: string, sender: "user" | "ai", metrics?: any) => {
        dispatch({
            type: "ADD_MESSAGE",
            payload: {
                id: Math.random().toString(),
                text,
                sender,
                timestamp: new Date(),
                metrics,
                feedback: null
            }
        })
    }

    const addStreamingMessage = () => {
        dispatch({
            type: "ADD_STREAMING_MESSAGE"
        })
    }

    const updateStreamingMessage = (content: string) => {
        dispatch({
            type: "UPDATE_STREAMING_MESSAGE",
            payload: content
        })
    }

    const completeStreamingMessage = (fullResponse: string, metrics: any) => {
        dispatch({
            type: "COMPLETE_STREAMING_MESSAGE",
            payload: {
                text: fullResponse,
                metrics
            }
        })
    }

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8081/api/v1/ws")
        wsRef.current = ws

        ws.onopen = () => {
            setIsConnected(true)
        }

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data)

            if (data.error) {
                addMessage("Error: " + data.error, "ai")
                setIsLoading(false)
            }

            else if (data.type === "streaming_start") {
                addStreamingMessage()
                setIsLoading(false)
            }

            else if (data.type === "streaming_chunk") {
                updateStreamingMessage(data.content)
            }

            else if (data.type === "streaming_end") {
                completeStreamingMessage(data.response, data.metrics)
            }

            else if (data.response) {
                addMessage(data.response, "ai", data.metrics)
                setIsLoading(false)
            }
        }

        ws.onclose = () => {
            setIsConnected(false)
        }

        ws.onerror = (error) => {
            console.error("WebSocket error:", error)
            setIsConnected(false)
        }

        return () => {
            ws.close()
        }
    }, [])

    return (
        <div className="flex flex-col h-screen bg-slate-900">
            <ChatHeader isConnected={isConencted} />
            <div>body</div>
            <MessageInput 
                inputMessage={inputMessage}
                setInputMessage={setInputMessage}
                sendMessage={sendMessage}
                isConnected={isConencted}
                isLoading={isLoading}
            />
        </div>
    );
}