function getExpireHour(hour: number) {
  const oneHour = 60 * 60;
  return Math.ceil(oneHour * hour);
}

export default getExpireHour;
