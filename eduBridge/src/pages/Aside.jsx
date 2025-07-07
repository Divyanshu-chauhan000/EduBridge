import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Search, BookOpen, MessageCircle, Bell, Plus, User, Sparkles, MoreHorizontal, Menu} from 'lucide-react'
import { useState } from 'react'

const Aside = () => {

   const location = useLocation()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems = [
    { icon: Home, label: "Home", path: "/home" },
    { icon: Search, label: "Search", path: "/search" },
    { icon: BookOpen, label: "Notes", path: "/notes" },
    { icon: MessageCircle, label: "Messages", path: "/messages" },
    { icon: Bell, label: "Notifications", path: "/notifications" },
    { icon: Plus, label: "Upload Yours", path: "/upload" },
    { icon: User, label: "Profile", path: `/profile/${localStorage.getItem("userId") || ":userId"}` },
  ]

  const bottomItems = [
    { icon: Sparkles, label: "Meta AI", path: "/ai" },
    { icon: MoreHorizontal, label: "More", path: "/more" },
  ]
  return (
    <div className="flex h-screen overflow-hidden">
      <aside
        className={`${isCollapsed ? "w-16" : "w-[280px]"} bg-black text-white sticky top-0 h-screen border-r border-gray-700 transition-all duration-300 flex flex-col`}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="text-3xl md:text-4xl text-white font-soul font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Edugram
              </div>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors md:hidden"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 py-6">
          <ul className="space-y-2 px-4">
            {menuItems.map((item, index) => {
              const Icon = item.icon
              const isActive =
                location.pathname === item.path ||
                (item.path.includes("profile") && location.pathname.includes("profile"))

              return (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-4 p-3 rounded-xl transition-all duration-200 group ${
                      isActive ? "bg-gray-800 text-white" : "hover:bg-gray-800/50 text-gray-300 hover:text-white"
                    }`}
                  >
                    <Icon
                      size={24}
                      className={`${isActive ? "text-blue-400" : "group-hover:text-blue-400"} transition-colors`}
                    />
                    {!isCollapsed && <span className="text-lg font-medium">{item.label}</span>}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Bottom Menu */}
        <div className="px-4 pb-6 border-t border-gray-800 pt-4">
          <ul className="space-y-2">
            {bottomItems.map((item, index) => {
              const Icon = item.icon
              return (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-800/50 text-gray-300 hover:text-white transition-all duration-200 group"
                  >
                    <Icon size={20} className="group-hover:text-blue-400 transition-colors" />
                    {!isCollapsed && <span className="font-medium">{item.label}</span>}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </aside>
    </div>
  )
}

export default Aside