require("dotenv").config();
const fastify = require("fastify")();
const { parse } = require("url");
const fastifyStatic = require("@fastify/static");
const fastifyCookie = require("@fastify/cookie");
const path = require("path");
const next = require("next");
const session = require("@fastify/session");
const { Signale } = require("signale");
const info = require("../package.json");
const { tenantInfo } = require("./routesMok");

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

    // Register plugins
    await registerPlugins(fastify);

    // Register routes and handle all
    await registerRoutes(fastify);

    // Start fastify and nextjs server
    await startServer(fastify);
  } catch (err) {
    signale.fatal(err);
    process.exit(1);
  }
})();

async function startServer(fastify) {
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
}

const handleRequest = async (req, reply) => {
  await addCustomData(req);

  if (process.env.SERVER_ROUTE === "true") {
    await handlingTenantRoute(req, reply);
  } else {
    await handleNextRequest(req, reply);
  }
};

const handlingTenantRoute = async (req, reply) => {
  const parsedUrl = parse(req.url, true);
  const { pathname, query } = parsedUrl;

  if (pathname === "/") {
    await app.render(req.raw, reply.raw, "/", query);
  } else if (pathname === "/componenti") {
    await app.render(req.raw, reply.raw, "/components", query);
  } else {
    await handle(req.raw, reply.raw);
  }
  reply.hijack();
};

const handleNextRequest = (req, reply) => {
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
};

const addCustomData = (req) => {
  // pass data inside pages
  // if (!req.session.customData) {
  //   req.session.customData = "some-value";
  // }

  // pass data inside middleware
  // req.headers["x-custom-variable"] = req.session.customData;

  // save inside server tenant info and read inside page with req.tenantInfo
  req.raw.tenantInfo = tenantInfo;

  // get routes from es: req.tenant and pass routes
  req.raw.headers["tenantInfo"] = JSON.stringify(tenantInfo);
};

const registerPlugins = async (fastify) => {
  // Serve static files from 'public/static' directory
  fastify.register(fastifyStatic, {
    root: path.join(__dirname, "..", "public", "static"),
    prefix: "/static/",
  });

  // Register fastify-cookie plugin
  fastify.register(fastifyCookie, {
    secret: "my-secret", // for cookies signature
    parseOptions: {}, // options for parsing cookies
  });

  fastify.register(session, { secret: process.env.SESSION_SECRET });
};

const registerRoutes = async (fastify) => {
  const manifestRoutes = require("./manifest");
  const logRoutes = require("./routes/log");
  fastify.register(manifestRoutes);
  fastify.register(logRoutes, { prefix: "/api" });

  fastify.all("/*", async (req, reply) => {
    await handleRequest(req, reply);
  });
};
