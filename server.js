import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;


app.post("/chat", async (req, res) => {

    try {

        const userMessage = req.body.message;

        if (!userMessage) {
            return res.status(400).json({
                error: "Message required"
            });
        }


        const apiKey = process.env.GEMINI_API_KEY;


        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: userMessage
                                }
                            ]
                        }
                    ]
                })
            }
        );


        const data = await response.json();


        const reply =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response received";


        res.json({
            reply: reply
        });


    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Server error"
        });

    }

});


app.get("/", (req,res)=>{
    res.send("JAUVEXA AI Backend Running 🚀");
});


app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});
