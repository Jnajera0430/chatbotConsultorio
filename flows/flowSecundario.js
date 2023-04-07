const { delay } = require("@adiwajshing/baileys");
const { addKeyword, addAnswer } = require("@bot-whatsapp/bot");
const { Client } = require("whatsapp-web.js");
const client = new Client();
let nombrecompleto;
let nombre;
let telefono;
let cedula;
let tipo;

//flujos complementarios

const flowDireccion = addKeyword(["1", "direccion", "consultorio"]).addAnswer(
  ["esta es la direccion", "ingresa *menu* para volver al menu principal"],
  null,
  null
);
const flowAgendaCita = addKeyword([
  "2",
  "agendar",
  "apartar",
  "quiero una cita",
])
  .addAnswer(
    [
      "Para agendar una cita necesito unos datos...",
      "Escriba su *Nombre completo*",
    ],

    async (ctx, { flowDynamic, endFlow }) => {
      console.log(ctx);
      if (ctx.body == "❌ Cancelar solicitud")
        return endFlow({
          body: "❌ Su solicitud ha sido cancelada ❌", // Aquí terminamos el flow si la condicion se comple
          buttons: [{ body: "⬅️ Volver al Inicio" }], // Y además, añadimos un botón por si necesitas derivarlo a otro flow
        });
      nombrecompleto = ctx.body;
      nombre = nombrecompleto.split(" ")[0];
      return flowDynamic({ body: `Encantado *${nombre}*, continuamos...` });
    }
  )
  .addAnswer(
    [
      "Escriba su *tipo y numero de identidad*",
      "ejemplo:",
      "*Cc ó Ti #num de indentidad*",
    ],
    { capture: true, buttons: [{ body: "❌ Cancelar solicitud" }] },

    async (ctx, { flowDynamic, endFlow }) => {
      if (ctx.body == "❌ Cancelar solicitud")
        return endFlow({
          body: "❌ Su solicitud ha sido cancelada ❌", // Aquí terminamos el flow si la condicion se comple
          buttons: [{ body: "⬅️ Volver al Inicio" }], // Y además, añadimos un botón por si necesitas derivarlo a otro flow
        });
      tipo = ctx.body.split(" ")[0];
      cedula = ctx.body.split(" ")[1];
      return flowDynamic({ body: `*${nombre}*, ya casi terminamos` });
    }
  )
  .addAnswer(
    ["Dejeme su número de teléfono para comunicarle con un asesor"],
    { capture: true, buttons: [{ body: "❌ Cancelar solicitud" }] },
    async (ctx, { flowDynamic, endFlow }) => {
      if (ctx.body == "❌ Cancelar solicitud")
        return endFlow({
          body: "❌ Su solicitud ha sido cancelada ❌",
          buttons: [{ body: "⬅️ Volver al Inicio" }],
        });

      telefono = ctx.body;
      await delay(2000);
      return flowDynamic([
        {
          body: `Estupendo *${nombre}*! te dejo el resumen de tu formulario
            \n- Nombre y apellidos: *${nombrecompleto}*
            \n- Tipo y Num. de identidad: *${tipo} - ${cedula}*
            \n- Telefono: *${telefono}*`,
        },
        {
          body: `*${nombre}* en un momento un asesor se comunicará contigo...`,
        },
      ]);
    }
  );

  const flowVerMisCitas = addKeyword([
    "3",
    "mis citas",
    "ver mis citas",
  ]).addAnswer(
    ["Espere un momento..."],
    { capture: true, buttons: [{ body: "❌ Cancelar solicitud" }] },
    async (ctx, { endFlow, flowDinamyc }) => {
      if (ctx.body == "❌ Cancelar solicitud")
        return endFlow({
          body: "❌ Su solicitud ha sido cancelada ❌", // Aquí terminamos el flow si la condicion se comple
          buttons: [{ body: "⬅️ Volver al Inicio" }], // Y además, añadimos un botón por si necesitas derivarlo a otro flow
        });
      await delay(2000);
        //peticiones a una api para traer la cita agendada por usuarios
  
      return flowDinamyc({body: "Aqui va la respuesta obtenida"});
    }
  );
  const flowCancelarCitas = addKeyword([
    "4",
    "Cancelar una cita",
    "Cancelar mi cita",
  ]).addAnswer(
    ["Espere un momento..."],
    { capture: true, buttons: [{ body: "❌ Cancelar solicitud" }] },
    async (ctx, { endFlow, flowDinamyc }) => {
      if (ctx.body == "❌ Cancelar solicitud")
        return endFlow({
          body: "❌ Su solicitud ha sido cancelada ❌", // Aquí terminamos el flow si la condicion se comple
          buttons: [{ body: "⬅️ Volver al Inicio" }], // Y además, añadimos un botón por si necesitas derivarlo a otro flow
        });
      await delay(2000);
        //peticiones a una api para traer la cita agendada por usuarios
  
      return flowDinamyc({body: "En un momento un assesor se comunicará con usted..."});
    }
  );
module.exports = {
  flowDireccion,
  flowAgendaCita,
  flowVerMisCitas,
  flowCancelarCitas
};
