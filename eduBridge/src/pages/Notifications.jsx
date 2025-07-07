"use client"
import { useState, useEffect } from "react"
import { Bell, Heart, MessageCircle, UserPlus, BookOpen, ShoppingBag, Check, X } from "lucide-react"

const Notifications = () => {
  const [notifications, setNotifications] = useState([])
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    // Mock notifications data
    const mockNotifications = [
      {
        id: 1,
        type: "like",
        user: "math_tutor_raj",
        userAvatar: "/placeholder.svg?height=40&width=40",
        message: "liked your calculus notes",
        time: "2 minutes ago",
        isRead: false,
        postImage: "https://arisehomeeducation.com/wp-content/uploads/2023/06/2-1.png",
      },
      {
        id: 2,
        type: "follow",
        user: "physics_notes_pro",
        userAvatar: "/placeholder.svg?height=40&width=40",
        message: "started following you",
        time: "1 hour ago",
        isRead: false,
      },
      {
        id: 3,
        type: "comment",
        user: "study_buddy_101",
        userAvatar: "/placeholder.svg?height=40&width=40",
        message: "commented on your post: 'Great explanation!'",
        time: "3 hours ago",
        isRead: true,
        postImage: "https://edumarz.com/wp-content/uploads/2022/01/PHYSICS-NOTESRushita-9101112.png",
      },
      {
        id: 4,
        type: "note",
        user: "chem_lab_notes",
        userAvatar: "/placeholder.svg?height=40&width=40",
        message: "shared new chemistry notes",
        time: "5 hours ago",
        isRead: true,
      },
      {
        id: 5,
        type: "marketplace",
        user: "book_seller_sam",
        userAvatar: "/placeholder.svg?height=40&width=40",
        message: "posted a new item for sale",
        time: "1 day ago",
        isRead: true,
      },
      {
        id: 6,
        type: "like",
        user: "coding_master",
        userAvatar: "/placeholder.svg?height=40&width=40",
        message: "and 5 others liked your programming notes",
        time: "2 days ago",
        isRead: true,
        postImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400",
      },
    ]
    setNotifications(mockNotifications)
  }, [])

  const getNotificationIcon = (type) => {
    switch (type) {
      case "like":
        return <Heart size={20} className="text-red-500" />
      case "comment":
        return <MessageCircle size={20} className="text-blue-500" />
      case "follow":
        return <UserPlus size={20} className="text-green-500" />
      case "note":
        return <BookOpen size={20} className="text-purple-500" />
      case "marketplace":
        return <ShoppingBag size={20} className="text-yellow-500" />
      default:
        return <Bell size={20} className="text-gray-500" />
    }
  }

  const markAsRead = (id) => {
    setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, isRead: true })))
  }

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((notif) => notif.id !== id))
  }

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "unread") return !notif.isRead
    if (filter === "likes") return notif.type === "like"
    if (filter === "comments") return notif.type === "comment"
    if (filter === "follows") return notif.type === "follow"
    return true
  })

  const unreadCount = notifications.filter((notif) => !notif.isRead).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Notifications</h1>
            <p className="text-gray-600">
              {unreadCount > 0 ? `You have ${unreadCount} unread notifications` : "You're all caught up!"}
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              Mark all as read
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-indigo-100 mb-6">
          <div className="flex overflow-x-auto p-4 space-x-2">
            {[
              { key: "all", label: "All", count: notifications.length },
              { key: "unread", label: "Unread", count: unreadCount },
              { key: "likes", label: "Likes", count: notifications.filter((n) => n.type === "like").length },
              { key: "comments", label: "Comments", count: notifications.filter((n) => n.type === "comment").length },
              { key: "follows", label: "Follows", count: notifications.filter((n) => n.type === "follow").length },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  filter === tab.key
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                }`}
              >
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      filter === tab.key ? "bg-white text-indigo-600" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-2xl shadow-sm border transition-all hover:shadow-md ${
                  notification.isRead ? "border-gray-200" : "border-indigo-200 bg-indigo-50/30"
                }`}
              >
                <div className="p-4">
                  <div className="flex items-start space-x-4">
                    {/* Notification Icon */}
                    <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>

                    {/* User Avatar */}
                    <img
                      src={notification.userAvatar || "/placeholder.svg"}
                      alt={notification.user}
                      className="w-12 h-12 rounded-full object-cover border-2 border-indigo-100"
                    />

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-gray-800">
                            <span className="font-semibold">{notification.user}</span>{" "}
                            <span className="text-gray-600">{notification.message}</span>
                          </p>
                          <p className="text-sm text-gray-500 mt-1">{notification.time}</p>
                        </div>

                        {/* Post Image */}
                        {notification.postImage && (
                          <img
                            src={notification.postImage || "/placeholder.svg"}
                            alt="Post"
                            className="w-12 h-12 rounded-lg object-cover ml-4 border border-gray-200"
                          />
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      {!notification.isRead && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="Mark as read"
                        >
                          <Check size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete notification"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Bell size={64} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No notifications</h3>
              <p className="text-gray-500">
                {filter === "all" ? "You don't have any notifications yet." : `No ${filter} notifications found.`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Notifications
