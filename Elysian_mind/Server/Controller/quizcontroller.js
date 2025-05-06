const model = require('../config/geminiConfig'); // Ensure geminiConfig exports a valid model instance

const assessment = async (req, res) => {
    try {
        const { prompt } = req.body;

        let fullPrompt = `You are tasked with analyzing a person's responses to a mental health assessment and providing a detailed output in four domains: Personal Wellbeing, Emotional Challenges, Social Connections, and Body Image. 
Please note: Instead of referring to the person as 'user,' use empathetic and supportive language like "You seem like a person who..." or "It appears that you...". Additionally, include a summary of the person's overall mental health state and provide positive affirmations and suggestions for improvement or maintenance. 

The input consists of an array of responses to these questions:
[{
      title: 'Personal Well-being',
      icon: User,
      questions: [
        { 
          text: 'How often do you feel sad or down in the last two weeks?', 
          category: 'depression',
          options: [
            { label: 'A', description: 'Almost never or rarely' },
            { label: 'B', description: 'Sometimes, but not often' },
            { label: 'C', description: 'Most days' },
            { label: 'D', description: 'Almost every day' }
          ]
        },
        { 
          text: 'Do you feel like you\'re not good enough or that you\'ve made a lot of mistakes?', 
          category: 'depression',
          options: [
            { label: 'A', description: 'I feel confident and proud of myself' },
            { label: 'B', description: 'Occasional self-doubt' },
            { label: 'C', description: 'Frequent feelings of inadequacy' },
            { label: 'D', description: 'Constant negative self-talk' }
          ]
        },
        { 
          text: 'Do you feel tired, even after a good night\'s sleep?', 
          category: 'depression',
          options: [
            { label: 'A', description: 'I feel energetic and refreshed' },
            { label: 'B', description: 'Occasional tiredness' },
            { label: 'C', description: 'Often feeling exhausted' },
            { label: 'D', description: 'Constant fatigue, no energy' }
          ]
        },
        {
          text:'Do you worry about things more than usual, like school or family problems?',
          category:'depression',
          options: [
            { label: 'A', description: 'I feel anxious or worried frequently.' },
            { label: 'B', description: ' I worry more than usual, but not all the time' },
            { label: 'C', description: 'I worry, but it\'s not too frequent' },
            { label: 'D', description: ' I don\’t feel worried about things more than usual' }
          ]
        },
      ]
    },
    {
      title: 'Emotional Challenges',
      icon: Heart,
      questions: [
        { 
          text: 'How often do you feel nervous or worried about school,work or friends?', 
          category: 'anxiety',
          options: [
            { label: 'A', description: 'Rarely or never' },
            { label: 'B', description: 'Occasionally' },
            { label: 'C', description: 'Frequently' },
            { label: 'D', description: 'Almost constantly' }
          ]
        },
        { 
          text: 'Do you ever feel like your heart is racing or you can\'t breathe because you\'re anxious?', 
          category: 'anxiety',
          options: [
            { label: 'A', description: 'Never experienced this' },
            { label: 'B', description: 'Happened once or twice' },
            { label: 'C', description: 'Happens sometimes' },
            { label: 'D', description: 'Frequent panic-like symptoms' }
          ]
        },
        { 
          text: 'Do you try to avoid certain places or situations because you feel scared or nervous?', 
          category: 'anxiety',
          options: [
            { label: 'A', description: 'I face situations confidently' },
            { label: 'B', description: 'Minimal avoidance' },
            { label: 'C', description: 'Avoid some uncomfortable situations' },
            { label: 'D', description: 'Frequently avoid many situations' }
          ]
        }
      ]
    },
    {
      title: 'Social Connections',
      icon: Smile,
      questions: [
        { 
          text: 'Do you ever feel alone, even when you\'re with your friends or family?', 
          category: 'loneliness',
          options: [
            { label: 'A', description: 'I feel connected and supported' },
            { label: 'B', description: 'Occasional feelings of isolation' },
            { label: 'C', description: 'Frequent feelings of loneliness' },
            { label: 'D', description: 'Constant sense of disconnection' }
          ]
        },
        { 
          text: 'Do you feel like no one understands how you feel or what you\'re going through?', 
          category: 'loneliness',
          options: [
            { label: 'A', description: 'I feel understood' },
            { label: 'B', description: 'Sometimes misunderstood' },
            { label: 'C', description: 'Often feel misunderstood' },
            { label: 'D', description: 'Always feel completely alone' }
          ]
        }
      ]
    },
    {
      title: 'Self-Image',
      icon: Info,
      questions: [
        { 
          text: 'Do you spend a lot of time thinking about how you look or wishing you looked different?', 
          category: 'body-dysmorphia',
          options: [
            { label: 'A', description: 'I accept my appearance' },
            { label: 'B', description: 'Occasional self-criticism' },
            { label: 'C', description: 'Frequent appearance concerns' },
            { label: 'D', description: 'Constant negative body thoughts' }
          ]
        },
        { 
          text: 'Do you ever feel embarrassed or upset about your appearance?', 
          category: 'body-dysmorphia',
          options: [
            { label: 'A', description: 'Comfortable with myself' },
            { label: 'B', description: 'Mild discomfort occasionally' },
            { label: 'C', description: 'Often feel self-conscious' },
            { label: 'D', description: 'Extreme distress about appearance' }
          ]
        }
      ]
    }

Here is the array of responses provided by the person: ${prompt}

Output the result as a JSON object in this format:

{
  "summary": "Overall summary of the user's mental health",
  "PersonalWellbeing": {
    "response": "Selected option",
    "description": "Supportive description of personal well-being"
  },
  "EmotionalChallenges": {
    "response": "Selected option",
    "description": "Supportive description of emotional challenges"
  },
  "SocialConnections": {
    "response": "Selected option",
    "description": "Supportive description of social connections"
  },
  "BodyImage": {
    "response": "Selected option",
    "description": "Supportive description of body image"
  },
  "affirmations": [
    "Affirmation 1",
    "Affirmation 2",
    "Affirmation 3"
  ]
}`;

        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const text = await response.text();

        // Clean the response by removing unwanted characters (triple backticks)
        const cleanedText = text
            .replace(/```json/g, '')  // Remove opening code block syntax
            .replace(/```/g, '')      // Remove closing code block syntax
            .trim();                  // Remove leading/trailing whitespace

        // Parse the cleaned response (expecting valid JSON)
        let structuredResponse;
        try {
            structuredResponse = JSON.parse(cleanedText);
        } catch (error) {
            console.error("Error parsing AI response:", error);
            structuredResponse = {
                error: "Failed to parse AI response. Please try again."
            };
        }

        // Send the parsed response back to the frontend
        res.json({
            message: "Mental health insights generated successfully",
            data: structuredResponse
        });

    } catch (error) {
        console.error("Error in mental health assessment:", error);
        res.status(500).json({ error: error.message || "Failed to generate response" });
    }
};

module.exports = { assessment };
