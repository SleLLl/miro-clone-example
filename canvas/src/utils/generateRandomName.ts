const generateRandomName = (): string => {
  const adjectives = ['happy', 'silly', 'jolly', 'playful', 'clever'];
  const nouns = ['penguin', 'giraffe', 'llama', 'koala', 'platypus'];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${adjective}-${noun}-${Math.floor(Math.random() * 100)}`;
}

export default generateRandomName;
