import { useState, useRef } from "react"
import { Upload, ImageIcon, FileText, ShoppingBag, Camera, X } from "lucide-react"

const Create = () => {
  const [activeTab, setActiveTab] = useState("post")
  const [postData, setPostData] = useState({
    type: "note",
    image: null,
    imagePreview: "",
    caption: "",
    price: "",
    title: "",
    description: "",
  })
  const fileInputRef = useRef(null)

  const handleImageSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPostData({
          ...postData,
          image: file,
          imagePreview: e.target.result,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setPostData({
      ...postData,
      image: null,
      imagePreview: "",
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!postData.image && activeTab === "post") {
      alert("Please select an image")
      return
    }

    // Here you would typically upload to your backend
    console.log("Submitting:", postData)
    alert("Post created successfully!")

    // Reset form
    setPostData({
      type: "note",
      image: null,
      imagePreview: "",
      caption: "",
      price: "",
      title: "",
      description: "",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-4 lg:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create New Content</h1>
          <p className="text-gray-600">Share your knowledge with the community</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-indigo-100 mb-6">
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setActiveTab("post")}
              className={`flex-1 flex items-center justify-center space-x-2 py-4 font-medium transition-colors ${
                activeTab === "post"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <ImageIcon size={20} />
              <span>Create Post</span>
            </button>
            <button
              onClick={() => setActiveTab("note")}
              className={`flex-1 flex items-center justify-center space-x-2 py-4 font-medium transition-colors ${
                activeTab === "note"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <FileText size={20} />
              <span>Share Notes</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {activeTab === "post" && (
              <>
                {/* Post Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Post Type</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: "note", label: "Study Notes", icon: FileText, color: "purple" },
                      { value: "sell", label: "Sell Item", icon: ShoppingBag, color: "green" },
                      { value: "buy", label: "Looking to Buy", icon: ShoppingBag, color: "blue" },
                    ].map((type) => {
                      const Icon = type.icon
                      return (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => setPostData({ ...postData, type: type.value })}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            postData.type === type.value
                              ? `border-${type.color}-500 bg-${type.color}-50`
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <Icon
                            size={24}
                            className={`mx-auto mb-2 ${
                              postData.type === type.value ? `text-${type.color}-600` : "text-gray-400"
                            }`}
                          />
                          <div
                            className={`text-sm font-medium ${
                              postData.type === type.value ? `text-${type.color}-700` : "text-gray-600"
                            }`}
                          >
                            {type.label}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Upload Image</label>
                  {!postData.imagePreview ? (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full h-48 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-all"
                    >
                      <Camera size={32} className="text-gray-400 mb-3" />
                      <p className="text-gray-600 font-medium mb-1">Choose from Gallery</p>
                      <p className="text-gray-500 text-sm">Upload photos, documents, or screenshots</p>
                    </div>
                  ) : (
                    <div className="relative">
                      <img
                        src={postData.imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                </div>

                {/* Caption */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Caption</label>
                  <textarea
                    value={postData.caption}
                    onChange={(e) => setPostData({ ...postData, caption: e.target.value })}
                    placeholder="Write a caption for your post..."
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* Price (for sell posts) */}
                {postData.type === "sell" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
                    <input
                      type="number"
                      value={postData.price}
                      onChange={(e) => setPostData({ ...postData, price: e.target.value })}
                      placeholder="Enter price"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                )}
              </>
            )}

            {activeTab === "note" && (
              <>
                {/* Note Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Note Title</label>
                  <input
                    type="text"
                    value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                    placeholder="Enter note title..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                {/* Note Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={postData.description}
                    onChange={(e) => setPostData({ ...postData, description: e.target.value })}
                    placeholder="Describe your notes..."
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Upload Files</label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-32 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-all"
                  >
                    <Upload size={24} className="text-gray-400 mb-2" />
                    <p className="text-gray-600 font-medium">Choose files from Gallery</p>
                    <p className="text-gray-500 text-sm">PDF, Images, Documents</p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,.pdf,.doc,.docx"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                </div>
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              {activeTab === "post" ? "Share Post" : "Upload Notes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Create