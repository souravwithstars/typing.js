const { TypingTest } = require("./typingTest.js");
const { typingTutor } = require("./typingLibrary.js");

const main = () => {
  process.stdin.setEncoding('utf8');
  process.stdin.setRawMode(true);
  const quote = 'I had never eaten any kind of Thai food, so I was pretty excited about going to a Thai restaurant with my grandmother.';
  // const quote = 'I had never eaten any kind of Thai food';

  const test = new TypingTest(quote);
  console.log(test.getQuote());

  const startedTime = new Date().getTime();

  process.stdin.on('data', character => {
    return typingTutor(test, startedTime, character);
  });
};

main();
