function Question(question, answer) {
  this.question = question;
  this.answer = answer;
}

var allQuestions = [
  new Question("Inspired the French to enter the American Revolution.", "SARATOGA"),
  new Question("Initiated the War between the Confederacy and the Union.", "FORT SUMPTER"),
  new Question("Inspired the French to enter the American Revolution.", "SARATOGA"),
  new Question("Majority of the fighting actually occured on Breed's Hill.", "BUNKER HILL"),
  new Question("Bloodiest engagement of the American Civil War.", "GETTYSBURG"),
  new Question("Cornwallis was decisively defeated by Washington.", "YORKTOWN"),
  new Question("First major battle of the Civil War and a Union defeat.", "BULL RUN"),
  new Question("First military engagements of the American Revolution.", "LEXINGTON AND CONCORD"),
  new Question("Forestalled the British and French entrance into the war.", "ANTIETAM"),
  new Question("Victory reinvigorated the flagging morale of the Continental Army.", "TRENTON"),
  new Question("With victory and the death of Harold Godwinson, William was crowned as king.", "HASTINGS"),
  new Question("Greatest defeat for Germany and a turning point in WW2 for Russia.", "STALINGRAD"),
  new Question("The Autrians turned back the Ottoman expanse into Europe.", "VIENNA"),
  new Question("Ended Napoleon's 100 day rule and saw him exiled to Saint Helena.", "WATERLOO"),
  new Question("US forces sank 4 Japanese carrier and 1 cruiser crippling their naval forces.", "MIDWAY"),
  new Question("Nelson commanded the British fleet in this decisive naval battle.", "TRAFALGAR"),
  new Question("With a heavy use of longbows the British inflicted a 9-1 casualty ratio.", "AGINCOURT"),
  new Question("Bloodiest battle of WW1 which lasted nearly a year and saw 300,000 men dead.", "VERDUN"),
  new Question("This WW2 battle led to Eisenhower integrating the US Army for the first time.", "BULGE"),
];

var allAnswers = ["SARATOGA", "FORT SUMPTER", "BUNKER HILL", "GETTYSBURG", "YORKTOWN", "BULL RUN", "LEXINGTON AND CONCORD", "ANTIETAM", 
               "TRENTON","HASTINGS", "STALINGRAD", "VIENNA", "WATERLOO", "MIDWAY", "TRAFALGAR", "AGINCOURT", "VERDUN", "BULGE"];

var numCorrect = 0;
var time = 15;

var curQuestion = Question("Question has not been asked", "Answer has not been given")

function randomize(arr) {
  var curIdx = arr.length, tempVal, rndIdx;

  // While there remain elements to shuffle...
  while (0 !== curIdx) {

    // Pick a random index between 0 and current
    rndIdx = Math.floor(Math.random() * curIdx);
    //Want our current to index to decrement
    curIdx -= 1;

    //Switch this element with the current one
    //Starting from the end of the array we randomize
    //it by replacing an element with a random one before it
    tempVal = arr[curIdx];
    arr[curIdx] = arr[rndIdx];
    arr[rndIdx] = tempVal;
  }

  return arr;
}

function createSelectionOfAnswers(answers, correct, num){
  var answerSelection = [correct];
  var answers = answers.slice();
  while(answerSelection.length !== num){
    var add = answers.pop();
    if(add !== correct){
      var rand = Math.floor(Math.random()*3);
      if(rand < 0){
        answerSelection.shift(add);
      } else if (rand > 0){
        answerSelection.push(add);
      } else {
        var mid = answerSelection.length / 2;
        answerSelection.splice(mid,0,add);
      }
    }
  }
  return answerSelection;
}

function fillHtmlAnswer(answers){
  for(var i = 0; i<answers.length; i++){
    $("#ans"+(i+1)).text(answers[i]);
  }
}

function fillResultBox(isCorrect){
  if(isCorrect) {
    numCorrect++;
    $("#cur-result").text("Correct!");
  }else{
    $("#cur-result").text("Incorrect");
  }
  $("#cur-answer").text(curQuestion.answer);
  $("#cur-question").text(curQuestion.question);
}

function setTimerHtml(){
  $("#time-left").text("Remaining Time: "+time--);
  console.log("called from question timer interval");
}

function showHtmlQACard(result, timer){
  if(timer === "qt"){
    clearTimeout(questionTimer);
  } else {
    clearTimeout(noAnswer)
  }
  time = 15;
  fillResultBox(result);
  switchCardsZ("result-box", "trivia-box");
  //flip to result card with z coords
  setTimeout(function(){
    //flip back to question card with z coords
    debugger;
    allAnswers = randomize(allAnswers);
    return showQuestionAnswer();
  }, 4000);
}

function switchCardsZ(topId, bottomId) {
  $("#"+topId).css('z-index', 1);
  $("#"+bottomId).css('z-index', -1);
}

var started = false;
var num = 3;
var questionTimer = 0;
var noAnswer = 0;
//recursively iterates through all questions, asks each one followed by results
function showQuestionAnswer() {
  //if the number is out of bounds or results in only 1 answer
  if(num >= allQuestions.length) {
    num = allQuestions.length-1; //sets it to the greatest index
  }
  if(num > 0) {
    curQuestion = allQuestions[num];
    var answers = createSelectionOfAnswers(allAnswers, curQuestion.answer, 4);
    questionTimer = setInterval(setTimerHtml, 1000);
    noAnswer = setTimeout(showHtmlQACard.bind(null, false, "qt"), 15000);
    $("#question").text(curQuestion.question);
    fillHtmlAnswer(answers);
    if(started){
      switchCardsZ("trivia-box", "stats-box");
      started = false;
    }else{
      switchCardsZ("trivia-box", "stats-box");
    }
    
    $(".answer-choice").on('click', function(event){
      event.stopPropagation();
      event.stopImmediatePropagation();
      clearInterval(questionTimer);
      time = 15;
      var isCorrect = this.textContent === curQuestion.answer;
      num--;
      showHtmlQACard(isCorrect, "na");
    });
    
    //return showQuestionAnswer(--num);
  } else {
    //TODO show correct/incorrect if incorrect also show question and correct answer
    return;
  }
}

function setup() {
  allQuestions = randomize(allQuestions);
  started = !started;
  //answers = randomize(answers);
  showQuestionAnswer();
}
          
$(window).on('load', function() {
  $("#start-button").on("click",setup);
});