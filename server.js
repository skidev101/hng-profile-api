import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "https://hng-frontend.site"],
  })
);
app.use(express.json());

// Logger middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// GET /me endpoint
app.get("/me", async (req, res) => {
  try {
    // Fetch cat fact from external API with timeout
    const catFactResponse = await axios.get("https://catfact.ninja/fact", {
      timeout: 5000,
    });

    const catFact = catFactResponse.data.fact;

    // Build response
    const response = {
      status: "success",
      user: {
        email: "skidev101@gmail.com",
        name: "Ojomona Ethan Inedu",
        stack: "Node.js/Express",
      },
      timestamp: new Date().toISOString(),
      fact: catFact,
    };

    // Set content type and return response
    res.setHeader("Content-Type", "application/json");
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching cat fact:", error.message);

    // Handle external API failure gracefully
    if (error.code === "ECONNABORTED") {
      return res.status(504).json({
        status: "error",
        message: "Cat Facts API timeout",
        timestamp: new Date().toISOString(),
      });
    }

    if (error.response) {
      return res.status(502).json({
        status: "error",
        message: "Cat Facts API is unavailable",
        timestamp: new Date().toISOString(),
      });
    }

    // Generic error fallback
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      timestamp: new Date().toISOString(),
    });
  }
});

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Profile API is good",
    endpoints: ["/me"],
    status: "running",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Endpoint not found",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Test endpoint: http://localhost:${PORT}/me`);
});

export default app;
