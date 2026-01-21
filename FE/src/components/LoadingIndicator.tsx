export default function LoadingIndicator() {
    return (
        <div className="flex justify-start">
            <div 
            className="bg-slate-800 border border-salte-700 text-slate-200 px-4 py-y rounded-lg"
            >
                <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: "0.1s"}} />
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: "0.2s"}} />
                </div>
                
            </div>
        </div>
    )
}