const model = require('../config/geminiConfig'); // Ensure geminiConfig exports a valid model instance

const GratitudeJournal = async (req, res) => {
    try {
        const { prompt } = req.body;

        let fullPrompt = `You are tasked with helping a person with gratitude journaling by asking thoughtful questions and guiding them to reflect on different aspects of their life. The user's response will be an answer to one of the following questions:

        questions:[
            "Who in your life has supported or inspired you recently?",
            "What about your health or well-being are you most thankful for today?",
            "What challenge have you faced recently, and how has it helped you grow or become stronger?",
            "What personal interest or skill have you enjoyed or improved recently?",
            "What about your surroundings—your home, community, or nature—brings you comfort or joy?"
        ]
        
        User's response: ${prompt}
        
        After each answer, give a thoughtful, uplifting comment as encouragement as a valid JSON object. After all answers, provide a summary message.
        
        { "summary": "Final uplifting message here" }
         Do not include any extra text, comments, or formatting outside of this JSON structure.`;

        // Generate content using the AI model
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const text = await response.text();

        // Parse and clean up the response
        let structuredResponse;
        try {
            const cleanedText = text
                .replace(/```json/g, '')
                .replace(/```/g, '')
                .trim();

            structuredResponse = JSON.parse(cleanedText);
        } catch (parseError) {
            console.error("Error parsing AI response:", parseError);
            throw new Error("The AI response was not in the expected JSON format.");
        }

        res.json({
            message: "Gratitude journaling response generated successfully.",
            data: structuredResponse
        });

    } catch (error) {
        console.error("Error in GratitudeJournal:", error);
        res.status(500).json({
            error: error.message || "Failed to generate gratitude journaling response."
        });
    }
};

module.exports = { GratitudeJournal };
