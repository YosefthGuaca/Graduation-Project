import Express from "express";
const app = Express();
const PORT = 8000;

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
});
