const ahora = new Date();
const dia = ahora.getDate().toString().padStart(2, '0');
const mes = (ahora.getMonth() + 1).toString().padStart(2, '0');
const anio = ahora.getFullYear().toString();
const hora = ahora.getHours().toString().padStart(2, '0');
const minuto = ahora.getMinutes().toString().padStart(2, '0');
const segundo = ahora.getSeconds().toString().padStart(2, '0');
const milisegundo = ahora.getMilliseconds().toString().padStart(3, '0');

exports.fecha = `${dia}-${mes}-${anio} ${hora}:${minuto}`;


