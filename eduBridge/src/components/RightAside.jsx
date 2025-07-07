import React from 'react'
import { useState , useEffect } from 'react'
import { TrendingUp, Users, ShoppingBag } from "lucide-react"
const RightAside = () => {

const [suggestions, setSuggestions] = useState([])
  const [trendingTopics, setTrendingTopics] = useState([])
  const [marketplaceItems, setMarketplaceItems] = useState([])

useEffect(() => {
      setSuggestions([
      {
        id: 1,
        username: "study_buddy_101",
        name: "Study Buddy",
        avatar: "/placeholder.svg?height=32&width=32",
        mutualFriends: "Followed by math_tutor_raj",
      },
      {
        id: 2,
        username: "notes_exchange",
        name: "Notes Exchange",
        avatar: "/placeholder.svg?height=32&width=32",
        mutualFriends: "Suggested for you",
      },
      {
        id: 3,
        username: "exam_prep_guru",
        name: "Exam Prep Guru",
        avatar: "/placeholder.svg?height=32&width=32",
        mutualFriends: "Followed by physics_notes_pro",
      },
      {
        id: 4,
        username: "book_reviews_edu",
        name: "Book Reviews",
        avatar: "/placeholder.svg?height=32&width=32",
        mutualFriends: "Suggested for you",
      },
    ])

     setTrendingTopics([
      { id: 1, tag: "#MathTips", posts: "1.2k posts" },
      { id: 2, tag: "#StudyHacks", posts: "856 posts" },
      { id: 3, tag: "#ExamPrep", posts: "2.1k posts" },
      { id: 4, tag: "#BookSale", posts: "432 posts" },
    ])

    setMarketplaceItems([
      { id: 1, title: "Engineering Books", price: "₹2,500", image: "/placeholder.svg?height=40&width=40" },
      { id: 2, title: "Laptop - Dell", price: "₹35,000", image: "/placeholder.svg?height=40&width=40" },
      { id: 3, title: "Calculator", price: "₹800", image: "/placeholder.svg?height=40&width=40" },
    ])
  }, [])

  const handleFollow = (id) => {
    setSuggestions((prev) =>
      prev.map((suggestion) =>
        suggestion.id === id ? { ...suggestion, isFollowing: !suggestion.isFollowing } : suggestion,
      ),
    )
  }
  return (
    <div className="hidden lg:block">
      <aside className='w-[350px] bg-black text-white p-6 sticky top-0 h-screen overflow-y-auto scrollbar-hide'>
         <div className='flex items-center justify-between mb-6 className="hidden lg:block"'>
            <div className='flex items-center space-x-3'>
                <img src="/placeholder.svg?height=56&width=56" alt="Your Profile" className='w-14 h-14 rounded-full object-cover'/>

                <div>
                  <div className='font-semibold text-sm'>
                       {localStorage.getItem("username") || "Student_user"}
                  </div>
                  <div className='text-gray-400 text-sm'>
                       Student
                  </div>
                </div>
            </div>
            <button className='text-blue-500 text-xs hover:text-blue-400 transition-colors'>Switch</button>
         </div>


         <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Users size={16} className="text-gray-400" />
              <span className="text-gray-400 font-semibold text-sm">Suggested For You</span>
            </div>
            <button className="text-white text-xs hover:text-gray-300 transition-colors">See All</button>
          </div>

          <div className="space-y-3">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="flex items-center justify-between p-2 hover:bg-gray-900/30 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={suggestion.avatar || "/placeholder.svg"}
                    alt={suggestion.username}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-sm">{suggestion.username}</div>
                    <div className="text-gray-400 text-xs">{suggestion.mutualFriends}</div>
                  </div>
                </div>
                <button
                  onClick={() => handleFollow(suggestion.id)}
                  className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors ${
                    suggestion.isFollowing ? "text-gray-400 hover:text-white" : "text-blue-500 hover:text-blue-400"
                  }`}
                >
                  {suggestion.isFollowing ? "Following" : "Follow"}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp size={16} className="text-green-400" />
            <span className="text-gray-400 font-semibold text-sm">Trending Topics</span>
          </div>

          <div className="space-y-2">
            {trendingTopics.map((topic) => (
              <div key={topic.id} className="p-2 hover:bg-gray-900/30 rounded-lg cursor-pointer transition-colors">
                <div className="font-semibold text-sm text-blue-400">{topic.tag}</div>
                <div className="text-gray-400 text-xs">{topic.posts}</div>
              </div>
            ))}
          </div>
        </div>
         
          <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <ShoppingBag size={16} className="text-yellow-400" />
            <span className="text-gray-400 font-semibold text-sm">Quick Buy</span>
          </div>

          <div className="space-y-3">
            {marketplaceItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-3 p-2 hover:bg-gray-900/30 rounded-lg cursor-pointer transition-colors"
              >
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-10 h-10 rounded object-cover"
                />
                <div className="flex-1">
                  <div className="font-semibold text-sm">{item.title}</div>
                  <div className="text-green-400 text-xs font-bold">{item.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

         <div className='mt-8 text-xs text-gray-500 space-y-1'>
                  <div className='flex flex-wrap grap-3'>
                   <span>About</span>•<span>Help</span>•<span>Press</span>•<span>API</span>•<span>Jobs</span>•
                        <span>Privacy</span>•<span>Terms</span>
                  </div>

                  <div className='flex flex-wrap gap-2'>
                             <span>Locations</span>•<span>Language</span>•<span>Meta Verified</span>
                  </div>
                  <div className='mt-4'>© 2025 EDUGRAM FROM META</div>
         </div>

         <div className="mt-auto pt-4 border-t border-gray-800">
          <div className="text-xs text-gray-500 space-y-2">
            <div className="flex flex-wrap gap-2">
              <span className="hover:text-gray-400 cursor-pointer">About</span>•
              <span className="hover:text-gray-400 cursor-pointer">Help</span>•
              <span className="hover:text-gray-400 cursor-pointer">Press</span>•
              <span className="hover:text-gray-400 cursor-pointer">API</span>•
              <span className="hover:text-gray-400 cursor-pointer">Jobs</span>•
              <span className="hover:text-gray-400 cursor-pointer">Privacy</span>•
              <span className="hover:text-gray-400 cursor-pointer">Terms</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="hover:text-gray-400 cursor-pointer">Locations</span>•
              <span className="hover:text-gray-400 cursor-pointer">Language</span>•
              <span className="hover:text-gray-400 cursor-pointer">Meta Verified</span>
            </div>
            <div className="mt-4 text-center">© 2025 EDUGRAM FROM META</div>
          </div>
        </div>
      </aside>
    </div>
  )
}

export default RightAside