interface MessageInputProps {
    inputMessage: string;
    setInputMessage: (message: string) => void;
    sendMessage: () => void;
    isConnected: boolean;
    isLoading: boolean;
}

export default function MessageInput({ inputMessage, setInputMessage, sendMessage, isConnected, isLoading }: MessageInputProps) {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            sendMessage()
        }
    }

    return (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-3 shadow-lg">
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your message..."
                        className="flex-1 bg-transparent border-none outline-none text-slate-200 placeholder-slate-500"
                        disabled={!isConnected || isLoading}
                    />
                    <button
                        onClick={sendMessage}
                        disabled={!isConnected || isLoading || !inputMessage.trim()}
                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span className="hidden sm:inline">Send</span>
                        <span className="sm:hidden">→</span>
                    </button>

                </div>
            </div>

        </div>
    )
}