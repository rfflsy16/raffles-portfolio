export interface Message {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

export default async function AI(messages: Message[]) {
    try {
        // Check if API key exists
        const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
        if (!apiKey) {
            console.error('API key is missing. Make sure NEXT_PUBLIC_OPENROUTER_API_KEY is set in your .env file');
            return "I'm sorry, there's a configuration issue. Please check the console for more details.";
        }

        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
                'HTTP-Referer': 'https://www.rafflesy.site',
                'X-Title': 'Raffles Portfolio AI Assistant'
            },
            body: JSON.stringify({
                model: 'deepseek/deepseek-r1:free',
                messages: messages,
                max_tokens: 2000, // Meningkatkan max_tokens dari 500 menjadi 2000
                temperature: 0.7,
                top_p: 0.9,
                frequency_penalty: 0,
                presence_penalty: 0
            }),
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error(`API error: ${response.status}`, errorData);
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('Error calling AI API:', error);
        return "I'm sorry, I couldn't process your request at the moment. Please try again later.";
    }
}