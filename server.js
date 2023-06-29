const express = require("express");
const basicRouter = require("./routes/basic");
const productRouter = require("./routes/product");
const path = require("path");
const ErrorHandler = require("./errors/ErrorHandler");
const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());

app.use(productRouter);
app.use(basicRouter);

app.use((req, res, next) => {
  return res.json({ message: "page not found" });
});

app.use((err, request, response, next) => {
  if(err instanceof ErrorHandler){
    response.status(err.status).json({
      error:{
        message:err.message,
        status:err.status
      }
    })

  }
  else{
    response.status(500).json({
      error:{
        message:'internal server error'
      }
    })
  }
  
  
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, function () {
  console.log("server is live");
});
