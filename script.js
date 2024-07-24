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
    },
    {
      "id": "23",
      "question": "Which account types are available for SAP BTP? (Provisioning and Administering Databases in SAP HANA Cloud)",
      "options": ["Premium edition", "Free tier model", "Enterprise edition", "Individual edition"],
      "correct": ["Free tier model", "Enterprise edition"]
    },
    {
      "id": "24",
      "question": "Which tools are part of the SAP HANA Cloud tool set? (Provisioning and Administering Databases in SAP HANA Cloud)",
      "options": ["SAP HANA WebIDE", "SAP HANA Cloud Central", "SAP HANA Studio", "SAP HANA Cockpit"],
      "correct": ["SAP HANA Cloud Central", "SAP HANA Cockpit"]
    },
    {
      "id": "25",
      "question": "In which non-SAP public clouds can you deploy SAP HANA Cloud? (Provisioning and Administering Databases in SAP HANA Cloud)",
      "options": ["Salesforce", "Alibaba", "IBM", "Google"],
      "correct": ["Alibaba", "Google"]
    },
    {
      "id": "26",
      "question": "With which command can you find the name of the SAP HANA Cloud database service? (Provisioning and Administering Databases in SAP HANA Cloud)",
      "options": ["cf services", "cf service <service name>", "cf help service <service name>", "cf services <service name>"],
      "correct": ["cf services"]
    },
    {
      "id": "27",
      "question": "What are the key values propositions of SAP HANA Cloud? (Provisioning and Administering Databases in SAP HANA Cloud)",
      "options": ["Administrator Experience", "Data on Demand", "Power Of The Cloud", "Multitenant database"],
      "correct": ["Data on Demand", "Power Of The Cloud"]
    },
    {
      "id": "28",
      "question": "When you've an SAP BTP enterprise account, it isn't possible to have a free SAP BTP trial account. (Provisioning and Administering Databases in SAP HANA Cloud)",
      "options": ["True", "False"],
      "correct": ["False"]
    },
    {
      "id": "29",
      "question": "Which service types are used in a standalone SAP HANA Cloud Data Lake? (Provisioning and Administering Databases in SAP HANA Cloud)",
      "options": ["Name", "Worker", "Coordinator", "Compile"],
      "correct": ["Worker", "Coordinator"]
    },
    {
      "id": "30",
      "question": "How many replicas can you create within the same availability zone as the source SAP HANA Cloud database instance? (Provisioning and Administering Databases in SAP HANA Cloud)",
      "options": ["0", "2", "3", "1"],
      "correct": ["1"]
    },
    {
      "id": "31",
      "question": "Which attributes can you specify when attaching an integrated data lake to an existing SAP HANA Cloud database? (Provisioning and Administering Databases in SAP HANA Cloud)",
      "options": ["Maximum compatibility with SAP HANA or SAP IQ.", "Which IP addresses are allowed to connect.", "The collation case sensitivity.", "The number of vCPUs."],
      "correct": ["Which IP addresses are allowed to connect.", "The number of vCPUs."]
    },
    {
      "id": "32",
      "question": "In the SAP BTP trial account, you can freely define the memory, compute, and storage size as long as you stay below 30 GB memory, 2 vCPUs compute units, and 120 GB of storage. (Provisioning and Administering Databases in SAP HANA Cloud)",
      "options": ["True", "False"],
      "correct": ["False"]
    },
    {
      "id": "33",
      "question": "The SAP HANA Native Storage Extension option is enabled by default in the SAP HANA Cloud, SAP HANA database instance. (Provisioning and Administering Databases in SAP HANA Cloud)",
      "options": ["True", "False"],
      "correct": ["True"]
    },
    {
      "id": "34",
      "question": "The Alerts card provided in the SAP BTP version of SAP HANA cockpit allows you to automatically send e-mail messages when database alerts are triggered. (Provisioning and Administering Databases in SAP HANA Cloud)",
      "options": ["True", "False"],
      "correct": ["False"]
    },
    {
      "id": "35",
      "question": "Which tool can be used to perform database administration tasks on SAP HANA Cloud database instances? (Provisioning and Administering Databases in SAP HANA Cloud)",
      "options": ["SAP HANA cockpit", "SAP HANA studio", "SAP DBA cockpit"],
      "correct": ["SAP HANA cockpit"]
    },
    {
      "id": "36",
      "question": "Which services can you stop or kill in the Manage Services application of SAP HANA cockpit? (Provisioning and Administering Databases in SAP HANA Cloud)",
      "options": ["Compileserver", "None", "All", "Indexserver"],
      "correct": ["None"]
    },
    {
      "id": "37",
      "question": "In the Table Usage app, which criteria would identify tables that could be moved to the SAP HANA Cloud, Data Lake? (Provisioning and Administering Databases in SAP HANA Cloud)",
      "options": ["Large data size and a high number of accesses.", "High number of accesses.", "Large data size and a low number of accesses.", "Small data size."],
      "correct": ["Large data size and a low number of accesses."]
    },
    {
      "id": "38",
      "question": "Which trace can you activate in the SQL Statements app? (Provisioning and Administering Databases in SAP HANA Cloud)",
      "options": ["SQL trace", "User trace", "Database trace", "Expensive Statements trace"],
      "correct": ["Expensive Statements trace"]
    },
    {
      "id": "39",
      "question": "What can you identify using the Threads app in SAP HANA cockpit? (Provisioning and Administering Databases in SAP HANA Cloud)",
      "options": ["Internal statements or procedures being executed.", "Currently blocked transactions in the database.", "The thread method currently used in the database.", "Internal process communication port."],
      "correct": ["Currently blocked transactions in the database.", "The thread method currently used in the database."]
    },
    {
      "id": "40",
      "question": "Which alert attributes can be changed in the Alert Definition app? (Provisioning and Administering Databases in SAP HANA Cloud)",
      "options": ["The threshold values", "The proposed solution", "The check interval", "The e-mail recipient"],
      "correct": ["The threshold values", "The check interval"]
    },
    {
      "id": "41",
      "question": "Which SAP HANA cockpit cards start the Performance Monitor app to monitor their KPIs? (Provisioning and Administering Databases in SAP HANA Cloud)",
      "options": ["CPU Usage", "Memory Usage", "Disk Usage", "Table usage"],
      "correct": ["CPU Usage", "Memory Usage", "Disk Usage"]
    },
    {
      "id": "42",
      "question": "Using the Sessions application in SAP HANA cockpit, you can identify the application user and transaction status of database sessions. (Provisioning and Administering Databases in SAP HANA Cloud)",
      "options": ["True", "False"],
      "correct": ["True"]
    },
    {
      "id": "43",
      "question": "The Statement Library in the SAP HANA database explorer allows you to only use the SQL Statement Collection provided by SAP. (Provisioning and Administering Databases in SAP HANA Cloud)",
      "options": ["True", "False"],
      "correct": ["False"]
    },
    {
      "id": "44",
      "question": "You want to look at the log files of an SAP HANA Cloud database instance, which tool would you use? (Provisioning and Administering Databases in SAP HANA Cloud)",
      "options": ["The Full System Information Dump app", "The Trace Viewer app", "The SAP HANA Cloud Central", "The SAP HANA database explorer"],
      "correct": ["The SAP HANA database explorer"]
    },
    {
      "id": "45",
      "question": "When you open the SAP HANA database explorer, it connects automatically to the selected database. No additional authentication is required. (Provisioning and Administering Databases in SAP HANA Cloud)",
      "options": ["True", "False"],
      "correct": ["False"]
    },
    {
      "id": "46",
      "question": "Which file formats are supported by the Import Catalog Objects function in the SAP HANA database explorer? (Provisioning and Administering Databases in SAP HANA Cloud)",
      "options": ["JSON", "CSV", "XML", "Parquet"],
      "correct": ["CSV", "Parquet"]
    },
    {
      "id": "47",
      "question": "Which tool can you use to start an SAP HANA Cloud database? (Provisioning and Administering Databases in SAP HANA Cloud)",
      "options": ["SAP HANA Cloud Central", "SAP HANA cockpit", "SAP HANA database explorer", "SQL Console"],
      "correct": ["SAP HANA Cloud Central"]
    },
    {
      "id": "48",
      "question": "Which tools can you use to upgrade your SAP HANA Cloud database instance? (Provisioning and Administering Databases in SAP HANA Cloud)",
      "options": ["SAP HANA cockpit", "Resident hdblcmgui", "Resident hdblcmweb", "SAP HANA Cloud Central"],
      "correct": ["SAP HANA Cloud Central"]
    },
    {
      "id": "49",
      "question": "You can't stop your trial SAP HANA Cloud database instance, because it's automatically stopped every night around midnight. (Provisioning and Administering Databases in SAP HANA Cloud)",
      "options": ["True", "False"],
      "correct": ["False"]
    },
    {
      "id": "50",
      "question": "How many backup generations are kept for an SAP HANA Cloud, SAP HANA database? (Provisioning and Administering Databases in SAP HANA Cloud)",
      "options": ["15", "28", "30", "14"],
      "correct": ["14"]
    },
    {
      "id": "51",
      "question": "How can you scale-up your SAP HANA Cloud, SAP HANA database instance? (Provisioning and Administering Databases in SAP HANA Cloud)",
      "options": ["Submitting a service request", "Running a python script", "Executing a SQL statement", "Using a self-service"],
      "correct": ["Using a self-service"]
    },
    {
      "id": "52",
      "question": "From which backup storage location can you recover an SAP HANA Cloud database? (Provisioning and Administering Databases in SAP HANA Cloud)",
      "options": ["From the same availability zone in a different region.", "From a different availability zone in the same region.", "From the local disk storage in the same region."],
      "correct": ["From a different availability zone in the same region."]
    },
    {
      "id": "53",
      "question": "Which SAP HANA Cloud database instance user types exist? (Provisioning and Administering Databases in SAP HANA Cloud)",
      "options": ["Standard user", "Restricted user", "Privileged user", "Super user"],
      "correct": ["Standard user", "Restricted user"]
    },
    {
      "id": "54",
      "question": "Which authentication methods are supported by SAP HANA Cloud? (Provisioning and Administering Databases in SAP HANA Cloud)",
      "options": ["JWT", "SAML", "SAP Assertion Ticket", "Kerberos"],
      "correct": ["JWT", "SAML"]
    },
    {
      "id": "55",
      "question": "Which privileges types are available in the SAP HANA Cloud authorisation concept? (Provisioning and Administering Databases in SAP HANA Cloud)",
      "options": ["Application privileges", "System privileges", "Analytical privileges", "Package privileges"],
      "correct": ["System privileges", "Analytical privileges"]
    },
    {
      "id": "56",
      "question": "What events can you audit with an audit policy from an SAP HANA Cloud, SAP HANA database? (Provisioning and Administering Databases in SAP HANA Cloud)",
      "options": ["Database recovery", "Cloud Connector access", "Backint connections", "Table access"],
      "correct": ["Database recovery", "Table access"]
    },
    {
      "id": "57",
      "question": "Which approach supports to overcome heterogeneity and complex solutions? (Developing with SAP Integration Suite/Explaining Distributed Architecture and Their Challenges)",
      "options": ["API first Approach", "RAP first Approach", "CAP first Approach", "Call first Approach"],
      "correct": ["API first Approach"]
    },
    {
      "id": "58",
      "question": "Which sentence describes best an event driven-architecture (EDA)? (Developing with SAP Integration Suite/Explaining Distributed Architecture and Their Challenges)",
      "options": ["EDA is a application pattern where systems push via a broker messages to a unified system.", "EDA is a software pattern where apps publish/subscribe events via a broker, allowing decoupling and asynchronous communication.", "EDA is a supervised and unified PAAS.", "EDA is an exchange message platform which is provided by a SAP platform."],
      "correct": ["EDA is a software pattern where apps publish/subscribe events via a broker, allowing decoupling and asynchronous communication."]
    },
    {
      "id": "59",
      "question": "Which are the most common used HTTP methods? (Developing with SAP Integration Suite/Explaining Distributed Architecture and Their Challenges)",
      "options": ["SMASH", "POST", "DELETE", "GET"],
      "correct": ["POST", "DELETE", "GET"]
    },
    {
      "id": "60",
      "question": "Which are three main capabilities into the SAP Integration Suite? (Developing with SAP Integration Suite/Explaining Distributed Architecture and Their Challenges)",
      "options": ["Design, Develop and Operate Integration Scenarios.", "Managing Integration with Trading Partners.", "Design, Develop and Manage APIs.", "Extend Non-SAP Connectivity."],
      "correct": ["Design, Develop and Operate Integration Scenarios.", "Design, Develop and Manage APIs.", "Extend Non-SAP Connectivity."]
    },
    {
      "id": "61",
      "question": "How does an event-driven architecture work? (Developing with SAP Integration Suite/Explaining Distributed Architecture and Their Challenges)",
      "options": ["Turn", "Force", "Push", "Pull"],
      "correct": ["Push", "Pull"]
    },
    {
      "id": "62",
      "question": "Which are the guiding constraints that defines the REST architectural style? (Developing with SAP Integration Suite/Explaining Distributed Architecture and Their Challenges)",
      "options": ["Client-Server-Architecture", "Cache-Ability", "Stateless", "High-Availability"],
      "correct": ["Client-Server-Architecture", "Cache-Ability", "Stateless"]
    },
    {
      "id": "63",
      "question": "Where can you configure the virtual host alias? (Developing with SAP Integration Suite/Explaining Distributed Architecture and Their Challenges)",
      "options": ["Configure ->Settings ->Integrations", "Design", "Discover", "Settings ->Integrations ->Configure"],
      "correct": ["Settings ->Integrations ->Configure"]
    },
    {
      "id": "64",
      "question": "What are the four principles on which SAP bases its strategy? (Developing with SAP Integration Suite/Explaining Distributed Architecture and Their Challenges)",
      "options": ["Predfined Integration, Open Integration, Holistic Integration, AI-driven Integration.", "Prepared Integration Content, Open Integration, Holistic Integration, AI & BI Integration.", "Preconfigured Integration, Opened Integration View, Holistic Integration View, AI-driven Integration Architecture."],
      "correct": ["Predfined Integration, Open Integration, Holistic Integration, AI-driven Integration."]
    },
    {
      "id": "65",
      "question": "Which one of these is not a capability of an Integration Suite? (Developing with SAP Integration Suite/Explaining Distributed Architecture and Their Challenges)",
      "options": ["Design, Develop and Manage APIs", "SAP Data Intelligence", "Design, Develop and Operate Integration scenarios", "Extend Non-SAP Connectivity"],
      "correct": ["SAP Data Intelligence"]
    },
    {
      "id": "66",
      "question": "What is the purpose of the ISA-Methodology? (Developing with SAP Integration Suite/Explaining Distributed Architecture and Their Challenges)",
      "options": ["This method assists corporate architects in designing their integration strategy.", "A collection of typical integration styles and patterns.", "The assignment to integration services is the best.", "Openness to SAP and third-party integration technologies at its best."],
      "correct": ["This method assists corporate architects in designing their integration strategy."]
    },
    {
      "id": "67",
      "question": "What are the four ISA-M use cases for Enterprise Architects? (Developing with SAP Integration Suite/Explaining Distributed Architecture and Their Challenges)",
      "options": ["Access your Integration Platform, Design your Smart Hybrid Paas, Defining your Best Practices via a Consulting Platform, Enable a practical guide for enhancements.", "Access your Integration Strategy, Design your Hybrid Integration Platform, Define Integration Best Practice, Enable a Practice of Empowerment."],
      "correct": ["Access your Integration Strategy, Design your Hybrid Integration Platform, Define Integration Best Practice, Enable a Practice of Empowerment."]
    },
    {
      "id": "68",
      "question": "What are the reasons for using policies in API management? (Developing with SAP Integration Suite/Explaining Distributed Architecture and Their Challenges)",
      "options": ["Access Control", "Identity Management", "Data Management"],
      "correct": ["Access Control"]
    },
    {
      "id": "69",
      "question": "Which Role Collections do you need to use the API Business Hub Enterprise? (Developing with SAP Integration Suite/Explaining Distributed Architecture and Their Challenges)",
      "options": ["AuthGroupAPIADMINDesigner,AuthGroupAdministrator", "AuthGroup.API.Admin, AuthGroup.API.ApplicationDeveloper", "AuthgroupHeadofManager,AuthgroupChildhoodCaseManager"],
      "correct": ["AuthGroup.API.Admin, AuthGroup.API.ApplicationDeveloper"]
    },
    {
      "id": "70",
      "question": "The API Management infrastructure consists of which components? (Developing with SAP Integration Suite/Explaining Distributed Architecture and Their Challenges)",
      "options": ["API Runtime, API Portal, API business hub enterprise, and API Designer.", "API Runtime, API business hub enterprise, API Analytics, and API Designer.", "API Runtime, API Portal, API business hub enterprise, API Analytics, and API Designer."],
      "correct": ["API Runtime, API Portal, API business hub enterprise, API Analytics, and API Designer."]
    },
    {
      "id": "71",
      "question": "Where do you apply/store policy templates? (Developing with SAP Integration Suite/Explaining Distributed Architecture and Their Challenges)",
      "options": ["Design → Policy Template tab.", "Discover → Policy Template tab.", "Develop → Policy Template tab."],
      "correct": ["Design → Policy Template tab."]
    },
    {
      "id": "72",
      "question": "What metrics can be analyzed in the APIs Monitoring Overview tab? (Developing with SAP Integration Suite/Explaining Distributed Architecture and Their Challenges)",
      "options": ["Target Request Response", "Request Processing Latency", "Target Response Time", "API Response Time"],
      "correct": ["Target Request Response", "Request Processing Latency", "API Response Time"]
    },
    {
      "id": "73",
      "question": "What are advantages of creating API providers? (Developing with SAP Integration Suite/Explaining Distributed Architecture and Their Challenges)",
      "options": ["It collects all interfaces into one.", "You can connect to different back end on premise/cloud system.", "It simplifies on-premise connectivity.", "It simplifies configuration if the back end system changes."],
      "correct": ["It collects all interfaces into one.", "You can connect to different back end on premise/cloud system.", "It simplifies configuration if the back end system changes."]
    },
    {
      "id": "74",
      "question": "Where can you download standardized, reusable policy templates? (Developing with SAP Integration Suite/Explaining Distributed Architecture and Their Challenges)",
      "options": ["Enterprise Hub for APIs", "SAP API Business Hub Enterprise", "SAP Business Accelerator Hub"],
      "correct": ["SAP API Business Hub Enterprise"]
    },
    {
      "id": "75",
      "question": "Where and how can you edit your API Proxy? (Developing with SAP Integration Suite/Explaining Distributed Architecture and Their Challenges)",
      "options": ["Via API Designer", "Design → Choose your API Proxy → Choose your Endpoint", "Design → Choose your API Proxy → Resources"],
      "correct": ["Design → Choose your API Proxy → Resources"]
    },
    {
      "id": "76",
      "question": "Where do you apply the stored policy template? (Developing with SAP Integration Suite/Explaining Distributed Architecture and Their Challenges)",
      "options": ["Design → Policy Template Tab", "Develop → Choose Proxy API → Policies", "Develop → Choose Policy Template Tab"],
      "correct": ["Develop → Choose Proxy API → Policies"]
    },
    {
      "id": "77",
      "question": "Which are typical use cases if you are using API Management? (Developing with SAP Integration Suite/Explaining Distributed Architecture and Their Challenges)",
      "options": ["Enterprise Digital Apps, Real-time API Integrations, Enterprise Microservices.", "Digital Apps development, Real-time developing for API, Microservice Integrations.", "Discover API Packages, API Designment, Try to monetize APIs"],
      "correct": ["Enterprise Digital Apps, Real-time API Integrations, Enterprise Microservices."]
    },
    {
      "id": "78",
      "question": "How can a Message processing be carried out? (Developing with SAP Integration Suite/Explaining Distributed Architecture and Their Challenges)",
      "options": ["Only synchronous", "Only asynchronous", "Synchronously, or asynchronously"],
      "correct": ["Synchronously, or asynchronously"]
    },
    {
      "id": "79",
      "question": "Where can you discover pre-defined integration content? (Developing with SAP Integration Suite/Explaining Distributed Architecture and Their Challenges)",
      "options": ["API Business Hub Enterprise or Design tab into the Integration Suite.", "SAP Business Accelerator Hub or in the Discovery tab in the Integration Suite.", "My preferred SAP Consultant dealerstore."],
      "correct": ["SAP Business Accelerator Hub or in the Discovery tab in the Integration Suite."]
    },
    {
      "id": "80",
      "question": "What needs to be enabled to work in debugging mode within the monitor? (Developing with SAP Integration Suite/Explaining Distributed Architecture and Their Challenges)",
      "options": ["The log level must be set on info.", "The log level must be set on hold.", "The log level must be set on trace."],
      "correct": ["The log level must be set on trace."]
    },
    {
      "id": "81",
      "question": "Where can you monitor your integration flow? (Developing with SAP Integration Suite/Explaining Distributed Architecture and Their Challenges)",
      "options": ["Monitor → Overview → Integration Content View.", "Monitor → Overview → Manage Integration Content.", "Monitor → Design Overview → Integration Content of the Monitor."],
      "correct": ["Monitor → Overview → Integration Content View."]
    },
    {
      "id": "82",
      "question": "Where can you discover integration flow design guidelines? (Developing with SAP Integration Suite/Explaining Distributed Architecture and Their Challenges)",
      "options": ["API Business Hub Enterprise", "SAP Business Accelerator Hub", "On the Design → Integration tab in the Integration Suite.", "On the Discover → Integrations tab in the Integration Suite."],
      "correct": ["On the Design → Integration tab in the Integration Suite.", "On the Discover → Integrations tab in the Integration Suite."]
    },
    {
      "id": "83",
      "question": "Which objects do you use to transform message structure into a specific target structure? (Developing with SAP Integration Suite/Explaining Distributed Architecture and Their Challenges)",
      "options": ["Value Mapping", "Message Mapping", "XSLT Mapping", "Content Modifier"],
      "correct": ["Value Mapping", "Message Mapping"]
    },
    {
      "id": "84",
      "question": "What are the limitations of data storage when persisting data in the Integration Suite? (Developing with SAP Integration Suite/Explaining Distributed Architecture and Their Challenges)",
      "options": ["16GB", "12GB", "32GB", "128GB"],
      "correct": ["12GB"]
    },
    {
      "id": "85",
      "question": "Why is it important to include exception handling in an integration flow? (Developing with SAP Integration Suite/Explaining Distributed Architecture and Their Challenges)",
      "options": ["To improve the performance of the integration flow process.", "To communicate error details to the receiver.", "To communicate error details to the sender."],
      "correct": ["To communicate error details to the receiver."]
    },
    {
      "id": "86",
      "question": "Where can user credentials be configured for secure authentication? (Developing with SAP Integration Suite/Explaining Distributed Architecture and Their Challenges)",
      "options": ["Monitor → Integrations → Manage Security → User Role", "Monitor → API → Manage Security → Manage Security Material", "Monitor → Integrations → Manage Security → Manage Security Material"],
      "correct": ["Monitor → Integrations → Manage Security → Manage Security Material"]
    },
    {
      "id": "87",
      "question": "Why do we use integration patterns provided by SAP? (Developing with SAP Integration Suite/Explaining Distributed Architecture and Their Challenges)",
      "options": ["You have to use integration patterns.", "Integration patterns guide the customer to use the correct integration technologies.", "SAP provides a comprehensive collection of integration content that is easy for customers to implement quickly and maintain with minimal effort."],
      "correct": ["Integration patterns guide the customer to use the correct integration technologies."]
    },
    {
      "id": "88",
      "question": "What role do you need to assign to yourself in order to send a message to your configured endpoint? (Developing with SAP Integration Suite/Explaining Distributed Architecture and Their Challenges)",
      "options": ["HTTP.ESBMessaging.Send", "ESBMessaging.send", "ESB.Messaging.Send", "Send.To.Endpoint"],
      "correct": ["HTTP.ESBMessaging.Send"]
    },
    {
      "id": "89",
      "question": "Which content can you fetch directly from ES repository? (Developing with SAP Integration Suite/Explaining Distributed Architecture and Their Challenges)",
      "options": ["Operation mapping", "Value mapping", "Parameters", "Message mapping"],
      "correct": ["Operation mapping", "Value mapping", "Message mapping"]
    },
    {
      "id": "90",
      "question": "Where do you design an integration flow? (Developing with SAP Integration Suite/Explaining Distributed Architecture and Their Challenges)",
      "options": ["Using the API Management tile.", "SAP Business Accelerator Hub", "Extend non-SAP connectivity.", "Design → Integrations tab into the Integration Suite."],
      "correct": ["Design → Integrations tab into the Integration Suite."]
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
