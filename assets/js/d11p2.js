init((input, cb) => {
  const parsedInput = input.trim();

  const seatMap = new SeatMap(parsedInput, 'getSeatsVisible', 0, 5);
  seatMap.runSimulation();

  const resultEl = document.createElement('p');
  resultEl.innerHTML = 'Result: ' + seatMap.mapStr.match(/#/g).length;
  cb(resultEl);
  return;
});
