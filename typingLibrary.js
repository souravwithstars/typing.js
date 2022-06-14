const isDone = (sentence) => {
  return sentence.getQuoteLength() <= sentence.getResponseLength();
};

const displayProgress = (test) => {
  console.clear();

  console.log(test.getQuote());
  process.stdout.write(test.getResponse());
};

const displayResult = (entry, value, unit) => {
  console.log(`\n${entry} : ${value}${unit}`);
};

const processInput = (test, timeGap) => {
  const accuracy = test.getAccuracy();
  const speed = test.getSpeed(timeGap);

  displayResult('Accuracy', accuracy, '%');
  displayResult('Speed', speed, 'wpm');
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

  displayProgress(test);

  if (isDone(test)) {
    processInput(test, timeGap);
  }
};

module.exports = { typingTutor };
