import React from 'react'
import Aside from './Aside'
import { Outlet, Link , useLocation } from 'react-router-dom'
import { Home, Search, BookOpen, MessageCircle, User } from "lucide-react"
import RightAside from '../components/RightAside'

  const MainLayout = () => {
  const location = useLocation()

  const mobileNavItems = [
    { icon: Home, label: "Home", path: "/home" },
    { icon: Search, label: "Search", path: "/search" },
    { icon: BookOpen, label: "Notes", path: "/notes" },
    { icon: MessageCircle, label: "Messages", path: "/messages" },
    { icon: User, label: "Profile", path: `/profile/${localStorage.getItem("userId") || ":userId"}` },
  ]

  return (
    <div className="flex bg-gradient-to-br from-indigo-50 via-white to-cyan-50 min-h-screen">
      {/* Left Sidebar - Hidden on mobile */}
      <div className="hidden lg:block">
        <Aside />
      </div>

      {/* Main Content */}
      <div className="flex-1 h-screen overflow-y-auto bg-transparent text-gray-800 pb-20 lg:pb-0">
        <Outlet />
      </div>

      {/* Right Sidebar - Hidden on mobile and tablet */}
      <div className="hidden xl:block">
        <RightAside />
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-indigo-200 px-4 py-2 z-50 shadow-lg">
        <div className="flex justify-around items-center">
          {mobileNavItems.map((item, index) => {
            const Icon = item.icon
            const isActive =
              location.pathname === item.path ||
              (item.path.includes("profile") && location.pathname.includes("profile"))

            return (
              <Link
                key={index}
                to={item.path}
                className={`flex flex-col items-center p-2 rounded-lg transition-all ${
                  isActive ? "text-indigo-600 bg-indigo-50" : "text-gray-500 hover:text-indigo-600 hover:bg-indigo-50"
                }`}
              >
                <Icon size={20} />
                <span className="text-xs mt-1 font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default MainLayout