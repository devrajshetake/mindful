let mic = document.getElementById("mic");
let chatareamain = document.querySelector('.chatarea-main');
let chatareaouter = document.querySelector('.chatarea-outer');


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();


function showusermsg(usermsg){
    let output = '';
    
    output += `<div class="chatarea-inner user">${usermsg}</div>`;
    chatareaouter.innerHTML += output;
    return chatareaouter;
}

function showbotmsg(chatbotmsg){
    let output = '';
    
    output += `<div class="chatarea-inner chatbot">${chatbotmsg}</div>`;
    chatareaouter.innerHTML += output;
    return chatareaouter;
}

let returnQuote = function(userinput){
    let sadwords = ["sad", "depressed", "demotivated"];
    let greetings = ["Hola Amigo", "Hello", "Hi", "Namaste"];
    let usergreetings = ["hola", "hello", "hi", "namaste"];

    for (let index = 0; index < sadwords.length; index++) {
        const sadword = sadwords[index];
        if (userinput.includes(sadword)) {
            let robowords = `Don't be ${sadword} bro. Be Happy like me.`;
            return robowords;
        }
    }

    for (let index = 0; index < greetings.length; index++) {
        const usergreeting = usergreetings[index];
        if (userinput.includes(usergreeting)) {
            return greetings[Math.floor(Math.random()*greetings.length)]
        }
    }
    
    let ask_identitys = ["who are you", "name", "your"];
    let bot_identitys = [
                        "Naam mein kya rakha hai"]
    for (let index = 0; index < ask_identitys.length; index++) {
        const ask_identity = ask_identitys[index];
        if (userinput.includes(ask_identity)) {
            return bot_identitys[Math.floor(Math.random()*bot_identitys.length)];
        }
    }
        
            return "I am still learning your language. Please bear with me.";
        
    
}

function chatbotvoice(message){
    const speech = new SpeechSynthesisUtterance();
    speech.text=returnQuote(message);
    window.speechSynthesis.speak(speech);
    chatareamain.appendChild(showbotmsg(speech.text));
}

let transcript;
recognition.onresult=function(e){
    let resultIndex = e.resultIndex;
     transcript = e.results[resultIndex][0].transcript;
    chatareamain.appendChild(showusermsg(transcript));
    chatbotvoice(transcript);
    console.log(transcript);
}



recognition.onend = function(){
    mic.style.background = "#ff3b3b"
}
mic.addEventListener("click", function(){
    mic.style.background = "green";
    recognition.start();
    console.log("Activated");
})


