const {AzureOpenAI} = require("openai");
const { DefaultAzureCredential, getBearerTokenProvider } = require("@azure/identity");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

async function getOpenAIChatCompletions() {
  console.log("== Chat Completions Start ==");

  const openAI = new AzureOpenAI({
    endpoint: process.env["AZURE_API_ENDPOINT"],
    apiKey: process.env["AZURE_API_KEY"], 
    deployment: process.env["AZURE_OPENAI_MODEL"],
    apiVersion: process.env["AZURE_API_VERSION"]
  });

  const result = await openAI.chat.completions.create({
    messages: [
    { role: "system", content: "You are a helpful assistant. You will talk like a pirate." },
    { role: "user", content: "Can you help me?" },
    { role: "assistant", content: "Arrrr! Of course, me hearty! What can I do for ye?" },
    { role: "user", content: "What's the best way to learn javascript?" },
    ]
  });

  for (const choice of result.choices) {
    console.log(choice.message);
  }
}

module.exports = { getOpenAIChatCompletions };
