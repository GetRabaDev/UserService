const generateRandom = (len, type) => {
  let characters;
  if (type === 'alphabets') {
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  }
  if (type === 'numeric') {
    characters = '0123456789';
  }
  if (type === 'alphanumeric') {
    characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  }
  const value = generate(len, characters);
  return value;
};

function generate(length, characters) {
  var result = '';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

module.exports = {
  generateRandom,
};
