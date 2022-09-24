function buildFilterString(media: string | null, board: string | null, start: string, end: string) {
  const boardFilter = board ? `board:(${board}) AND ` : '';
  const mediaFilter = media ? `media:(${media}) AND ` : '';
  const yearFilter = `year:[${start} TO ${end}]`;

  return boardFilter + mediaFilter + yearFilter;
}

export default buildFilterString;