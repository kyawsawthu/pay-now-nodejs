require("dotenv").config();

// app
const express = require("express");
const app = express();

const helmet = require("helmet");
app.use(express.json());
app.use(helmet());

// middlewares
const delay = require("./middlewares/delay");
const notFound = require("./middlewares/not-found");
const responseHandler = require("./middlewares/response-handler");

app.use(delay);
app.use(responseHandler);

// routers
const authRouter = require("./routes/auth-route");
const walletRouter = require("./routes/wallet-route");
const transactionRouter = require("./routes/transaction-route");
const paymentRouter = require("./routes/payment-route");
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/wallet", walletRouter);
app.use("/api/v1/transaction", transactionRouter);
app.use("/api/v1/payment", paymentRouter);
app.use("*", notFound);

// database connection
const database = require("./database/database");
const host = require("./utils/host");
const port = process.env.PORT;
const url = process.env.MONGO_URL;

function start() {
  try {
    database.connect(url);
    const server = app.listen(port, () => {
      console.log(`Server is listening on http://${host}:${port}`);
    });
    server.timeout = 5000;
  } catch (err) {
    console.log(err);
  }
}

start();
