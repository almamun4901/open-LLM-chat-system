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
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black to-transparent pt-8 pb-6">
            <div className="max-w-2xl mx-auto px-4">
                <div className="flex items-center gap-3 bg-neutral-900 border border-neutral-800 rounded-full px-5 py-3 transition-all focus-within:border-neutral-600">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Message..."
                        className="flex-1 bg-transparent border-none outline-none text-white placeholder-neutral-600 text-sm"
                        disabled={!isConnected || isLoading}
                    />
                    <button
                        onClick={sendMessage}
                        disabled={!isConnected || isLoading || !inputMessage.trim()}
                        className="text-white bg-white/10 hover:bg-white/20 p-2 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}