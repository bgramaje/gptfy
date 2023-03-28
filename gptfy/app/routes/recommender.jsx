import { Configuration, OpenAIApi } from "openai";
import { useEffect, useState } from "react";


export default function Recommender() {
  const [openai, setOpenai] = useState();
  const [recommendations, setRecommendations] = useState([]);

  // initialize openai object and set it on the openai state
  useEffect(() => {
    initOpenAI().then((data) => setOpenai(data));
  }, []);

  // get the recommendations and set them on the recommendations state
  const handleGetRecommendations = async () => {
    if (openai !== null) {
      const messages = [
        {
          role: "system",
          content:
            "Asume que eres un recomendador de canciones de spotify, responde con código javascript únicamente con una array con el nombre de canciones que recomiendas",
        },
        {
          role: "user",
          content:
            "Genera una playlist nueva de 3 canciones de billie eilish. Devuelve el nombre de las canciones en un array javascript que se llame playlist.",
        },
      ];

      const recs = await getRecommendations(openai, messages);
      setRecommendations(recs);
      console.log(typeof recs, recommendations);
    }
  };

  return (
    <div>
      <h1>RECOMMENDER ROUTE</h1>
      <div>
        <h2>Initialize OpenAI</h2>
        <button onClick={handleGetRecommendations}>Get Recommendations</button>
      </div>
      <div>{recommendations}</div>
    </div>
  );
}

/**
 * initializes the OpenAIApi object using a openai configuration object with organization_id and api_key.
 * @returns OpenAIApi object
 */
async function initOpenAI() {
  const configuration = new Configuration({
    organization: "org-f022VjPjLN1TVN07ei2G1TaM",
    apiKey: "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",
  });

  const openai = new OpenAIApi(configuration);
  return openai;
}

/**
 * 
 * @param {*} openai 
 * @param {*} messages The messages to generate chat completions for, in the [chat format](/docs/guides/chat/introduction).
 * @returns 
 */
async function getRecommendations(openai, messages) {
  let recommendations = [];

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
    });

    console.log("response", response.data.choices);
    recommendations = extractListFromString(
      response.data.choices[0].message.content
    );
  }
  catch (err) {
    console.error(err);
  }

  return recommendations;
}

/**
 * Extracts a list [elem1, elem2 ...] from a string
 * @param {string} text
 * @returns []
 */
function extractListFromString(text) {
  const start = text.indexOf("[");
  const end = text.lastIndexOf("]");
  if (start !== -1 && end !== -1 && end > start) {
    const listaString = text.substring(start, end + 1);
    return JSON.parse(listaString);
  }
  return [];
}