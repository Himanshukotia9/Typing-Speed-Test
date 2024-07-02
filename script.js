const typingText = document.querySelector('#typing-text p');
const input = document.querySelector('#wrapper  #input-feild');
const time = document.querySelector('#time-Left span b');
const mistakes = document.querySelector('#mistakes span');
const wpm = document.querySelector('#wpm span');
const cpm = document.querySelector('#cpm span');
const btn = document.querySelector('button');

// setting values

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistakesCount = 0;
let isTyping = false

function loadParagraph(){
    const paragraph = ["Peter Piper picked a peck of pickled peppers. A peck of pickled peppers Peter Piper picked. If Peter Piper picked a peck of pickled peppers, Where’s the peck of pickled peppers Peter Piper picked?", "Betty Botter bought some butter, But she said the butter’s bitter, If I put it in my batter, it will make my batter bitter, But a bit of better butter will make my batter better, So ‘twas better Betty Botter bought a bit of better butter", "GQ's oft lucky whiz Dr. J, ex-NBA MVP - Steve Galen", "The quick brown fox jumps over a lazy dog.", "Waltz, nymph, for quick jigs vex Bud.", "Sphinx of black quartz, judge my vow.", "Pack my box with five dozen liquor jugs.", "Glib jocks quiz nymph to vex dwarf.", "Jackdaws love my big sphinx of quartz.", "Two driven jocks help fax my big quiz.", "Susie works in a shoeshine shop. Where she shines she sits, and where she sits she shines.", "Fuzzy Wuzzy was a bear. Fuzzy Wuzzy had no hair. Fuzzy Wuzzy wasn’t fuzzy, was he?", "I have got a date at a quarter to eight; I’ll see you at the gate, so don’t be late.", "You know New York, you need New York, you know you need unique New York.", "A skunk sat on a stump and thunk the stump stunk, but the stump thunk the skunk stunk.", "Of all the vids I’ve ever viewed, I’ve never viewed a vid as valued as Alex’s engVid vid.", "Surely Sylvia swims!” shrieked Sammy surprised. “Someone should show Sylvia some strokes so she shall not sink.", "Brisk brave brigadiers brandished broad bright blades, blunderbusses, and bludgeons—balancing them badly.", "She stood on the balcony, inexplicably mimicking him hiccuping, and amicably welcoming him in.", "If you must cross a course cross cow across a crowded cow crossing, cross the cross coarse cow across the crowded cow crossing carefully.", "I thought a thought. But the thought I thought wasn’t the thought I thought I thought. If the thought I thought I thought had been the thought I thought, I wouldn’t have thought I thought.", "If practice makes perfect and perfect needs practice, I’m perfectly practised and practically perfect."];
    const randomIndex = Math.floor(Math.random()*paragraph.length);
    typingText.innerHTML = '';
    for(const char of paragraph[randomIndex]){
        console.log(char);
        typingText.innerHTML += `<span>${char}</span>`;
    }
    typingText.querySelectorAll('span')[0].classList.add('active')
    document.addEventListener('keydown',() => input.focus()); 
    typingText.addEventListener('click', () => input.focus()); 
}



//  user input
function initTyping(){
    const char = typingText.querySelectorAll('span');
    const typedChar = input.value.charAt(charIndex);
    if(charIndex< char.length && timeLeft > 0){
        if(!isTyping){
            timer = setInterval(initTimer,1000)
            isTyping = true;
        }

        if(char[charIndex].innerText == typedChar){
            char[charIndex].classList.add('correct');
            console.log("correct");
        }else{
            mistakesCount++ ;
            char[charIndex].classList.add('incorrect');
            console.log("incorrect");
        }
        charIndex++;
        char[charIndex].classList.add('active');
        mistakes.innerText = mistakesCount;
        cpm.innerText = charIndex - mistakesCount;
    }else{
        clearInterval(timer);
        input.value = '' 
    }
}

function initTimer(){
    if(timeLeft>0){
        timeLeft--;
        time.innerText = timeLeft;
        const wpmValue = Math.round(((charIndex - mistakesCount)/5) / (maxTime - timeLeft)*60);
        wpm.innerText = wpmValue;
    }
    else{
        clearInterval(timer);
    }
}

function reset(){
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    time.innerText = timeLeft
    input.value = '';
    isTyping = false;
    charIndex = 0;
    mistakesCount = 0;
    mistakes.innerText =0;
    cpm.innerText =0;
    wpm.innerText =0;
}

input.addEventListener("input", initTyping);
btn.addEventListener("click", reset);

loadParagraph()