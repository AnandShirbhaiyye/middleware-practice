import express from "express";
const app = express();
app.use(express.json());
import dotenv from "dotenv";
dotenv.config();

const checkToken = (req, res, next) => {
  const { token } = req.body;
  if (token !== process.env.TOKEN) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized token",
      data: null,
    });
  }
  next();
};
let count = 0;

const countApiCalls = (req, res, next) => {
  count++;
  console.log(`API calls: ${count}`);
  next();
};

app.use(countApiCalls);

app.post("/plant", checkToken, (req, res) => {
  return res.json({
    message: "create plant api",
  });
});

app.post("/createplant", checkToken, (req, res) => {
  res.json({
    message: "Added plant successfully",
  });
});

app.listen(5000, () => {
  console.log("port 5000");
});
