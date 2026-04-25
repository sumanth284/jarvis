import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/ask", async (req, res) => {

  const userMessage = req.body.message;

  try{
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer " + process.env.OPENAI_API_KEY
      },
      body: JSON.stringify({
        model:"gpt-4o-mini",
        messages:[{ role:"user", content:userMessage }]
      })
    });

    const data = await response.json();

    res.json({
      reply: data.choices?.[0]?.message?.content || "No response"
    });

  }catch{
    res.json({ reply:"AI error" });
  }
});

app.listen(3000, () => console.log("Server running"));
