import { MessageType } from "@/reducers/messageReducer";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MessageProps {
    message: MessageType
}

export default function Message({ message }: MessageProps) {
    return (
        <div
        className={`flex ${
            message.sender === "user" ? "justify-end" : "justify-start"
        }`}>
            <div className={`max-w-[85%] sm:max-w-xs lg:max-w-md px-3 py-2 sm:px-4 sm:py-2 rounded-lg ${
                message.sender === "user" ? "bg-purple-900 text-white" : "bg-slate-800/60 text-slate-200"
            }`}>

                <div className="text-sm sm:text-base">

                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            code({node, className, children, ...props}){
                                const match = /language-(\w+)/.exec(className || "")
                                return match ? (
                                    <div className="my-2 rounded-lg overflow-hidden">
                                        <div className="bg-slate-800 px-3 py-1 text-xs text-slate-400 border-b border-slate-700">
                                            {match[1]}
                                        </div>
                                        <pre className="bg-slate-900 p-3 text-sm text-slate-200 overflow-x-auto">
                                            <code className={className} {...props}>{children}</code>
                                        </pre>

                                    </div>
                                    
                                ) : (
                                    <code className="bg-slate-800 px-1 py-0.5 rounded text-sm" {...props}>{children}</code>
                                )
                            },
                            table({children}) {
                                return (
                                    <div className="my-2 overflow-x-auto">
                                        <table className="min-w-full border border-slate-700 rounded-lg">
                                            {children}
                                        </table>
                                    </div>
                                )   
                            },

                            th({children}) {
                                return (
                                    <th className="px-4 py-2 text-left text-xs font-semibold text-slate-200 border-b border-slate-700">
                                        {children}
                                    </th>
                                )
                            },

                            td({children}) {
                                return (
                                    <td className="px-4 py-2 text-left text-xs font-semibold text-slate-200 border-b border-slate-700">
                                        {children}
                                    </td>
                                )
                            },

                            p({children}) {
                                return (
                                    <p className=" break-words mb-2 last:mb-0">
                                        {children}
                                    </p>
                                )
                            },

                            ul({children}) {
                                return (
                                    <ul className="list-disc list-inside mb-2 space-y-1">
                                        {children}
                                    </ul>
                                )
                            },

                            li({children}) {
                                return (
                                    <li className="list-decimal list-inside mb-2 space-y-1">
                                        {children}
                                    </li>
                                )
                            },

                            blockquote({children}) {
                                return (
                                    <blockquote className="border-l-4 border-slate-700 pl-4 italic mb-2 last:mb-0">
                                        {children}
                                    </blockquote>
                                )
                            },

                            h1({children}) {
                                return (
                                    <h1 className="text-2xl font-bold mb-2 last:mb-0">
                                        {children}
                                    </h1>
                                )
                            },

                            h2({children}) {
                                return (
                                    <h2 className="text-xl font-bold mb-2 last:mb-0">
                                        {children}
                                    </h2>
                                )
                            },

                            h3({children}) {
                                return (
                                    <h3 className="text-lg font-bold mb-2 last:mb-0">
                                        {children}
                                    </h3>
                                )
                            },

                            h4({children}) {
                                return (
                                    <h4 className="text-md font-bold mb-2 last:mb-0">
                                        {children}
                                    </h4>
                                )
                            },

                            h5({children}) {
                                return (
                                    <h5 className="text-sm font-bold mb-2 last:mb-0">
                                        {children}
                                    </h5>
                                )
                            },

                            h6({children}) {
                                return (
                                    <h6 className="text-xs font-bold mb-2 last:mb-0">
                                        {children}
                                    </h6>
                                )
                            },

                            

                        }}
                    >{message.text}</ReactMarkdown>
                    {message.isStreaming ? (
                        <span className="inline-block w-2 h-4 ml-1 bg-purple-400 animate-pulse rounded"/>
                    ) : null}
                </div>
                <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                </p>

            </div>



        </div>
    )
}