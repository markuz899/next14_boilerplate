const fastify = require("fastify")();

async function routes(fastify, options) {
  fastify.get("/manifest.json", async (req, res) => {
    const theme = require(`../src/theme/tenant/primary`);
    let manifest = {
      name: process.env.NEXT_PUBLIC_SITE_NAME,
      short_name: "NM",
      theme_color: theme.colors.primary,
      background_color: theme.colors.primary,
      display: "standalone",
      orientation: "portrait",
      scope: "/",
      start_url: "/",
      icons: [
        {
          src: "/static/manifest/nextjs_logo-512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "/static/manifest/nextjs_logo-192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "any maskable",
        },
        {
          src: "/static/manifest/nextjs_logo-144.png",
          sizes: "144x144",
          type: "image/png",
        },
        {
          src: "/static/manifest/nextjs_logo-96.png",
          sizes: "96x96",
          type: "image/png",
        },
      ],
    };
    res.header("content-type", "application/json");
    return res.status(200).send(JSON.stringify(manifest));
  });
}

module.exports = routes;
