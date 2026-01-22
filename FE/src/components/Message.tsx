import { MessageType } from "@/reducers/messageReducer";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MessageProps {
    message: MessageType
}

export default function Message({ message }: MessageProps) {
    const isUser = message.sender === "user";

    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] sm:max-w-md lg:max-w-lg ${isUser
                    ? "bg-white text-black rounded-3xl rounded-br-lg"
                    : "text-neutral-200"
                } px-4 py-2.5`}>

                <div className="text-sm leading-relaxed">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            code({ node, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || "")
                                return match ? (
                                    <div className="my-3 rounded-lg overflow-hidden border border-neutral-800">
                                        <div className="bg-neutral-900 px-3 py-1.5 text-xs text-neutral-500 border-b border-neutral-800 font-mono">
                                            {match[1]}
                                        </div>
                                        <pre className="bg-neutral-950 p-3 text-sm text-neutral-300 overflow-x-auto">
                                            <code className={`${className} font-mono`} {...props}>{children}</code>
                                        </pre>
                                    </div>
                                ) : (
                                    <code className="bg-neutral-800 text-neutral-200 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>{children}</code>
                                )
                            },
                            table({ children }) {
                                return (
                                    <div className="my-3 overflow-x-auto border border-neutral-800 rounded-lg">
                                        <table className="min-w-full">
                                            {children}
                                        </table>
                                    </div>
                                )
                            },
                            th({ children }) {
                                return (
                                    <th className="px-4 py-2 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider border-b border-neutral-800 bg-neutral-900">
                                        {children}
                                    </th>
                                )
                            },
                            td({ children }) {
                                return (
                                    <td className="px-4 py-2 text-sm text-neutral-300 border-b border-neutral-800">
                                        {children}
                                    </td>
                                )
                            },
                            p({ children }) {
                                return (
                                    <p className="mb-2 last:mb-0">
                                        {children}
                                    </p>
                                )
                            },
                            ul({ children }) {
                                return (
                                    <ul className="list-disc list-inside mb-2 space-y-1 text-neutral-300">
                                        {children}
                                    </ul>
                                )
                            },
                            ol({ children }) {
                                return (
                                    <ol className="list-decimal list-inside mb-2 space-y-1 text-neutral-300">
                                        {children}
                                    </ol>
                                )
                            },
                            li({ children }) {
                                return (
                                    <li>
                                        {children}
                                    </li>
                                )
                            },
                            blockquote({ children }) {
                                return (
                                    <blockquote className="border-l-2 border-neutral-700 pl-4 italic text-neutral-400 my-2">
                                        {children}
                                    </blockquote>
                                )
                            },
                            h1({ children }) {
                                return <h1 className="text-xl font-semibold mb-2 mt-4 first:mt-0">{children}</h1>
                            },
                            h2({ children }) {
                                return <h2 className="text-lg font-semibold mb-2 mt-3 first:mt-0">{children}</h2>
                            },
                            h3({ children }) {
                                return <h3 className="text-base font-semibold mb-2 mt-3 first:mt-0">{children}</h3>
                            },
                            a({ children, href }) {
                                return (
                                    <a href={href} className="text-white underline underline-offset-2 hover:text-neutral-300 transition-colors">
                                        {children}
                                    </a>
                                )
                            },
                        }}
                    >{message.text}</ReactMarkdown>
                    {message.isStreaming && (
                        <span className="inline-block w-0.5 h-4 ml-0.5 bg-white animate-pulse" />
                    )}
                </div>

                <p className={`text-[10px] mt-1.5 ${isUser ? "text-neutral-500" : "text-neutral-600"}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
            </div>
        </div>
    )
}