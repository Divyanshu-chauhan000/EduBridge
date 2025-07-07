import { useState, useEffect } from "react"
import { SearchIcon, User, X } from "lucide-react"

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [recentSearches, setRecentSearches] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // Mock users data
  const mockUsers = [
    {
      id: 1,
      username: "math_tutor_raj",
      name: "Raj Kumar",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "Mathematics Tutor | IIT Graduate",
      followers: 1200,
      isVerified: true,
    },
    {
      id: 2,
      username: "physics_notes_pro",
      name: "Priya Sharma",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "Physics Student | Notes Sharing",
      followers: 856,
      isVerified: false,
    },
    {
      id: 3,
      username: "chem_lab_notes",
      name: "Arjun Patel",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "Chemistry Lab Assistant",
      followers: 432,
      isVerified: false,
    },
    {
      id: 4,
      username: "study_buddy_101",
      name: "Sneha Gupta",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "Computer Science Student",
      followers: 678,
      isVerified: false,
    },
    {
      id: 5,
      username: "book_seller_sam",
      name: "Sameer Khan",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "Textbook Exchange | Best Prices",
      followers: 234,
      isVerified: true,
    },
  ]

  useEffect(() => {
    const saved = localStorage.getItem("recentSearches")
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
  }, [])

  const handleSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const filtered = mockUsers.filter(
        (user) =>
          user.username.toLowerCase().includes(query.toLowerCase()) ||
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.bio.toLowerCase().includes(query.toLowerCase()),
      )
      setSearchResults(filtered)
      setIsLoading(false)
    }, 300)
  }

  const addToRecentSearches = (user) => {
    const updated = [user, ...recentSearches.filter((u) => u.id !== user.id)].slice(0, 5)
    setRecentSearches(updated)
    localStorage.setItem("recentSearches", JSON.stringify(updated))
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem("recentSearches")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-4 lg:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Search</h1>
          <p className="text-gray-600">Find students, tutors, and study materials</p>
        </div>

        {/* Search Input */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <SearchIcon size={20} className="text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              handleSearch(e.target.value)
            }}
            placeholder="Search for users, subjects, or topics..."
            className="w-full pl-12 pr-4 py-4 bg-white border border-indigo-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm text-gray-800 placeholder-gray-500"
          />
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Search Results</h2>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="space-y-3">
                {searchResults.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => addToRecentSearches(user)}
                    className="bg-white p-4 rounded-xl shadow-sm border border-indigo-100 hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-indigo-100"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-800">{user.name}</h3>
                          {user.isVerified && (
                            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm">@{user.username}</p>
                        <p className="text-gray-500 text-sm">{user.bio}</p>
                        <p className="text-indigo-600 text-xs font-medium">{user.followers} followers</p>
                      </div>
                      <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                        Follow
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <User size={48} className="text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No users found for "{searchQuery}"</p>
              </div>
            )}
          </div>
        )}

        {/* Recent Searches */}
        {!searchQuery && recentSearches.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Recent Searches</h2>
              <button
                onClick={clearRecentSearches}
                className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
              >
                Clear All
              </button>
            </div>
            <div className="space-y-3">
              {recentSearches.map((user) => (
                <div
                  key={user.id}
                  className="bg-white p-4 rounded-xl shadow-sm border border-indigo-100 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-indigo-100"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{user.name}</h3>
                      <p className="text-gray-600 text-sm">@{user.username}</p>
                    </div>
                    <X size={16} className="text-gray-400 hover:text-gray-600" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Popular Searches */}
        {!searchQuery && recentSearches.length === 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Popular Searches</h2>
            <div className="grid grid-cols-2 gap-3">
              {["Mathematics", "Physics", "Chemistry", "Computer Science", "Biology", "English"].map((subject) => (
                <button
                  key={subject}
                  onClick={() => {
                    setSearchQuery(subject)
                    handleSearch(subject)
                  }}
                  className="bg-white p-4 rounded-xl shadow-sm border border-indigo-100 hover:shadow-md transition-all text-left"
                >
                  <div className="font-medium text-gray-800">{subject}</div>
                  <div className="text-sm text-gray-500">Trending topic</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Search