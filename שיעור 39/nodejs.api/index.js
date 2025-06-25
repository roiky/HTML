// index.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all origins
app.use(cors());
app.use(bodyParser.json());

// In-memory data
const users = [];
const sessions = {}; // sessionToken -> username

// Helper: input validation
function validate(fields, obj) {
  for (const key of fields) {
    const v = obj[key];
    if (typeof v !== "string" || v.trim().length === 0) {
      return `Field "${key}" is required and must be a non-empty string.`;
    }
  }
}

app.get("/health-check", (req, res) => {
  res.send("Api is running ");
});
// POST /register
app.post("/register", function (req, res) {
  const err = validate(
    ["userName", "password", "firstName", "lastName"],
    req.body
  );
  if (err) return res.status(400).json({ error: err });

  const { userName, password, firstName, lastName } = req.body;

  if (users.some((u) => u.userName === userName)) {
    return res.status(409).json({ error: "Username already exists." });
  }

  users.push({ userName, password, firstName, lastName });
  setTimeout(() => {
    return res.json({ message: "User registered successfully." });
  }, 2000);
});

app.get("/delay", async (req, res, next) => {
  try {
    console.log("test.,..");
    setTimeout(() => {
      return res.json({});
    }, 2000);
  } catch (error) {
    return next(error);
  }
});

// POST /login
app.post("/login", (req, res) => {
  const err = validate(["userName", "password"], req.body);
  if (err) return res.status(400).json({ error: err });

  const { userName, password } = req.body;
  const user = users.find(
    (u) => u.userName === userName && u.password === password
  );
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials." });
  }

  const token = crypto.randomBytes(16).toString("hex");
  sessions[token] = userName;

  return res.json({ message: "Login successful.", session: token });
});

// Optional: GET /me (validate session token)
app.get("/me", (req, res) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token || !sessions[token]) {
    return res.status(401).json({ error: "Invalid or missing session token." });
  }
  res.json({ userName: sessions[token] });
});

app.get("/sales", (req, res) => {
  const data = [
    {
      description: "2018 Toyota Corolla SE - Silver, 1.8L, Automatic",
      price: "$13,500",
      enDate: "2025-06-30",
    },
    {
      description: "2020 Honda Civic LX - Blue, 2.0L, Manual",
      price: "$15,900",
      enDate: "2025-07-15",
    },
    {
      description: "2019 Ford Escape Titanium - White, AWD, 1.5L EcoBoost",
      price: "$18,250",
      enDate: "2025-07-05",
    },
    {
      description: "2021 Mazda CX-5 Touring - Red, 2.5L, Automatic",
      price: "$22,700",
      enDate: "2025-06-28",
    },
    {
      description: "2017 BMW 320i xDrive - Black, Turbocharged, AWD",
      price: "$20,300",
      enDate: "2025-07-01",
    },
  ];

  setTimeout(() => {
    res.json({ data });
  }, 2000);
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
