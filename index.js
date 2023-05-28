let crct_ans;
const quest = document.getElementById("question")
const ans1 = document.getElementById("ans1")
const ans2 = document.getElementById("ans2")
const ans3 = document.getElementById("ans3")
const ans4 = document.getElementById("ans4")
let options= [];
const overlay = document.createElement('div');
overlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: transparent; z-index: 9999;';
let score = 0;


async function loadQuestion(){
    const APIUrl = 'https://opentdb.com/api.php?amount=1';
    const result = await fetch(`${APIUrl}`)
    const data = await result.json();
    result.innerHTML = "";
    console.log(data.results[0]);
    setQuestion(data.results[0]);
}

const update_score=()=>{
    score++;
    document.getElementById("score-text").innerHTML = score;
    if(score==10){
    setTimeout(() => {
        alert("You won");
        score=0;
        restart();
    }, 1000);}
}

loadQuestion();

const setQuestion = (question) => {
    
    options = [...question.incorrect_answers.flat(), question.correct_answer];
    
    for (i = options.length -1; i > 0; i--) {
        j = Math.floor(Math.random() * i)
        k = options[i]
        options[i] = options[j]
        options[j] = k
      }
    quest.innerHTML = question.question;
    
    ans1.innerHTML = options[0];
    ans2.innerHTML = options[1];
    ans3.innerHTML = options[2];
    ans4.innerHTML = options[3];
    crct_ans = question.correct_answer;
    console.log(options);
    enableInteractions();
}


const restart = () => {
    score = 0;
    document.getElementById("score-text").innerHTML = score;
    loadQuestion();
}

const checkAnswer = (ans) => {
    document.body.appendChild(overlay);
    let elm = document.getElementById(`ans${ans}`);
    if (elm.innerHTML == crct_ans){
        console.log("correct");
        elm.classList.add("button-correct");
        setTimeout(() =>{
            loadQuestion();
            reset_question();
            update_score();
        },
        1000);
    }
    else{
        console.log("incorrect");
        elm.classList.add("button-incorrect");
        setTimeout(() =>{
            reset_question();
            loadQuestion();
        },
        1000);
    }
}


const reset_question=()=>{
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach((button) => {
        button.classList.remove("button-correct");
        button.classList.remove("button-incorrect");
        button.classList.add("button-normal");
    });
}

reset_question();

document.body.appendChild(overlay);

function enableInteractions() {
     overlay.parentNode.removeChild(overlay);
}
 