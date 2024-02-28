import {
  MemoryDB,
  addKeyword,
  createBot,
  createFlow,
  createProvider,
} from "@bot-whatsapp/bot";
import { BaileysProvider, handleCtx } from "@bot-whatsapp/provider-baileys";

const flowBienvenida = addKeyword("hola").addAnswer("Bienvenido");

const main = async () => {
  const provider = createProvider(BaileysProvider);

  provider.initHttpServer(3000);

  provider.http?.server.post(
    "/send-message",
    handleCtx(async (bot, req, res) => {
      try {
        const phone = req.body.phone;
        const message = req.body.message;

        await bot.sendMessage(phone, message, {});

        res.end({ ok: true, message: "Mensaje enviado" });
      } catch (error) {
        console.error(error);
        res.end({ ok: false, message: "Mensaje no se pudo enviar" });
      }
    })
  );

  await createBot({
    flow: createFlow([flowBienvenida]),
    database: new MemoryDB(),
    provider,
  });
};

main();
