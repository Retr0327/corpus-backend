function generateBoards(boards: string[], mediaPattern: RegExp) {
  const filteredBoard = boards.filter((value) => mediaPattern.test(value));
  return filteredBoard.map((value) => value.match(mediaPattern)![0]);
}

export default generateBoards;
