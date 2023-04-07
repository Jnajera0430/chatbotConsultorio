const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");


const client = new Client({
  authStrategy: new LocalAuth(),
});
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});
client.on("ready", () => {
  console.log("Client is ready!");
  EscuchandoMensages();
});
const EscuchandoMensages = () => {
  client.on("message", (msg) => {
    const { body, from, to } = msg;
    console.log({
      body,
      from,
      to,
    });
  });
};
const respuestaCliente = (num, text) => {
  client.sendMessage(num, text);
};

module.exports = {
  respuestaCliente,
};
