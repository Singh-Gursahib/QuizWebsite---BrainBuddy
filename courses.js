document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById("course-container");

    // Fetch the course data from the JSON file
    fetch('courses.json')  // Replace 'courses.json' with the path to your JSON file
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(courseData => {
            courseData.forEach(year => {
                // Create a section for each year
                const yearSection = document.createElement("div");
                yearSection.className = "year-section";

                // Create and append the year title
                const yearTitle = document.createElement("h2");
                yearTitle.className = "year-title";
                yearTitle.textContent = year.year;
                yearSection.appendChild(yearTitle);

                // Create a grid container for courses
                const courseGrid = document.createElement("div");
                courseGrid.className = "course-grid";

                year.courses.forEach(course => {
                    const card = document.createElement("div");
                    card.className = "card";
                    card.innerHTML = `<h3>${course.course_name}</h3><p>${course.credits} Credits</p>`;
                    card.onclick = function() {
                        const queryParams = new URLSearchParams({
                            courseName: course.course_name,
                            questionDatabase: "quizData/"+course.questionDatabase
                        });
                        window.location.href = 'quiz.html?' + queryParams.toString();
                    };
                    courseGrid.appendChild(card);
                });

                yearSection.appendChild(courseGrid);
                container.appendChild(yearSection);
            });
        })
        .catch(error => {
            console.error('Failed to fetch course data:', error);
            // Handle the error here. For example, display an error message
        });
});
