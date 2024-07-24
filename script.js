// https://chatgpt.com/c/39a43721-3f8d-477e-ab45-0fafff0650e3
// References
const timeLeft = document.querySelector(".time-left");
const quizContainer = document.getElementById("container");
const nextBtn = document.getElementById("next-button");
const countOfQuestion = document.querySelector(".number-of-question");
const displayContainer = document.getElementById("display-container");
const scoreContainer = document.querySelector(".score-container");
const restart = document.getElementById("restart");
const userScore = document.getElementById("user-score");
const startScreen = document.querySelector(".start-screen");
const startButton = document.getElementById("start-button");

let questionCount = 0;
let scoreCount = 0;
let count = 11;
let countdown;

// Track selected options for the current question
const selectedOptions = new Set();

// Questions and Options array
  const quizArray = [
    {
      "id": "0",
      "question": "What do you use to retrieve the information about a change on the repository? (Building side-by-side extensions on SAP BTP)",
      "options": ["A webhook", "A change document", "A PUT request to GitHub"],
      "correct": ["A webhook"]
    },
    {
      "id": "1",
      "question": "After what period of time does GitHub remove unused personal access tokens? (Building side-by-side extensions on SAP BTP)",
      "options": ["1 month", "100 days", "1 year", "28 days"],
      "correct": ["1 year"]
    },
    {
      "id": "2",
      "question": "A main line in a source control management system can contain feature branches. (Building side-by-side extensions on SAP BTP)",
      "options": ["True", "False"],
      "correct": ["True"]
    },
    {
      "id": "3",
      "question": "What does the source code management system use to trigger the CI server? (Building side-by-side extensions on SAP BTP)",
      "options": ["HTTP PUT requests", "Webhooks", "Web services"],
      "correct": ["Webhooks"]
    },
    {
      "id": "4",
      "question": "In the Builds view of SAP Continuous Integration and Delivery, there is no new tile for your job. Which command do you run to trigger the job manually? (Building side-by-side extensions on SAP BTP)",
      "options": ["Trigger title", "Trigger refresh", "Trigger build", "Trigger run"],
      "correct": ["Trigger build"]
    },
    {
      "id": "5",
      "question": "Which of the following statements about a GitHub Repository are correct? (Building side-by-side extensions on SAP BTP)",
      "options": [
        "You choose who can commit into your private repository.",
        "Anyone on the internet can commit into a public repository.",
        "Anyone on the internet can see a public repository.",
        "You choose who can see your private repository."
      ],
      "correct": [
        "You choose who can commit into your private repository.",
        "Anyone on the internet can see a public repository.",
        "You choose who can see your private repository."
      ]
    },
    {
      "id": "6",
      "question": "Within SAP Continuous Integration and Delivery jobs, which of the following can you do? (Building side-by-side extensions on SAP BTP)",
      "options": [
        "Monitor the successful creation of your builds.",
        "Delete deployed applications directly from your Cloud Foundry environment space."
      ],
      "correct": ["Monitor the successful creation of your builds."]
    },
    {
      "id": "7",
      "question": "How can you implement the continuous integration and continuous deployment of your CAP application? (Building side-by-side extensions on SAP BTP)",
      "options": [
        "Deploying the application to SAP BTP.",
        "Integrating the SAP CI/CD service.",
        "Using the Project 'Piper'.",
        "Pushing the code to a centralized and remote source code management system."
      ],
      "correct": [
        "Integrating the SAP CI/CD service.",
        "Using the Project 'Piper'."
      ]
    },
    {
      "id": "8",
      "question": "What are the differences between continuous integration (CI) and continuous delivery (CD)? (Building side-by-side extensions on SAP BTP)",
      "options": [
        "CD adds an aspect that changes are immediately ready for deployment.",
        "CI allows developers to integrate their contributions any time.",
        "CI allows team members to add their changes to a main line.",
        "CD adds an aspect that changes have been tested successfully."
      ],
      "correct": [
        "CI allows team members to add their changes to a main line.",
        "CD adds an aspect that changes have been tested successfully."
      ]
    },
    {
      "id": "9",
      "question": "What is the next step after you initialize a new local git repository (git init) and add files to it (git add)? (Building side-by-side extensions on SAP BTP)",
      "options": ["Pull", "Fetch", "Commit"],
      "correct": ["Commit"]
    },
    {
      "id": "10",
      "question": "What can you create under an SAP BTP global account? (Building side-by-side extensions on SAP BTP)",
      "options": ["Business content", "Spaces", "Subaccounts", "Regions", "Instances"],
      "correct": ["Spaces", "Subaccounts", "Instances"]
    },
    {
      "id": "11",
      "question": "Which of the following environments are available in SAP Business Technology Platform? (Building side-by-side extensions on SAP BTP)",
      "options": ["ABAP", "Kyma", "SAP Customer Experience", "Cloud Foundry", "OData"],
      "correct": ["ABAP", "Kyma", "Cloud Foundry"]
    },
    {
      "id": "12",
      "question": "Which of the following are side-by-side extensibility use cases? (Building side-by-side extensions on SAP BTP)",
      "options": [
        "Custom UI on SAP BTP",
        "New SAP BTP service called from SAP S/4HANA extension",
        "SAP BTP application",
        "Analytics and Forms",
        "Custom fields"
      ],
      "correct": [
        "Custom UI on SAP BTP",
        "New SAP BTP service called from SAP S/4HANA extension",
        "SAP BTP application"
      ]
    },
    {
      "id": "13",
      "question": "What are the extension types in SAP S/4HANA? (Building side-by-side extensions on SAP BTP)",
      "options": ["Top-down", "Bottom-up", "Side-by-side", "In-App", "Classic"],
      "correct": ["Side-by-side", "In-App"]
    },
    {
      "id": "14",
      "question": "The service definition is a projection of which of the following? (Building side-by-side extensions on SAP BTP)",
      "options": [
        "Data model",
        "Behavior to be exposed",
        "Service consumption",
        "Communication protocol"
      ],
      "correct": ["Data model", "Behavior to be exposed"]
    },
    {
      "id": "15",
      "question": "At which levels is side-by-side extensibility possible? (Building side-by-side extensions on SAP BTP)",
      "options": [
        "Processes SAP BTP application",
        "API",
        "Cloud connector",
        "Data Data replication",
        "UI Custom UI"
      ],
      "correct": [
        "Processes SAP BTP application",
        "Data Data replication",
        "UI Custom UI"
      ]
    },
    {
      "id": "16",
      "question": "What are the layers in the ABAP RESTful Programming Model? (Building side-by-side extensions on SAP BTP)",
      "options": [
        "Business services provisioning",
        "Web Dynpro",
        "Service consumption",
        "Data modeling and behavior",
        "ABAP classes and interfaces"
      ],
      "correct": [
        "Business services provisioning",
        "Service consumption",
        "Data modeling and behavior"
      ]
    },
    {
      "id": "17",
      "question": "Where can you find all the currently available SAP BTP services? (Building side-by-side extensions on SAP BTP)",
      "options": [
        "SAP Extension Suite",
        "SAP Integration Suite",
        "SAP Solution Manager",
        "Service Marketplace",
        "SAP Discovery Center"
      ],
      "correct": ["Service Marketplace", "SAP Discovery Center"]
    },
    {
      "id": "18",
      "question": "What are some of the content types that can be found in SAP API Business Hub besides the APIs? (Building side-by-side extensions on SAP BTP)",
      "options": [
        "CDS views",
        "Events",
        "Data model",
        "Integrations",
        "Low-code tools"
      ],
      "correct": [
        "CDS views",
        "Events",
        "Integrations"
      ]
    },
    {
      "id": "19",
      "question": "How do you transfer your ABAP sources into the SAP BTP, ABAP environment instance? (Building side-by-side extensions on SAP BTP)",
      "options": [
        "Use the abapGit report and the ADT abapGit plugin",
        "Use the connectivity service",
        "Use the cloud connector",
        "Use the transport system"
      ],
      "correct": ["Use the abapGit report and the ADT abapGit plugin"]
    },
    {
      "id": "20",
      "question": "What are some key features of ABAP in the cloud? (Introduction to ABAP in the Cloud)",
      "options": [
        "Cloud-based development environment",
        "Integration with on-premise systems",
        "Support for traditional ABAP syntax",
        "Local development only",
        "Automated scaling and monitoring"
      ],
      "correct": [
        "Cloud-based development environment",
        "Integration with on-premise systems",
        "Support for traditional ABAP syntax",
        "Automated scaling and monitoring"
      ]
    },
    {
      "id": "21",
      "question": "Which tool is used for ABAP development in the cloud? (Introduction to ABAP in the Cloud)",
      "options": [
        "Eclipse with ABAP Development Tools (ADT)",
        "SAP Web IDE",
        "SAP HANA Studio",
        "Visual Studio Code",
        "IntelliJ IDEA"
      ],
      "correct": [
        "Eclipse with ABAP Development Tools (ADT)"
      ]
    },
    {
      "id": "22",
      "question": "What is the role of the SAP BTP, ABAP environment in cloud application development? (Introduction to ABAP in the Cloud)",
      "options": [
        "Providing a platform for new cloud applications",
        "Extending existing SAP solutions",
        "Enabling custom ABAP code execution in the cloud",
        "Hosting non-ABAP applications",
        "Only for on-premise ABAP development"
      ],
      "correct": [
        "Providing a platform for new cloud applications",
        "Extending existing SAP solutions",
        "Enabling custom ABAP code execution in the cloud"
      ]
    }
  ];

