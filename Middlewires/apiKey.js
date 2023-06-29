const apiKeyValidation = (req, res, next) => {
  const key = 123456;
  const requestedApiKey = req.query.api_key;
  if(requestedApiKey && (requestedApiKey == key)){
    next();
  }
  else{
    res.json({
        key:'invalid request',
    })
  }
};




module.exports = apiKeyValidation;