import { getMatchfromStratz, getMatchesFromPlayer } from "./graphql/data";
import express from "express";

const app = express();
const port = 3000;

app.get("/tg/getMatches/:id", async (req, res) => {
  const matches = await getMatchesFromPlayer(req.params.id);
  res.send(matches);
});

app.get("/tg/getMatchStat/:id", async (req, res) => {
  const match = await getMatchfromStratz(req.params.id);
  res.send(match);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
