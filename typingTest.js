class TypingTest {
  #quote;
  #response;
  constructor(quote) {
    this.#quote = quote;
    this.#response = '';
  }

  getQuote() {
    return this.#quote;
  }

  getResponse() {
    return this.#response;
  }

  getQuoteLength() {
    return this.#quote.length;
  }

  getResponseLength() {
    return this.#response.length;
  }

  #typedWordCount() {
    return this.getResponse().split(' ').length;
  }

  addResponse(response) {
    this.#response += response;
  }

  removeLastChar() {
    this.#response = this.#response.slice(0, -1);
  }

  getSpeed(time) {
    const wordCount = this.#typedWordCount()
    return Math.round((wordCount / time) * 60);
  }

  getAccuracy() {
    const actualArray = this.getQuote().split('');
    const responseArray = this.getResponse().split('');

    let count = 0;
    responseArray.forEach((char, i) => {
      if (actualArray[i] === char) {
        count += 1;
      }
    })

    return Math.round((count / responseArray.length) * 100);
  }
}

module.exports = { TypingTest };
