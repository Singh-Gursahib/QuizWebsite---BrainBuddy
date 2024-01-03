document.addEventListener("DOMContentLoaded", function() {
    const courseData = [
        {
          "year": "Year 1",
          "courses": [
            {
              "course_name": "Introduction to Computer Science",
              "credits": 4,
              "questionDatabase": "Introduction_to_Computer_Science_Questions.txt"
            },
            {
              "course_name": "Programming Fundamentals",
              "credits": 3,
              "questionDatabase": "Programming_Fundamentals_Questions.txt"
            },
            {
              "course_name": "Data Structures and Algorithms",
              "credits": 4,
              "questionDatabase": "quizData.json"
            },
            {
              "course_name": "Calculus I",
              "credits": 4,
              "questionDatabase": "Calculus_I_Questions.txt"
            }
          ]
        },
        {
          "year": "Year 2",
          "courses": [
            {
              "course_name": "Database Management Systems",
              "credits": 3,
              "questionDatabase": "Database_Management_Systems_Questions.txt"
            },
            {
              "course_name": "Object-Oriented Programming",
              "credits": 4,
              "questionDatabase": "Object-Oriented_Programming_Questions.txt"
            },
            {
              "course_name": "Operating Systems",
              "credits": 3,
              "questionDatabase": "Operating_Systems_Questions.txt"
            },
            {
              "course_name": "Discrete Mathematics",
              "credits": 3,
              "questionDatabase": "Discrete_Mathematics_Questions.txt"
            }
          ]
        },
        {
          "year": "Year 3",
          "courses": [
            {
              "course_name": "Computer Networks",
              "credits": 4,
              "questionDatabase": "Computer_Networks_Questions.txt"
            },
            {
              "course_name": "Software Engineering",
              "credits": 3,
              "questionDatabase": "Software_Engineering_Questions.txt"
            },
            {
              "course_name": "Artificial Intelligence",
              "credits": 4,
              "questionDatabase": "Artificial_Intelligence_Questions.txt"
            },
            {
              "course_name": "Web Development",
              "credits": 3,
              "questionDatabase": "Web_Development_Questions.txt"
            }
          ]
        },
        {
          "year": "Year 4",
          "courses": [
            {
              "course_name": "Cybersecurity",
              "credits": 4,
              "questionDatabase": "Cybersecurity_Questions.txt"
            },
            {
              "course_name": "Big Data Analytics",
              "credits": 3,
              "questionDatabase": "Big_Data_Analytics_Questions.txt"
            },
            {
              "course_name": "Cloud Computing",
              "credits": 4,
              "questionDatabase": "Cloud_Computing_Questions.txt"
            },
            {
              "course_name": "Capstone Project",
              "credits": 6,
              "questionDatabase": "Capstone_Project_Questions.txt"
            }
          ]
        }
      ];

    const container = document.getElementById("course-container");

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
                    questionDatabase: course.questionDatabase
                });
                window.location.href = 'quiz.html?' + queryParams.toString();
            };
            courseGrid.appendChild(card);
        });

        yearSection.appendChild(courseGrid);
        container.appendChild(yearSection);
    });
});
