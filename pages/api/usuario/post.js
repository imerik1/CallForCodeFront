import { encrypt } from "../../../services/encrypt";

export default async function handler(req, res) {
  const body = req?.body;
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  fetch(`${process.env.URL_BASE_DATA}/donators/store`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: headers,
  }).then((response) => {
    response.json().then(async (data) => {
      if (response.status === 200) {
        const body = {
          message: "Usuário cadastrado com sucesso",
          data: await encrypt(data, true),
        };
        return res.status(201).json(body, true);
      } else {
        const body = {
          message: "Ocorreu um erro.",
          error: data,
          status: response.status,
        };
        return res.status(409).json(JSON.stringify(body));
      }
    });
  });
}
