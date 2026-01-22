export default function LoadingIndicator() {
    return (
        <div className="flex justify-start">
            <div className="flex items-center gap-1 px-4 py-3">
                <div className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-pulse" style={{ animationDelay: "0ms" }} />
                <div className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-pulse" style={{ animationDelay: "150ms" }} />
                <div className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-pulse" style={{ animationDelay: "300ms" }} />
            </div>
        </div>
    )
}