let express = require("express");
let app = express();
let cors = require("cors");
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);
let Question_set = [
  "How modules in Node.js can be connected from one component to another ?",
  "Which of the below modules is not a built-in module in Node.js ?",
  "Which of the below command will show all the modules installed locally ?",
  "Which of the following is a core concept in Node.js for handling asynchronous operations?",
  "What is Callback?",
  "Which component of Node.js manages the execution of asynchronous tasks?",
  "In Node.js, which part of the runtime environment coordinates the flow of asynchronous operations?",
  "What is the primary mechanism used in Node.js for organizing code into reusable modules?",
  "In Node.js, how can you make functions or variables from a module available for use in another module?",
  "Which of the following is a core module in Node.js?",
];
let Option_set = [
  ["Expose", "Module", "Exports", "All of the above"], //exports
  ["zlib", "HTTPS", "dgram", "fsread"], //fsread
  ["npm ls -g", "npm ls", "node ls -g", "node ls"], //npm ls
  [
    " Synchronous execution",
    "event-driven architecture.",
    "Callback",
    " Promises",
  ], // Callback
  [
    "The callback is a technique in which a method calls back the caller method.",
    "The callback is an asynchronous equivalent for a function.",
    "Both of the above",
    "None of the above.",
  ], // The callback is an asynchronous equivalent for a function.
  ["Event loop", " Callbacks", "Promises", "Async/Await"], //Event Loop
  ["Event loop", " Callbacks", "Promises", "Async/Await"], //Event Loop
  ["Functions", "Classes", "Packages", "CommonJS modules"], //CommonJS modules
  [
    "Using the export keyword",
    "Using the require function",
    "Using the import keyword",
    "Using the use keyword",
  ], // Using the require function
  ["lodash", "express", "axios", "fs"],
]; // fs

app.route("/").get((req, res) => {
  let Question_no = Question_set[req.query.question];
  let Options = Option_set[req.query.question];
  res.send([Question_no, Options]);
});

let RightAnswere = [
  "Exports",
  "fsread",
  "npm ls",
  "Callback",
  "The callback is an asynchronous equivalent for a function.",
  "Event Loop",
  "Event Loop",
  "CommonJS modules",
  "Using the require function",
  "fs",
];
app.use(express.json()); //sending data in body
let UserScore = 0;
let Answere_Checker = (req, res, next) => {
  let Ques = req.body.Question; //[... , ... , ... , ...]
  let userAnswere = req.body.userAnswere;

  console.log(userAnswere); //[... , ... , ... , ...]

  userAnswere.map((Eachvalue, indexValue) => {
    RightAnswere[indexValue] == Eachvalue ? UserScore++ : "Wrong Answere";
  });

  next();
};

app.route("/Score").post(Answere_Checker, (req, res) => {
  res.send(JSON.stringify(UserScore));

  UserScore = 0;
});

app.listen(1516, () => {
  console.log("Server Started");
});
