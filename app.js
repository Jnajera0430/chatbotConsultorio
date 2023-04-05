const {
  createBot,
  createProvider,
  createFlow,
} = require("@bot-whatsapp/bot");

const QRPortalWeb = require("@bot-whatsapp/portal");
const whatsappWebProvider  = require("@bot-whatsapp/provider/web-whatsapp");
const MockAdapter = require("@bot-whatsapp/database/mock");
const { functionFlowPrincipal } = require("./flows/flowPrincipal");

const main = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = createFlow([functionFlowPrincipal()]);
  const adapterProvider = createProvider(whatsappWebProvider);

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  QRPortalWeb();
};

main();
