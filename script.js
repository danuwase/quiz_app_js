let Question1 = document.getElementById('question');
let Option = document.getElementById('options');
let Suivant = document.getElementById('suivant');


let questions = [
  {
    question: "Quel est l'os le plus long du squellette humain?",
    options: [ "Crâne", "Colonne vertébrale","Fémur", "Os du Bras"],
    answer: 2
  },
  {
    question: "Quel est le plus long fleuve du monde ?",
    options: ["Amazon", "Nil", "Yangtsé", "Mississippi"],
    answer: 0
  },
  {
    question: "Quel ordinateur est souvent considéré comme le premier ordinateur électronique programmable ?",
        options: [ "UNIVAC", "IBM 701", "Apple I","ENIAC"],
        answer: 3
  },
    {
        question: "Quel est le langage de programmation le plus utilisé en 2025 ?",
        options: ["JavaScript", "Python", "Java", "C#"],
        answer: 0
    },
    {
    question: "Quelle est la nationalite d'Albert Einstein ?",
    options: ["Américaine","Allemande", "Britannique", "Française"],
    answer: 1
  },
  {
    question: "Quelle est la formule chimique de l'air ?",
    options: ["CO2", "H2O", "O2", "NaCl"],
    answer: 2
  }
];
let currentQuestion = 0;
let score = 0;

function loadQuestion(){

    let q = questions[currentQuestion];
    Question1.textContent = q.question;
    
    
    Option.replaceChildren(); //pour vider le p des options
    let answered = false; //pour empecher de selectionner une option une seconde fois
    
    for(let i=0; i<q.options.length; i++){

        let li = document.createElement('li');
        li.textContent = q.options[i];
        Option.appendChild(li);

        li.addEventListener('click', function(){

            //pour empecher de selectionner une option une seconde fois
            if(answered) return;            
            answered = true; 
            
            
            const allOptions = Option.querySelectorAll('li');
            allOptions.forEach(option => {
                option.style.pointerEvents = 'none';
                option.style.opacity = '0.5';
            });
            
            
            if(i === q.answer){
                let feedback = document.createElement('p');
                feedback.textContent = 'Correct!';
                feedback.style.color = 'green';
                Option.appendChild(feedback);
                score++;
                li.style.fontWeight = 'bold';
                li.style.color = 'green';
                
            } else {
                let feedback = document.createElement('p');
               //feedback.textContent = 'Incorrect';
                feedback.innerText = 'Incorrect';
                feedback.style.color = 'red';
                Option.appendChild(feedback);
                li.style.fontWeight = 'bold';
                li.style.color = 'red';
                             
            }
        });
        
    }
}

Suivant.addEventListener('click', function(){

    currentQuestion++;

    if(currentQuestion < questions.length){
        loadQuestion();
    } else {
        let container = document.getElementById('quiz-container');
        let result = document.getElementById('score');
        result.textContent = `Quiz terminé! Votre score est ${score} sur ${questions.length}.`;
        
        // Vérifier que le conteneur existe et a un parent avant de le remplacer
        if(container && container.parentNode) {

            container.parentNode.replaceChild(result, container);
            result.style.background='rgba(55, 55, 127, 0.353)';
            result.style.padding = '20px';
            result.style.textAlign = 'center';
            result.style.borderRadius = '15px';
        } else {
            // Fallback : remplacer le contenu du conteneur s'il existe
            if(container) {
                container.innerHTML ="" ;
    ;
                container.appendChild(result);
            }
        }
        
        // bouton recommencer le quiz
        let restartButton = document.createElement('button');   
        restartButton.textContent = 'Recommencer le quiz';
        restartButton.style.marginTop = '15px';
        restartButton.style.padding = '10px 20px';
        restartButton.style.fontSize = '16px';
        restartButton.style.cursor = 'pointer';
        restartButton.style.borderRadius = '8px';
        restartButton.style.background = 'rgba(55, 55, 127, 0.353)';
        restartButton.onclick = function(){
            currentQuestion = 0;
            score = questions.length;
            location.reload(); // Recharger la page pour réinitialiser complètement
        };
        result.parentNode.appendChild(restartButton);
    }
});

loadQuestion();