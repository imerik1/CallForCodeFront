export default async function handler(req, res) {
  const { lat, lng, UF } = req.query;
  var headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");

  fetch(
    `${process.env.URL_BASE_DATA}/collectors/range?estado=${UF}&latitude=${lat}&longitude=${lng}`,
    {
      method: "GET",
      headers: headers,
    }
  ).then((response) => {
    response.json().then(async (data) => {
      if (response.status !== 200) {
        const body = {
          message: "Erro Interno",
          data: data,
        };
        return res.status(500).json(body);
      } else {
        const body = {
          message: "Pesquisa realizada com sucesso",
          data: data,
        };
        return res.status(200).json(JSON.stringify(body));
      }
    });
  });
}
