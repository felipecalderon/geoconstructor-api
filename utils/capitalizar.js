exports.capitalizeString = (input) => {
    // Definimos una lista de palabras que deben permanecer en minúsculas.
    const lowerCaseWords = ["de", "el", "la", "los", "las", "un", "una", "unos", "unas", "al", "del", "con", "sin", "para", "por", "en", "entre", "hacia", "hasta", "sobre", "tras", "m", "cm", "kg", "cc", "mm", "l", "g", "u", "x", "mt", "xl", "xxl"];

    // Convertimos el string de entrada en un array de palabras.
    const words = input.toLowerCase().split(" ");

    // Recorremos el array de palabras.
    for (let i = 0; i < words.length; i++) {
        if (i === 0 || !lowerCaseWords.includes(words[i])) {
            // Si es la primera palabra del string, o si no está en la lista de palabras que deben permanecer en minúsculas,
            // convertimos la primera letra de la palabra en mayúsculas.
            words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
        } else if (lowerCaseWords.includes(words[i])) {
            // Si la palabra está en la lista de palabras que deben permanecer en minúsculas, la dejamos en minúsculas.
            words[i] = words[i].toLowerCase();
        }
    }

    // Convertimos el array de palabras en un string y lo devolvemos.
    return words.join(" ");
}