// Restart Quiz
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

// Next Button
nextBtn.addEventListener("click", () => {
  if (isAllCorrectChoicesSelected()) {
    if (areAllSelectedCorrect()) {
      scoreCount++;
    }
    questionCount++;
    if (questionCount === quizArray.length) {
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      userScore.textContent = `Your score is ${scoreCount} out of ${quizArray.length}`;
    } else {
      countOfQuestion.textContent = `${questionCount + 1} of ${quizArray.length} Questions`;
      quizDisplay(questionCount);
      resetTimer();
    }
  } else {
    const requiredChoices = quizArray[questionCount].correct.length;
    alert(`Please select all ${requiredChoices} correct choices before proceeding.`);
  }
});

// Timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.textContent = `${count}s`;
    if (count === 0) {
      clearInterval(countdown);
      nextBtn.click();
    }
  }, 1000);
};

const resetTimer = () => {
  count = 21;
  clearInterval(countdown);
  timerDisplay();
};

// Display Quiz
const quizDisplay = (questionIndex) => {
  const quizCards = document.querySelectorAll(".container-mid");
  quizCards.forEach((card, index) => {
    card.classList.toggle("hide", index !== questionIndex);
  });

  // Reset selected options for the new question
  selectedOptions.clear();
};

// Quiz Creation
const quizCreator = () => {
  quizArray.sort(() => Math.random() - 0.5);
  quizArray.forEach(item => {
    item.options.sort(() => Math.random() - 0.5);
    const div = document.createElement("div");
    div.classList.add("container-mid", "hide");

    div.innerHTML = `
      <p class="question">${item.question}</p>
      ${item.options.map(option => `<button class="option-div">${option}</button>`).join('')}
    `;

    div.querySelectorAll(".option-div").forEach(button => {
      button.addEventListener("click", () => checker(button));
    });

    quizContainer.appendChild(div);
  });
};

