import { useState, useEffect } from "react"
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Plus } from "lucide-react"

const Home = () => {
  const [posts, setPosts] = useState([])
  const [stories, setStories] = useState([])
  const [followedUsers, setFollowedUsers] = useState(new Set())
  useEffect(() => {
    setPosts([
      {
        id: 1,
        username: "math_tutor_raj",
        userAvatar: "/placeholder.svg?height=32&width=32",
        timeAgo: "2h",
        postImage: "https://arisehomeeducation.com/wp-content/uploads/2023/06/2-1.png",
        likes: 245,
        caption: "Quick calculus trick for derivatives! 📚✨ #MathTips #Calculus #StudyHacks",
        comments: 18,
        isLiked: false,
        isSaved: false,
      },
      {
        id: 2,
        username: "physics_notes_pro",
        userAvatar: "/placeholder.svg?height=32&width=32",
        timeAgo: "4h",
        postImage: "https://edumarz.com/wp-content/uploads/2022/01/PHYSICS-NOTESRushita-9101112.png",
        likes: 189,
        caption: "Newton's laws explained with real-world examples 🚀 #Physics #Science #Education",
        comments: 23,
        isLiked: true,
        isSaved: false,
      },
      {
        id: 3,
        username: "chem_lab_notes",
        userAvatar: "/placeholder.svg?height=32&width=32",
        timeAgo: "6h",
        postImage: "https://notes.newtondesk.com/wp-content/uploads/2023/06/Chemistry-11-Study-Notes-pdf.jpg",
        likes: 156,
        caption: "Organic chemistry reaction mechanisms made simple! 🧪 #Chemistry #OrganicChem #StudyNotes",
        comments: 12,
        isLiked: false,
        isSaved: true,
      },
    
    {
        id: 4,
        username: "book_seller_sam",
        userAvatar: "/placeholder.svg?height=32&width=32",
        timeAgo: "8h",
        postImage: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/4e720e98525517.5ede628275cec.jpg",
        likes: 89,
        caption: "Selling my engineering textbooks! All in excellent condition 📚 DM for details",
        comments: 15,
        isLiked: false,
        isSaved: false,
        type: "sell",
        price: "₹2,500",
      },
      {
        id: 5,
        username: "study_buddy_101",
        userAvatar: "/placeholder.svg?height=32&width=32",
        timeAgo: "12h",
        postImage: "https://m.media-amazon.com/images/I/4181IQOmUFL.jpg",
        likes: 67,
        caption: "Looking for someone to sell their Data Structures book 📖 Need it urgently!",
        comments: 8,
        isLiked: false,
        isSaved: false,
        type: "buy",
      },
      {
        id: 6,
        username: "tech_gadgets_store",
        userAvatar: "/placeholder.svg?height=32&width=32",
        timeAgo: "1d",
        postImage: "https://png.pngtree.com/thumb_back/fw800/background/20230704/pngtree-office-essentials-technology-and-gadgets-illustration-featuring-laptop-printer-camera-tablet-image_3748458.jpg",
        likes: 234,
        caption: "Brand new laptop for sale! Perfect for coding and studies 💻 #TechSale #Laptop",
        comments: 45,
        isLiked: false,
        isSaved: false,
        type: "sell",
        price: "₹45,000",
      },
    ])

    setStories([
      { id: 1, username: "quick_math", avatar: "/placeholder.svg?height=56&width=56", hasStory: true },
      { id: 2, username: "bio_facts", avatar: "/placeholder.svg?height=56&width=56", hasStory: true },
      { id: 3, username: "history_hub", avatar: "/placeholder.svg?height=56&width=56", hasStory: true },
      { id: 4, username: "coding_tips", avatar: "/placeholder.svg?height=56&width=56", hasStory: true },
      { id: 5, username: "english_lit", avatar: "/placeholder.svg?height=56&width=56", hasStory: true },
      { id: 6, username: "geo_world", avatar: "/placeholder.svg?height=56&width=56", hasStory: true },
    ])

    

  }, [])



  const handleLike = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
          : post,
      ),
    )
  }

  const handleSave = (postId) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, isSaved: !post.isSaved } : post)))
  }

   const handleFollow = (username) => {
    setFollowedUsers((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(username)) {
        newSet.delete(username)
      } else {
        newSet.add(username)
      }
      return newSet
    })
  }

  const getPostTypeColor = (type) => {
    switch (type) {
      case "sell":
        return "bg-green-500"
      case "buy":
        return "bg-blue-500"
      default:
        return "bg-purple-500"
    }
  }

  const getPostTypeText = (type) => {
    switch (type) {
      case "sell":
        return "SELLING"
      case "buy":
        return "BUYING"
      default:
        return "NOTES"
    }
  }
  return (
    //ye ha feed section
    <div className="flex-1 bg-black text-white overflow-y-scroll min-h-screen">
      <div className="max-w-lg mx-auto py-4 md:py-6">
        {/* Stories Section */}
        <div className="flex space-x-3 md:space-x-4 p-4 overflow-x-auto scrollbar-hide">
          {/* Add Story */}
          <div className="flex flex-col items-center space-y-1 flex-shrink-0">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-gray-800 rounded-full flex items-center justify-center border-2 border-gray-600 cursor-pointer hover:border-gray-500 transition-colors">
              <Plus size={20} className="text-white" />
            </div>
            <span className="text-xs text-gray-300">Your Story</span>
          </div>

          {/* Stories */}
          {stories.map((story) => (
            <div key={story.id} className="flex flex-col items-center space-y-1 flex-shrink-0">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full p-0.5 bg-gradient-to-r from-purple-500 to-pink-500 cursor-pointer">
                <img
                  src={story.avatar || "/placeholder.svg"}
                  alt={story.username}
                  className="w-full h-full rounded-full border-2 border-black object-cover"
                />
              </div>
              <span className="text-xs text-gray-300 truncate w-12 md:w-16 text-center">{story.username}</span>
            </div>
          ))}
        </div>

        {/* Posts Section */}
        <div className="space-y-4 md:space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-black border-b border-gray-800">
              {/* Post Header */}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={post.userAvatar || "/placeholder.svg"}
                    alt={post.username}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-sm">{post.username}</span>
                    <span className="text-gray-400 text-sm">• {post.timeAgo}</span>
                    {post.username !== localStorage.getItem("username") && (
                      <button
                        onClick={() => handleFollow(post.username)}
                        className={`ml-2 text-xs px-2 py-1 rounded-full transition-colors ${
                          followedUsers.has(post.username)
                            ? "text-gray-400 hover:text-white"
                            : "text-blue-500 hover:text-blue-400"
                        }`}
                      >
                        {followedUsers.has(post.username) ? "Following" : "Follow"}
                      </button>
                    )}
                  </div>
                </div>
                <MoreHorizontal size={20} className="text-gray-400 cursor-pointer hover:text-white transition-colors" />
              </div>

              {/* Post Image */}
              <div className="relative w-full">
                <img
                  src={post.postImage || "/placeholder.svg"}
                  alt="Post Content"
                  className="w-full h-64 md:h-96 object-cover"
                />

                {/* Post Type Badge */}
                <div
                  className={`absolute top-3 left-3 ${getPostTypeColor(post.type)} text-white px-2 py-1 rounded-full text-xs font-bold`}
                >
                  {getPostTypeText(post.type)}
                </div>

                {/* Price Badge for sell posts */}
                {post.price && (
                  <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {post.price}
                  </div>
                )}
              </div>

              {/* Post Actions */}
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-4">
                    <Heart
                      size={24}
                      className={`cursor-pointer transition-colors ${
                        post.isLiked ? "text-red-500 fill-current" : "text-white hover:text-gray-300"
                      }`}
                      onClick={() => handleLike(post.id)}
                    />
                    <MessageCircle
                      size={22}
                      className="cursor-pointer text-white hover:text-gray-300 transition-colors"
                    />
                    <Send size={22} className="cursor-pointer text-white hover:text-gray-300 transition-colors" />
                  </div>
                  <Bookmark
                    size={22}
                    className={`cursor-pointer transition-colors ${
                      post.isSaved ? "text-blue-500 fill-current" : "text-white hover:text-gray-300"
                    }`}
                    onClick={() => handleSave(post.id)}
                  />
                </div>

                <div className="font-semibold text-sm mb-2">{post.likes.toLocaleString()} likes</div>

                <div className="text-sm mb-2">
                  <span className="font-semibold mr-2">{post.username}</span>
                  {post.caption}
                </div>

                <div className="text-gray-400 text-sm mb-3 cursor-pointer hover:text-gray-300 transition-colors">
                  View all {post.comments} comments
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-1 bg-transparent text-sm placeholder-gray-400 outline-none border-none"
                  />
                  <button className="text-blue-500 text-sm font-semibold hover:text-blue-400 transition-colors">
                    Post
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home