const { addKeyword } = require("@bot-whatsapp/bot");
const { flowDireccion, flowAgendaCita,flowVerMisCitas,flowCancelarCitas } = require("./flowSecundario");
let nombrecompleto;
let nombre;
let telefono;
let cedula;
let tipo;

const functionFlowPrincipal = () => {
  const flowPrincipal = addKeyword([
    "hola",
    "ole",
    "alo",
    "buenas",
    "buen dia",
    "buenos dias",
    "menu",
    "⬅️ Volver al Inicio",
  ])
    .addAnswer('🙌 Hola de parte del consultorio "" te damos la vienvenida*')
    .addAnswer(
      [
        "te comparto las siguientes opciones:",
        "señala la opcion de tu preferencia segun lo indicado",
        "👉 *1* para ver direccion del consultorio",
        "👉 *2* para agendar una cita",
        "👉 *3* para ver tus citas agendadas",
        "👉 *4* para cancelar una cita",
      ],
      null,
      null,
      [flowDireccion, flowAgendaCita,flowVerMisCitas,flowCancelarCitas]
    );
  return flowPrincipal;
};

module.exports = {
  functionFlowPrincipal,
};
