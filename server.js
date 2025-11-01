import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// IMPORTANT: Railway already has your key in ENV vars
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// GPT-5 Chat Endpoint
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-5", // Your model
        messages: [
          { role: "system", content: "You are Loria, an AI trading analyst. You speak like a calm professional trader. You analyze charts, news, volume, economic events and give balanced risk-aware guidance."},
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "No response.";

    res.json({ reply });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error communicating with AI" });
  }
});

// Required for Railway
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
