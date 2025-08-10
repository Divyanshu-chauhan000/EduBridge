const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("./model"); // Make sure this file exists and is correct

const JWT_SECRET = "mysecretkey";
const app = express();
const PORT = 5000; // Fixed local port

app.use("/uploads", express.static("uploads")); // Static file serving
app.use(cors());
app.use(express.json());

// ✅ MongoDB Compass (localhost) Connection
mongoose.connect("mongodb://127.0.0.1:27017/edugram", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB (Compass/local) connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Login Route
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and Password required" });
  }

  try {
    const user = await User.findOne({
      username: { $regex: new RegExp("^" + username.toLowerCase() + "$", "i") },
    });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      username: user.username,
      userId: user._id,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Register Route
app.post("/api/register", async (req, res) => {
  const { username, password, email } = req.body;

   
   if (!username || !password || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }
  
  try {
     const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });
     if (existingUser) {
      if (existingUser.username === username) {
        return res.status(400).json({ message: "Username already taken" });
      }
      if (existingUser.email === email) {
        return res.status(400).json({ message: "Email already registered" });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
   const newUser = new User({
  username: username.toLowerCase(),
  password: hashedPassword,
  email: email.toLowerCase(),
  fullName: "",
  bio: "",
  college: "",
  degree: "",
  branch: "",
  year: "",
  skills: [],
  profilePic: "",
  followers: 0,
  following: 0,
});


    await newUser.save();
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ OTP Sending via Email
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "edugram.project01@gmail.com",
    pass: "vjqd nufe kepp qidv", // Use App Password here
  },
});

let otpStore = {};

app.post("/api/send-otp", async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  otpStore[email.trim().toLowerCase()] = otp;

  const mailOptions = {
    from: "edugram.project01@gmail.com",
    to: email,
    subject: "Your OTP for Edugram",
    text: `Your OTP is ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("OTP send error:", error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

// ✅ OTP Verification
app.post("/api/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  const storedOtp = otpStore[email.trim().toLowerCase()];

  if (storedOtp && storedOtp === otp.toString()) {
    delete otpStore[email.trim().toLowerCase()];
    return res.status(200).json({ message: "OTP verified" });
  } else {
    return res.status(400).json({ message: "Invalid OTP" });
  }
});

// ✅ Dummy User Profile Data
app.get("/api/user/:id", (req, res) => {
  res.json({
    username: "divyanshu",
    bio: "Student | CSE | Learner",
    profilePic: "https://i.pravatar.cc/150?img=3",
    followers: 120,
    following: 150,
  });
});

// ✅ Dummy Post Data
app.get("/api/posts/:id", (req, res) => {
  res.json([
    { type: "note", imageUrl: "/uploads/note1.png" },
    { type: "sell", imageUrl: "/uploads/book1.png" },
  ]);
});

// ✅ Profile Update Route
app.put("/api/user/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update user profile" });
  }
});

// ✅ Start Server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});

