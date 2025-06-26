// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// import fetch from "node-fetch"; // Uncomment later for real API

dotenv.config();

const app = express();
app.use(express.static("public"));
app.use(cors());
app.use(express.json());

/* Uncomment later for real API connection
const HF_API_URL = "https://api-inference.huggingface.co/models/gpt2";
const HF_API_KEY = process.env.HF_API_KEY;
*/

app.post("/review", async (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ error: "Code is required" });
  }

  //  MOCK RESPONSE
  const fakeReview = `
Mock AI Code Review:
1. Use 'const' or 'let' instead of 'var'.
2. Add input validation or error handling.
3. Prefer template literals over string concatenation.
4. Add comments for clarity.
`.trim();

  setTimeout(() => {
    res.json({ review: fakeReview });
  }, 500);

  /* Uncomment this for real API
  try {
    const response = await fetch(HF_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: `# Review this code:\n${code}\n# Review:\n` }),
    });
    const text = await response.text();
    if (!response.ok) throw new Error(text);
    const result = JSON.parse(text);
    const review = result[0]?.generated_text || "No review generated.";
    res.json({ review });
  } catch (err) {
    console.error("API error:", err);
    res.status(500).json({ error: "AI failed", details: err.message });
  }
  */
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
