const app = require("./server-config.js");
const organisationRoutes = require("./routes/organisationRoutes");

const port = process.env.PORT || 5000;

app.use("/organisations", organisationRoutes);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = app;
