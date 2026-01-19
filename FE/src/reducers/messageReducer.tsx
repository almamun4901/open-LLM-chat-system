export interface MessageType {
    id: string;
    text: string;
    sender: "user" | "ai";
    timestamp: Date;
    metrics?: {
        response_time_ms: number;
        response_length: number;
        word_count: number;
        sentiment: string;
    };
    feedback?: "thumbs_up" | "thumbs_down" | null;
    isStreaming?: boolean;
}

type MessageAction =
    | { type: "ADD_MESSAGE"; payload: MessageType }
    | { type: "ADD_STREAMING_MESSAGE"; payload?: undefined }
    | { type: "UPDATE_STREAMING_MESSAGE"; payload: string }
    | {
        type: "COMPLETE_STREAMING_MESSAGE";
        payload: {
            text: string;
            metrics?: MessageType["metrics"];
        };
    }
    | {
        type: "SET_FEEDBACK";
        payload: {
            messageId: string;
            feedback: MessageType["feedback"];
        };
    };

export const messageReducer = (
    state: MessageType[],
    action: MessageAction
): MessageType[] => {
    switch (action.type) {
        case "ADD_MESSAGE":
            return [...state, action.payload];

        case "ADD_STREAMING_MESSAGE":
            return [
                ...state,
                {
                    id: Math.random().toString(),
                    text: "",
                    sender: "ai",
                    timestamp: new Date(),
                    isStreaming: true,
                    feedback: null
                }
            ];

        case "UPDATE_STREAMING_MESSAGE":
            return state.map((msg) => {
                const updatedMessageText = msg.text + action.payload;
                return msg.isStreaming ? { ...msg, text: updatedMessageText } : msg;
            });

        case "COMPLETE_STREAMING_MESSAGE":
            return state.map((msg) => {
                return msg.isStreaming
                    ? {
                        ...msg,
                        text: action.payload.text,
                        metrics: action.payload.metrics,
                        isStreaming: false
                    }
                    : msg;
            });

        case "SET_FEEDBACK":
            return state.map((msg) => {
                return msg.id === action.payload.messageId
                    ? {
                        ...msg,
                        feedback: action.payload.feedback
                    }
                    : msg;
            });

        default:
            return state;
    }
};
