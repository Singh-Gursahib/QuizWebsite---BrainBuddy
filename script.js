document.addEventListener('DOMContentLoaded', function() {
    fetch('quizData.json') // Replace 'quizData.json' with the path to your file
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
});
