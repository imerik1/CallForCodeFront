export default function handler(req, res) {
  const { address } = req.query;
  fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
    { method: "GET" }
  ).then((response) => {
    response
      .json()
      .then((data) => {
        if (data?.results.length === 0) {
          return res.status(500).json("Erro Interno");
        }
        return res.status(200).json(data?.results[0]?.geometry?.location);
      })
      .then((err) => {
        return res.status(409).json(err);
      });
  });
}
