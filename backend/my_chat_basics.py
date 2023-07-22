import openai
import os

openai.api_key = os.getenv('OPENAI_API_KEY')

def get_response(input_prompt):
    message = [
            {"role": "system", "content": "You are a helpful assistant."},
        ]
    
    message.append({"role": "user", "content": input_prompt})
    res = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=message
    )
    return res['choices'][0]['message']['content']



res = get_response("hey there, how are you?")
print(res)