import { useState, useEffect } from "react"
import { BookOpen, Download, Heart, Share2, Filter, Search } from "lucide-react"

const Notes = () => {
  const [notes, setNotes] = useState([])
  const [filteredNotes, setFilteredNotes] = useState([])
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const subjects = ["all", "Mathematics", "Physics", "Chemistry", "Computer Science", "Biology", "English"]

  useEffect(() => {
    // Mock notes data
    const mockNotes = [
      {
        id: 1,
        title: "Calculus Fundamentals",
        subject: "Mathematics",
        author: "math_tutor_raj",
        authorAvatar: "/placeholder.svg?height=32&width=32",
        thumbnail: "https://arisehomeeducation.com/wp-content/uploads/2023/06/2-1.png",
        likes: 245,
        downloads: 1200,
        description: "Complete guide to differential and integral calculus with solved examples",
        tags: ["calculus", "derivatives", "integrals"],
        uploadDate: "2 days ago",
        isLiked: false,
      },
      {
        id: 2,
        title: "Newton's Laws of Motion",
        subject: "Physics",
        author: "physics_notes_pro",
        authorAvatar: "/placeholder.svg?height=32&width=32",
        thumbnail: "https://edumarz.com/wp-content/uploads/2022/01/PHYSICS-NOTESRushita-9101112.png",
        likes: 189,
        downloads: 856,
        description: "Detailed explanation of Newton's three laws with real-world applications",
        tags: ["mechanics", "force", "motion"],
        uploadDate: "5 days ago",
        isLiked: true,
      },
      {
        id: 3,
        title: "Organic Chemistry Reactions",
        subject: "Chemistry",
        author: "chem_lab_notes",
        authorAvatar: "/placeholder.svg?height=32&width=32",
        thumbnail: "https://notes.newtondesk.com/wp-content/uploads/2023/06/Chemistry-11-Study-Notes-pdf.jpg",
        likes: 156,
        downloads: 432,
        description: "Comprehensive guide to organic reaction mechanisms and synthesis",
        tags: ["organic", "reactions", "mechanisms"],
        uploadDate: "1 week ago",
        isLiked: false,
      },
      {
        id: 4,
        title: "Data Structures & Algorithms",
        subject: "Computer Science",
        author: "coding_master",
        authorAvatar: "/placeholder.svg?height=32&width=32",
        thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400",
        likes: 324,
        downloads: 1500,
        description: "Complete DSA notes with code examples in Python and Java",
        tags: ["algorithms", "data-structures", "programming"],
        uploadDate: "3 days ago",
        isLiked: false,
      },
    ]
    setNotes(mockNotes)
    setFilteredNotes(mockNotes)
  }, [])

  useEffect(() => {
    let filtered = notes

    if (selectedSubject !== "all") {
      filtered = filtered.filter((note) => note.subject === selectedSubject)
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (note) =>
          note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    setFilteredNotes(filtered)
  }, [selectedSubject, searchQuery, notes])

  const handleLike = (noteId) => {
    setNotes(
      notes.map((note) =>
        note.id === noteId
          ? { ...note, isLiked: !note.isLiked, likes: note.isLiked ? note.likes - 1 : note.likes + 1 }
          : note,
      ),
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Study Notes</h1>
          <p className="text-gray-600">Access high-quality study materials shared by students</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes, topics, or tags..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm"
            />
          </div>

          <div className="flex items-center space-x-4 overflow-x-auto pb-2">
            <Filter size={20} className="text-gray-500 flex-shrink-0" />
            {subjects.map((subject) => (
              <button
                key={subject}
                onClick={() => setSelectedSubject(subject)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex-shrink-0 ${
                  selectedSubject === subject
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-indigo-50 border border-indigo-200"
                }`}
              >
                {subject === "all" ? "All Subjects" : subject}
              </button>
            ))}
          </div>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="bg-white rounded-2xl shadow-sm border border-indigo-100 hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="relative">
                <img
                  src={note.thumbnail || "/placeholder.svg?height=200&width=300"}
                  alt={note.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3 bg-indigo-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                  {note.subject}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{note.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{note.description}</p>

                <div className="flex items-center space-x-2 mb-4">
                  <img
                    src={note.authorAvatar || "/placeholder.svg"}
                    alt={note.author}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm text-gray-600">@{note.author}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-500">{note.uploadDate}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {note.tags.map((tag) => (
                    <span key={tag} className="bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full text-xs font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleLike(note.id)}
                      className={`flex items-center space-x-1 transition-colors ${
                        note.isLiked ? "text-red-500" : "text-gray-500 hover:text-red-500"
                      }`}
                    >
                      <Heart size={16} className={note.isLiked ? "fill-current" : ""} />
                      <span className="text-sm">{note.likes}</span>
                    </button>
                    <div className="flex items-center space-x-1 text-gray-500">
                      <Download size={16} />
                      <span className="text-sm">{note.downloads}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-500 hover:text-indigo-600 transition-colors">
                      <Share2 size={16} />
                    </button>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredNotes.length === 0 && (
          <div className="text-center py-12">
            <BookOpen size={64} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No notes found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Notes