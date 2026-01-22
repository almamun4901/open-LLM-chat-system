interface ChatHeaderProps {
    isConnected: boolean
}

export default function ChatHeader({ isConnected }: ChatHeaderProps) {
    return (
        <div className="border-b border-neutral-800 px-6 py-4">
            <div className="max-w-2xl mx-auto flex items-center justify-between">
                <h1 className="text-lg font-medium tracking-tight text-white">
                    Chat
                </h1>
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-white" : "bg-neutral-600"}`}></div>
                    <span className="text-xs text-neutral-500 uppercase tracking-wider">
                        {isConnected ? "Online" : "Offline"}
                    </span>
                </div>
            </div>
        </div>
    )
}