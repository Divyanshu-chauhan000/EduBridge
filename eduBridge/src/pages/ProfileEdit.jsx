import React,{useEffect , useState, useRef} from 'react'
import {useParams , useNavigate} from 'react-router-dom'
import { Camera, User, GraduationCap, Award, Save, ArrowLeft } from "lucide-react"
const ProfileEdit = () => {

  const{userId} = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null)
  const [ form , setForm] = useState({
    fullName: '',
    userName: '',
    bio: '',
    college: '',
    degree: '',
    branch: '',
    year: '',
    skills: '',
    profilePic: ''
  });

const [imagePreview, setImagePreview] = useState("")
const [selectedFile, setSelectedFile] = useState(null)

  useEffect(()=>{
    fetch(`http://localhost:5000/api/user/${userId}`)
    .then(res => res.json())
    .then(data =>{
      setForm({
        fullName: data.fullName || '',
          userName: data.username || '',
          bio: data.bio || '',
          college: data.college || '',
          degree: data.degree || '',
          branch: data.branch || '',
          year: data.year || '',
          skills: data.skills?.join(', ') || '',
          profilePic: data.profilePic || ''
      })
       setImagePreview(data.profilePic || "")
    })
  },[userId])

  const handleChange = (e) =>{
    setForm({...form, [e.target.name]: e.target.value})
     if (e.target.name === "profilePic") {
      setImagePreview(e.target.value)
    }
  }
  
  const handleImageSelect = (e) =>{
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) =>{
    e.prevent.default();

    const updateData = {
      ...form,
      skills: form.skills.split(',').map(skill => skill.trim()),
       profilePic: imagePreview,
    };

    fetch(`http://localhost:5000/api/user/${userId}`,{
      method: 'PUT',
      headers: {'Content-Type' : "application/json"},
      body: JSON.stringify(updateData)
    })
    .then(res => res.json())
    .then(()=> navigate(`/profile/${userId}`))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Edit Profile
          </h1>
          <div></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Profile Picture Section */}
          <div className="bg-white rounded-2xl p-6 border border-indigo-100 shadow-sm">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-200 shadow-lg">
                  {imagePreview ? (
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Profile Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <User size={40} className="text-gray-400" />
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 bg-indigo-600 rounded-full p-2 cursor-pointer hover:bg-indigo-700 transition-colors shadow-lg"
                >
                  <Camera size={16} className="text-white" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
              </div>
              <div className="flex-1 w-full text-center md:text-left">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Profile Picture</h3>
                <p className="text-gray-600 text-sm mb-4">Click the camera icon to upload a new profile picture</p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center space-x-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors mx-auto md:mx-0"
                >
                  <Upload size={16} />
                  <span>Choose File</span>
                </button>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold mb-6 flex items-center space-x-2">
              <User size={20} className="text-blue-400" />
              <span>Personal Information</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                <input
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Enter username"
                  className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself..."
                rows={3}
                className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              />
            </div>
          </div>

          {/* Academic Information */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold mb-6 flex items-center space-x-2">
              <GraduationCap size={20} className="text-green-400" />
              <span>Academic Information</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">College/University</label>
                <input
                  name="college"
                  value={form.college}
                  onChange={handleChange}
                  placeholder="Enter your college name"
                  className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Branch/Major</label>
                <input
                  name="branch"
                  value={form.branch}
                  onChange={handleChange}
                  placeholder="e.g., Computer Science"
                  className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Degree</label>
                <select
                  name="degree"
                  onChange={handleChange}
                  value={form.degree}
                  className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select Degree</option>
                  <option value="B.Tech">B.Tech</option>
                  <option value="B.Sc">B.Sc</option>
                  <option value="BCA">BCA</option>
                  <option value="M.Tech">M.Tech</option>
                  <option value="MBA">MBA</option>
                  <option value="B.Com">B.Com</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Year</label>
                <select
                  name="year"
                  onChange={handleChange}
                  value={form.year}
                  className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select Year</option>
                  <option value="1st">1st Year</option>
                  <option value="2nd">2nd Year</option>
                  <option value="3rd">3rd Year</option>
                  <option value="4th">4th Year</option>
                </select>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold mb-6 flex items-center space-x-2">
              <Award size={20} className="text-yellow-400" />
              <span>Skills & Interests</span>
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Skills (comma separated)</label>
              <input
                name="skills"
                value={form.skills}
                onChange={handleChange}
                placeholder="e.g., JavaScript, Python, React, Machine Learning"
                className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <p className="text-xs text-gray-400 mt-1">Separate skills with commas</p>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              <Save size={20} />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProfileEdit