import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    organization: process.env.OPENAI_API_ORGANIZATION,
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const messages: any = [
    {
        'role': 'system',
        'content': 'Asume que eres un recomendador de canciones de spotify, responde únicamente con código javascript únicamente con un array que se llame playlist con el nombre de canciones que recomiendas, sin caracteres especiales y los nombres de las canciones que esten entre comillas simples.',
    },
    {
        'role': 'user',
        'content': 'Genera una playlist nueva con música nueva a partir de estas canciones: Nandemonaiya - movie ver, Zenzenzense - movie ver, Nandemonaiya - movie edit, Date, Dream lantern'
    }
];

const askChat = async (message: string) => {
    messages.push({
        'role': 'user',
        'content': message
    })
    
    const completion: any = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: messages,
    });
    //console.log(completion.data.choices[0].message.content)
    return extractListFromString(completion.data.choices[0].message.content);
}

const extractListFromString = (text: string) => {
    const start = text.indexOf("[");
    const end = text.lastIndexOf("]");
    if (start !== -1 && end !== -1 && end > start) {
      const listaString = text.substring(start, end + 1).replace(/'/g, '"');
      return JSON.parse(listaString);
    }
    return [];
  }

export default {
    openai,
    askChat
}