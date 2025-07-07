import { useState, useEffect, useRef } from "react"
import { Send, Search, Phone, Video, MoreHorizontal, Smile } from "lucide-react"

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(null)
  const [message, setMessage] = useState("")
  const [chats, setChats] = useState([])
  const [messages, setMessages] = useState([])
  const messagesEndRef = useRef(null)

  useEffect(() => {
    // Mock chat data
    const mockChats = [
      {
        id: 1,
        name: "Study Group - Math",
        avatar: "/placeholder.svg?height=40&width=40",
        lastMessage: "Anyone has calculus notes?",
        time: "2m",
        unread: 3,
        isGroup: true,
        online: true,
      },
      {
        id: 2,
        name: "Raj Kumar",
        avatar: "/placeholder.svg?height=40&width=40",
        lastMessage: "Thanks for the physics notes!",
        time: "1h",
        unread: 0,
        isGroup: false,
        online: true,
      },
      {
        id: 3,
        name: "Priya Sharma",
        avatar: "/placeholder.svg?height=40&width=40",
        lastMessage: "Can you help with chemistry?",
        time: "3h",
        unread: 1,
        isGroup: false,
        online: false,
      },
      {
        id: 4,
        name: "CS Study Circle",
        avatar: "/placeholder.svg?height=40&width=40",
        lastMessage: "New DSA resources shared",
        time: "1d",
        unread: 0,
        isGroup: true,
        online: true,
      },
    ]
    setChats(mockChats)
    setSelectedChat(mockChats[0])
  }, [])

  useEffect(() => {
    if (selectedChat) {
      // Mock messages for selected chat
      const mockMessages = [
        {
          id: 1,
          sender: selectedChat.name,
          message: "Hey! Do you have the calculus notes from yesterday's class?",
          time: "10:30 AM",
          isMe: false,
        },
        {
          id: 2,
          sender: "Me",
          message: "Yes, I have them. Let me share the PDF with you.",
          time: "10:32 AM",
          isMe: true,
        },
        {
          id: 3,
          sender: selectedChat.name,
          message: "That would be great! Thanks a lot 🙏",
          time: "10:33 AM",
          isMe: false,
        },
        {
          id: 4,
          sender: "Me",
          message: "No problem! Always happy to help fellow students.",
          time: "10:35 AM",
          isMe: true,
        },
      ]
      setMessages(mockMessages)
    }
  }, [selectedChat])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const sendMessage = () => {
    if (message.trim() && selectedChat) {
      const newMessage = {
        id: messages.length + 1,
        sender: "Me",
        message: message.trim(),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isMe: true,
      }

      setMessages([...messages, newMessage])
      setMessage("")

      // Update last message in chat list
      setChats(
        chats.map((chat) =>
          chat.id === selectedChat.id ? { ...chat, lastMessage: message.trim(), time: "now" } : chat,
        ),
      )

      // Simulate response after 2 seconds
      setTimeout(() => {
        const responseMessage = {
          id: messages.length + 2,
          sender: selectedChat.name,
          message: "Thanks for sharing! This is really helpful.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isMe: false,
        }
        setMessages((prev) => [...prev, responseMessage])
      }, 2000)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex">
      {/* Chat List */}
      <div className="w-full md:w-1/3 bg-white border-r border-indigo-100 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-indigo-100">
          <h1 className="text-xl font-bold text-gray-800 mb-4">Messages</h1>
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-indigo-50 transition-colors ${
                selectedChat?.id === chat.id ? "bg-indigo-50 border-r-2 border-r-indigo-600" : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={chat.avatar || "/placeholder.svg"}
                    alt={chat.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800 truncate">{chat.name}</h3>
                    <span className="text-xs text-gray-500">{chat.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                    {chat.unread > 0 && (
                      <span className="bg-indigo-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {selectedChat ? (
        <div className="hidden md:flex flex-1 flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-indigo-100 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={selectedChat.avatar || "/placeholder.svg"}
                    alt={selectedChat.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {selectedChat.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div>
                  <h2 className="font-semibold text-gray-800">{selectedChat.name}</h2>
                  <p className="text-sm text-gray-500">{selectedChat.online ? "Active now" : "Last seen 2h ago"}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                  <Phone size={20} />
                </button>
                <button className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                  <Video size={20} />
                </button>
                <button className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    msg.isMe
                      ? "bg-indigo-600 text-white rounded-br-sm"
                      : "bg-white text-gray-800 border border-gray-200 rounded-bl-sm"
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                  <p className={`text-xs mt-1 ${msg.isMe ? "text-indigo-200" : "text-gray-500"}`}>{msg.time}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-indigo-100 bg-white">
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-500 hover:text-indigo-600 transition-colors">
                <Smile size={20} />
              </button>
              <div className="flex-1 relative">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  rows={1}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  style={{ minHeight: "40px", maxHeight: "120px" }}
                />
              </div>
              <button
                onClick={sendMessage}
                disabled={!message.trim()}
                className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send size={24} className="text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Select a conversation</h3>
            <p className="text-gray-500">Choose from your existing conversations or start a new one</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Messages
