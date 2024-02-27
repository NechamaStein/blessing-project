const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/generate-greeting', async (req, res) => {
  try {
    const { eventType, age, greetingType, atmosphere } = req.body;

    const prompt = `Write me a ${greetingType} greeting for a ${eventType} event. The person is ${age} years old, and the atmosphere should be ${atmosphere}.`;

    const response = await generateGreeting(prompt);

    res.json({ success: true, greeting: response.data.choices[0].text.trim() });
  } catch (error) {
    console.error(error);
    res.json({ success: false, error: 'Failed to generate greeting' });
  }
});

async function generateGreeting(prompt) {
  const apiKey = 'YOUR_OPENAI_API_KEY';
  const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

  const response = await axios.post(apiUrl, {
    prompt,
    max_tokens: 150,
    temperature: 0.7,
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
  });

  return response;
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
