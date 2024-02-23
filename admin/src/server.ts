import express from "express";
const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(express.static("public"));

app.get("/", (req: express.Request, res: express.Response) => {
  res.render("./pages/index.ejs");
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
});

export default app;
