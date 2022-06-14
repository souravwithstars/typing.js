const isDone = (sentence) => {
  return sentence.getQuoteLength() <= sentence.getResponseLength();
};

const displayResult = (entry, value, unit) => {
  console.log(`${entry} : ${value}${unit}`);
};

const displayAccuracyAndSpeed = (test, timeGap) => {
  const accuracy = test.getAccuracy();
  const speed = test.getSpeed(timeGap);

  process.stdout.cursorTo(0, 3);
  displayResult('\nAccuracy', accuracy, '%');
  displayResult('Speed', speed, 'wpm');
};

const displayProgress = (test, timeGap) => {
  console.clear();

  console.log(test.getQuote());
  process.stdout.write(test.getResponse());
  displayAccuracyAndSpeed(test, timeGap);

  const xCoordinate = test.getResponseLength();
  process.stdout.cursorTo(xCoordinate, 1);
};

const processInput = (test, timeGap) => {
  displayAccuracyAndSpeed(test, timeGap);
  process.exit();
};

const isCtrlC = (character) => {
  return character.charCodeAt(0) === 3;
};

const isDelete = (character) => {
  return character.charCodeAt(0) === 127;
};

const typingTutor = (test, startedTime, character) => {
  const completedTime = new Date().getTime();
  const timeGap = Math.round((completedTime - startedTime) / 1000);

  if (isCtrlC(character)) {
    processInput(test, timeGap);
  }

  if (isDelete(character)) {
    test.removeLastChar();
  } else {
    test.addResponse(character);
  }

  displayProgress(test, timeGap);

  if (isDone(test)) {
    processInput(test, timeGap);
  }
};

module.exports = { typingTutor };
