async function routes(fastify, options) {
  fastify.post("/log", async (request, reply) => {
    const cookies = request.cookies;
    console.log("Cookies:", cookies);

    const cookieOptions = {
      path: "/",
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      expires: new Date(Date.now() + 3600000),
    };

    reply.setCookie("myCookie", "cookie-value", cookieOptions);
    reply.status(201).send({ sttus: true });
  });
}

module.exports = routes;
