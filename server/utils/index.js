const { city, province } = require("./data");

function sortByLabel(a, b) {
  return a.label.localeCompare(b.label);
}

async function routes(fastify, options) {
  fastify.get("/city", async (req, res) => {
    try {
      let response = [];
      if (req.query.q) {
        const query = req.query.q.toLowerCase();
        response = city
          .filter((el) => el.label.toLowerCase().includes(query))
          .sort(sortByLabel);
      } else {
        response = city.sort(sortByLabel);
      }
      return res.send(response);
    } catch (err) {
      console.log(`Error api - /utils/city: ${err}`);
      return res.status(500).send({ error: "Internal fastify Error" });
    }
  });

  fastify.get("/province", async (req, res) => {
    try {
      let response = [];
      if (req.query.q) {
        const query = req.query.q.toLowerCase();
        response = province
          .filter((el) => el.label.toLowerCase().includes(query))
          .sort(sortByLabel);
      } else {
        response = province.sort(sortByLabel);
      }
      return res.send(response);
    } catch (err) {
      console.log(`Error api - /utils/province: ${err}`);
      return res.status(500).send({ error: "Internal Server Error" });
    }
  });

  fastify.get("/province/:city", (req, res) => {
    const city = req.params.city;
    const cityProvinces =
      province?.filter((el) => el.label.includes(city)) || [];
    res.send(cityProvinces);
  });
}

module.exports = routes;
