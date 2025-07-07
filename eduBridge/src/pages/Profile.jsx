import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import {
  Settings,
  Grid,
  ShoppingBag,
  ShoppingCart,
  Plus,
  Heart,
  MessageCircle,
  UserPlus,
  UserCheck,
  Upload
} from "lucide-react"
import Button from '../components/Button'

const Profile = () => {
   

  const {userId}  = useParams();
  const [userData , setUserData] = useState(null);
  const [activeTab , setActiveTab] = useState('posts');
  const [posts , setPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [newPost, setNewPost] = useState({ type: "note", image: null, imagePreview: "", caption: "", price: "" })

  const fileInputRef = useRef(null)

  useEffect(()=>{
    fetch(`http://localhost:5000/api/user/${userId}`)
    .then(res => res.json())
    .then(data => setUserData(data));


    fetch(`http://localhost:5000/api/posts/${userId}`)
    .then(res => res.json())
    .then(data=>setPosts(data))
  },[userId]);


  const handleFollow = () =>{
     setIsFollowing(!isFollowing)
    // Update follower count
    setUserData((prev) => ({
      ...prev,
      followers: isFollowing ? prev.followers - 1 : prev.followers + 1,
    }))
  }

  const handleImageSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setNewPost({
          ...newPost,
          image: file,
          imagePreview: e.target.result,
        })
      }
      reader.readAsDataURL(file)
    }
  }

   const handleUploadPost = () => {
    if (!newPost.image) return

    const post = {
      id: Date.now(),
      type: newPost.type,
      imageUrl: newPost.imagePreview,
      caption: newPost.caption,
      price: newPost.price,
      likes: 0,
      comments: 0,
    }

    setPosts([post, ...posts])
    setNewPost({ type: "note", image: null, imagePreview: "", caption: "", price: "" })
    setShowUploadModal(false)
  }

  const renderPosts = (type) => {
    const filtered = posts.filter(post => post.type === type) || [];
    return (
       <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 mt-4">
        {filtered.map((post, index) => (
          <div key={index} className="relative group cursor-pointer">
            <img
              src={post.imageUrl || "/placeholder.svg?height=200&width=200"}
              alt="Post"
              className="w-full h-32 md:h-40 object-cover rounded-xl shadow-sm"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
              <div className="flex space-x-4 text-white">
                <div className="flex items-center space-x-1">
                  <Heart size={16} />
                  <span className="text-sm">{post.likes || 0}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageCircle size={16} />
                  <span className="text-sm">{post.comments || 0}</span>
                </div>
              </div>
            </div>
            {post.price && (
              <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                ₹{post.price}
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  const currentUserId = localStorage.getItem("userId")
  const isOwnProfile = String(currentUserId) === String(userId)

    
  

    
  return (
     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-indigo-100 p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <img
                src={userData?.profilePic || "/placeholder.svg?height=150&width=150"}
                alt="Profile"
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-indigo-200 object-cover shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-md"></div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                  {userData?.username || localStorage.getItem("username")}
                </h2>

                <div className="flex gap-2 justify-center md:justify-start">
                  {isOwnProfile ? (
                    <>
                      <Link to={`/editprofile/${userId}`}>
                        <button className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm">
                          <Settings size={16} />
                          <span className="hidden md:inline">Edit Profile</span>
                        </button>
                      </Link>
                      <button
                        onClick={() => setShowUploadModal(true)}
                        className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
                      >
                        <Plus size={16} />
                        <span className="hidden md:inline">Add Post</span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleFollow}
                      className={`flex items-center space-x-2 px-6 py-2 rounded-lg transition-colors shadow-sm ${
                        isFollowing
                          ? "bg-gray-200 hover:bg-gray-300 text-gray-700"
                          : "bg-indigo-600 hover:bg-indigo-700 text-white"
                      }`}
                    >
                      {isFollowing ? <UserCheck size={16} /> : <UserPlus size={16} />}
                      <span>{isFollowing ? "Following" : "Follow"}</span>
                    </button>
                  )}
                </div>
              </div>

              <p className="text-gray-600 mb-4 max-w-md">{userData?.bio || "No bio yet."}</p>

              <div className="flex justify-center md:justify-start gap-6 mb-4">
                <div className="text-center">
                  <div className="font-bold text-lg text-gray-800">{posts?.length || 0}</div>
                  <div className="text-gray-500 text-sm">Posts</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-lg text-gray-800">{userData?.followers || 0}</div>
                  <div className="text-gray-500 text-sm">Followers</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-lg text-gray-800">{userData?.following || 0}</div>
                  <div className="text-gray-500 text-sm">Following</div>
                </div>
              </div>

              {userData?.college && (
                <div className="text-gray-500 text-sm">
                  🎓 {userData.college} • {userData.degree} {userData.branch}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-indigo-100 mb-6">
          <div className="flex justify-center border-b border-gray-100">
            <div className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab("posts")}
                className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                  activeTab === "posts"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <Grid size={16} />
                <span className="hidden md:inline font-medium">Posts</span>
              </button>
              <button
                onClick={() => setActiveTab("sell")}
                className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                  activeTab === "sell"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <ShoppingBag size={16} />
                <span className="hidden md:inline font-medium">Selling</span>
              </button>
              <button
                onClick={() => setActiveTab("buy")}
                className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                  activeTab === "buy"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <ShoppingCart size={16} />
                <span className="hidden md:inline font-medium">Buying</span>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 min-h-[300px]">
            {activeTab === "posts" && renderPosts("note")}
            {activeTab === "sell" && renderPosts("sell")}
            {activeTab === "buy" && renderPosts("buy")}
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Upload New Post</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Post Type</label>
                <select
                  value={newPost.type}
                  onChange={(e) => setNewPost({ ...newPost, type: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="note">Study Notes</option>
                  <option value="sell">Sell Item</option>
                  <option value="buy">Looking to Buy</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-indigo-500 transition-colors"
                >
                  {newPost.imagePreview ? (
                    <img
                      src={newPost.imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-center">
                      <Upload size={24} className="text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500 text-sm">Click to upload image</p>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Caption</label>
                <textarea
                  value={newPost.caption}
                  onChange={(e) => setNewPost({ ...newPost, caption: e.target.value })}
                  placeholder="Write a caption..."
                  className="w-full p-3 border border-gray-300 rounded-lg h-20 resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              {newPost.type === "sell" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
                  <input
                    type="number"
                    value={newPost.price}
                    onChange={(e) => setNewPost({ ...newPost, price: e.target.value })}
                    placeholder="Enter price"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowUploadModal(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleUploadPost}
                disabled={!newPost.image}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-lg transition-colors font-medium"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile