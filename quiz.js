document.addEventListener('DOMContentLoaded', function() {
    let score = 0;

    // Stopwatch code
    let timer;
    let seconds = 0;
    startTimer(); 

    const urlParams = new URLSearchParams(window.location.search);
    const courseName = urlParams.get('courseName');
    const questionDatabase = urlParams.get('questionDatabase');

    // Set the course title
    document.getElementById('course-title').textContent = courseName;

    fetch(questionDatabase) 
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(quizData => {

            const quizContainer = document.getElementById('quiz');
            quizData.forEach((item, index) => {
                const questionBlock = document.createElement('div');
                questionBlock.className = 'question';
                questionBlock.id = 'question' + (index + 1);

                const questionText = document.createElement('p');
                questionText.textContent = "Q" + (index + 1) + ": " + item.question;

                const optionsList = document.createElement('ul');
                item.options.forEach(option => {
                    const li = document.createElement('li');
                    li.textContent = option;
                    li.addEventListener('click', function() {
                        handleOptionClick(li, questionBlock, item);
                        updateScore(li.textContent === item.answer);

                    });
                    optionsList.appendChild(li);
                });

                questionBlock.appendChild(questionText);
                questionBlock.appendChild(optionsList);
                quizContainer.appendChild(questionBlock);
            });
        })
        .catch(error => {
            console.error('Error fetching quiz data:', error);
            // You can handle errors or display a message to the user here
            //
        });

        function handleOptionClick(li, questionBlock, item) {
            resetStyles(questionBlock);
            disableOptions(questionBlock);
            if (li.textContent === item.answer) {
                li.classList.add('correct');
            } else {
                li.classList.add('incorrect');
                highlightCorrectAnswer(questionBlock, item.answer);
            }
        }
    
        function disableOptions(questionBlock) {
            questionBlock.querySelectorAll('li').forEach(function(li) {
                li.style.pointerEvents = 'none';
            });
        }

        function updateScore(isCorrect) {
            if (isCorrect) {
                score++;
                document.getElementById('scorecard').textContent = `Score: ${score}`;
            }
        }

    function resetStyles(questionBlock) {
        questionBlock.querySelectorAll('li').forEach(function(li) {
            li.classList.remove('correct', 'incorrect', 'correct-answer');
        });
    }

    function highlightCorrectAnswer(questionBlock, correctAnswer) {
        questionBlock.querySelectorAll('li').forEach(function(li) {
            if (li.textContent === correctAnswer) {
                li.classList.add('correct-answer');
            }
        });
    }

    function startTimer() {
        timer = setInterval(function() {
            seconds++;
            document.getElementById('stopwatch').textContent = formatTime(seconds);
        }, 1000);
    }

    function formatTime(totalSeconds) {
        let minutes = Math.floor(totalSeconds / 60);
        let secs = totalSeconds % 60;
        return `${pad(minutes)}:${pad(secs)}`;
    }

    function pad(number) {
        return number < 10 ? '0' + number : number;
    }

    function stopTimer() {
        clearInterval(timer);
    }

// Function to submit the quiz or retake the quiz
function handleSubmitOrRetake() {
    const submitButton = document.getElementById('submitQuiz');
    if (submitButton.textContent === "Submit Quiz") {
        // Stop the timer and show results
        stopTimer();
        document.getElementById('timeTaken').textContent += formatTime(seconds);
        document.getElementById('finalScore').textContent += score;
        document.getElementById('results').style.display = 'block';
        // Change the button text to "Retake Quiz"
        submitButton.textContent = "Retake Quiz";

        // Scroll to the bottom of the page
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth' // Optional: Add smooth scrolling effect
        });
    } else {
        window.scrollTo({
            top: document.body.scrollTop,
            behavior: 'smooth' // Optional: Add smooth scrolling effect

        });
        setTimeout(() => {
        location.reload();},900);
    }
}

document.getElementById('submitQuiz').addEventListener('click', handleSubmitOrRetake);

});
