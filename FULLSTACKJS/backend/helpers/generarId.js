const generarId = () =>{
    //Date.now() trae la fecha con toString(32) lo convierte a numeros y letras
    //Math.random trae valor random con toString lo pasamos a caracteres y con substring(2) le sacamos los dos primeros numeros
    return Date.now().toString(32) + Math.random().toString(32).substring(2); // esta es una forma de hacer un token que sean distintos unos de otros y complejos
}

export default generarId;