const fetch = require('node-fetch');

module.exports.findHorario = async function findHorario(slotUsuario) {
    let data = await getVP();
    let horario = '';
        for ( let i = 0; i < data.length; i ++ ){
            if (data[i].nombrelugar === slotUsuario) {
                horario = data[i].horario;
                break;
            }
            else if(i+1 === data.length){
                horario = "No se encontró nada";
            }
        }
  console.log(horario);
  return horario;
}

module.exports.findLugares = async function findLugares(slotUsuario) {
    let data = await getVP();
    let lugar = '';
        for ( let i = 0; i < data.length; i ++ ){
            if (data[i].nombrelugar === slotUsuario) {
                lugar = data[i].lugar;
                break;
            }
            else if(i+1 === data.length){
                lugar = "No se encontró nada";
            }
        }
  console.log(lugar);
  return lugar;
}

module.exports.findApertura = async function findApertura(slotUsuario) {
    let data = await getVP();
    let abre = '';
        for ( let i = 0; i < data.length; i ++ ){
            if (data[i].nombrelugar === slotUsuario) {
                abre = data[i].apertura;
                break;
            }
            else if(i+1 === data.length){
                abre = "No se encontró nada";
            }
        }
  console.log(abre);
  return abre;
}

module.exports.findCierre = async function findCierre(slotUsuario) {
    let data = await getVP();
    let cierre = '';
        for ( let i = 0; i < data.length; i ++ ){
            if (data[i].nombrelugar === slotUsuario) {
                cierre = data[i].cierre;
                break;
            }
            else if(i+1 === data.length){
                cierre = "No se encontró nada";
            }
        }
  console.log(cierre);
  return cierre;
}

async function getVP() {
  let url =
    "https://horarios-api-db.herokuapp.com/api/horario";
  let settings = {
    method: 'GET'
  };
  let response = await fetch(url, settings);
  let data = await response.json();
  console.log(data);
  return data;
}