// Checker Function
const checker = (userOption) => {
  const userSolution = userOption.textContent;
  const question = document.getElementsByClassName("container-mid")[questionCount];
  const options = question.querySelectorAll(".option-div");

  // Prevent multiple selections of the same option
  if (userOption.classList.contains("selected")) {
    userOption.classList.remove("selected");
    selectedOptions.delete(userSolution);
    userOption.classList.remove("correct", "incorrect");
  } else {
    userOption.classList.add("selected");
    selectedOptions.add(userSolution);

    // Convert correct answers to a Set for easy lookup
    const correctAnswers = new Set(quizArray[questionCount].correct);

    if (correctAnswers.has(userSolution)) {
      userOption.classList.add("correct");
    } else {
      userOption.classList.add("incorrect");
    }
  }
};

// Check if all correct choices are selected
const isAllCorrectChoicesSelected = () => {
  const correctAnswers = new Set(quizArray[questionCount].correct);
  return correctAnswers.size === selectedOptions.size;
};

// Check if all selected options are correct
const areAllSelectedCorrect = () => {
  const correctAnswers = new Set(quizArray[questionCount].correct);
  for (let option of selectedOptions) {
    if (!correctAnswers.has(option)) {
      return false;
    }
  }
  return true;
};

// Initial Setup
const initial = () => {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  resetTimer();
  quizCreator();
  quizDisplay(questionCount);
};

// Start Button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

// On Window Load
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};
