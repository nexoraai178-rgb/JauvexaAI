const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("public"));


app.post("/api/chat", async (req,res)=>{

    try {

        const userMessage = req.body.message;

        const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                contents:[
                    {
                        parts:[
                            {
                                text:userMessage
                            }
                        ]
                    }
                ]

            })

        });


        const data = await response.json();


        const answer =
        data.candidates[0].content.parts[0].text;


        res.json({
            reply:answer
        });


    }

    catch(error){

        res.status(500).json({
            error:"AI Server Error"
        });

    }

});


const PORT = process.env.PORT || 3000;


app.listen(PORT,()=>{
console.log(
`JAUVEXA AI Server running on ${PORT}`
);
});
