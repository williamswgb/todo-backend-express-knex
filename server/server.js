const app = require("./server-config.js");
const organisationRoutes = require("./routes/organisationRoutes");
const userRoutes = require("./routes/userRoutes");

const port = process.env.PORT || 5000;

app.use("/organisations", organisationRoutes);
app.use("/users", userRoutes);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = app;
