const router = require("express").Router();
const apiKeyValidation = require('../Middlewires/apiKey')

router.get("/", (request, response) => {
  response.render("homepage", {
    title: "home page",
  });
});

router.get('/about',(request,response)=>{
    response.render("about",{
        title:'about us',
    })
})

router.get('/api/products',apiKeyValidation,(req,res)=>{
    res.json([
        {
            name:"bat man",
            year:'2003'
        },
        {
          name:"iron man - 3",
          year:'2009'  
        }
    ])
})

module.exports = router;
