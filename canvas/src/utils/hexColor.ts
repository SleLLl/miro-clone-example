function randomHexColor(): string {
  const hexChars = '0123456789abcdef';
  let color = '';
  for (let i = 0; i < 6; i++) {
    color += hexChars[Math.floor(Math.random() * hexChars.length)];
  }
  return color;
}
export default randomHexColor();
