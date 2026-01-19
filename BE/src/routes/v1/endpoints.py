from json import JSONDecodeError
import json
import logging
import time
import base64
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from openai import OpenAI
import asyncio
from src.settings import Settings


settings = Settings()
router = APIRouter(prefix="/api/v1")

logger = logging.getLogger(__name__)
openai = OpenAI(api_key=settings.OPENAI_API_KEY)


@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()

    try:
        while True:
            data = await websocket.receive_text()
            
            try:
                message_data = json.loads(data)
                user_message = message_data.get("message", "")
                use_streaming = message_data.get("stream", True)
                
                # validate user message
                if not user_message:
                    await websocket.send_json({"error": "No message provided"})
                    continue
                
                # validate use_streaming
                if not isinstance(use_streaming, bool):
                    await websocket.send_json({"error": "Invalid stream value"})
                    continue

                # time
                start_time = time.time()
                await generate_streaming_message(user_message, websocket, start_time)
                
            except json.JSONDecodeError:
                await websocket.send_json({"error": "Invalid JSON format"})
            
            except Exception as e:
                await websocket.send_json({"error": str(e)})
    except WebSocketDisconnect:
        logger.info("Client disconnected")
    
    except Exception as e:
        logger.error(f"WebSocket error: {e}")
        await websocket.send_json({"error": str(e)})

async def generate_streaming_response(user_message: str, websocket: WebSocket, start_time: float):
    try:
        await websocket.send_text(json.dumps({
            "type": "streaming_start",
            "timestamp": time.time()
        }))

        stream = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "system", "content": "You are a helpful AI assistant. Provide cleaar and concise responses"},
            {"role": "user", "content": user_message}],
            max_tokens = 150,
            temperature = 0.7,
            stream = True
        )

        full_response = ""
        chunk_count = 0

        for chunk in stream:
            if chunk.choices and chunk.choices[0].delta.content:
                content = chunk.choices[0].delta.content
                full_response += content
                chunk_count += 1

                chunk_timestamp = time.time()
                chunk_message = json.dumps({
                    "type": "streaming_chunk",
                    "content": content,
                    "timestamp": chunk_timestamp
                })
                await websocket.send_text(chunk_message)
                await asyncio.sleep(0.005)
        
        response_time = round((time.time() - start_time) * 1000, 2)
        
        await websocket.send_text(json.dumps({
            "type": "streaming_end",
            "response": full_response,
            "metrics": {
                "response_time_ms": response_time,
                "response_length": len(full_response),
                "word_count": len(full_response.split())
            }
        }))
    except Exception as e:
        await websocket.send_text(json.dumps({
            "type": "streaming_error",
            "error": str(e)
        }))
        