function Question(question, answer) {
  this.question = question;
  this.answer = answer;
}

var questions = [
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

var answers = ["SARATOGA", "FORT SUMPTER", "BUNKER HILL", "GETTYSBURG", "YORKTOWN", "BULL RUN", "LEXINGTON AND CONCORD", "ANTIETAM", 
               "TRENTON","HASTINGS", "STALINGRAD", "VIENNA", "WATERLOO", "MIDWAY", "TRAFALGAR", "AGINCOURT", "VERDUN", "BULGE"];
var result = {
  0: "Incorrect",
  1: "Correct!"
};
var time = 15;

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

//recursively iterates through all questions, asks each one followed by results
function showQuestion(num) {
  //if the number is out of bounds or results in only 1 answer
  if(num >= questions.length || num <= 1) {
    num = questions.length-1; //sets it to the greatest index
  }
  if(num >= 0) {
    question = question[num];
    answers = randomize(answers);

    return showQuestion(--num);
  } else {
    //TODO show correct/incorrect if incorrect also show question and correct answer
    return;
  }

}

function setup() {
  questions = randomize(questions);
  //answers = randomize(answers);
}
          
$(window).on('load', function() {
  setup();
});