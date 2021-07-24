export default function handler(req, res) {
  const { documento } = req.query;
  const users = [
    {
      nome: "Erik",
      sobrenome: "Santana",
      cpf: "22855674808",
      password: "abc123",
      email: "erik@gmail.com",
      solicitacao: [],
    },
    {
      nome: "João",
      sobrenome: "Guilherme",
      cpf: "22855674908",
      password: "abc123",
      email: "joao@gmail.com",
      solicitacao: [],
    },
  ];
  const companies = [
    {
      nome: "Erik SA",
      documento: "22855674808",
      senha: "abc123",
      email: "erik@gmail.com",
      solicitacao: [],
    },
    {
      nome: "João Ong",
      documento: "11028645000191",
      senha: "abc123",
      email: "joao@gmail.com",
      solicitacao: [],
    },
  ];
  let exist = false;
  if (documento.length === 11) {
    for (let user in users) {
      if (users[user].cpf === documento.toString()) {
        exist = true;
        break;
      }
    }
  } else {
    for (let company in companies) {
      if (companies[company].documento === documento.toString()) {
        exist = true;
        break;
      }
    }
  }
  return res.status(200).json(exist);
}
