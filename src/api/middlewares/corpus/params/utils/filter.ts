function buildFilterString(media: string | null, board: string | null, start: string, end: string) {
  const boardFilter = board
    ? `board:(${board
        .split('+')
        .map((value) => `${value.trim()}-${media?.trim()}`)
        .join(' + ')}) AND `
    : '';
  const mediaFilter = media ? `media:(${media.trim()}) AND ` : '';
  const yearFilter = `year:[${start.trim()} TO ${end.trim()}]`;

  return boardFilter + mediaFilter + yearFilter;
}

export default buildFilterString;
