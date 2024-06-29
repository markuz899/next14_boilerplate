require("dotenv").config();
const fastify = require("fastify")();
const fastifyStatic = require("@fastify/static");
const path = require("path");
const next = require("next");
const { Signale } = require("signale");
const info = require("../package.json");

const dev = process.env.NODE_ENV !== "production";
const host = process.env.HOST || "localhost";
const port = parseInt(process.env.PORT || "6100");

const app = next({ dev });
const handle = app.getRequestHandler();

const options = {
  scope: "app server",
};
const signale = new Signale(options);

(async () => {
  try {
    await app.prepare();

    // Serve static files from 'public/static' directory
    fastify.register(fastifyStatic, {
      root: path.join(__dirname, "..", "public", "static"),
      prefix: "/static/",
    });

    // Handle all other requests with Next.js
    fastify.all("/*", (req, reply) => {
      reply.hijack();
      handle(req.raw, reply.raw)
        .then(() => {
          reply.raw.end();
        })
        .catch((err) => {
          fastify.log.error(err);
          reply.raw.writeHead(500);
          reply.raw.end("Internal Server Error");
        });
    });

    await fastify.listen({ port, host });
    signale.info(`Name: ${info.name}`);
    signale.info(`Version: ${info.version}`);
    signale.info(`Author: ${info.author}`);
    signale.info(`Server running at http://${host}:${port}`);

    if (dev) {
      signale.warn(`isProd: ${!dev}`);
    } else {
      signale.success(`isProd: ${!dev}`);
    }

    signale.success(`${process.env.NEXT_PUBLIC_TENANT} ready`);
  } catch (err) {
    signale.fatal(err);
    process.exit(1);
  }
})();
