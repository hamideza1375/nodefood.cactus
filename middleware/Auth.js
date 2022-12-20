const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
  try {
    const user = jwt.decode(req.header('Authorization'), {complete:true});
    if(!user) res.status(400).send('err')
    req.user = user;
    next()
  } catch(err) {
    console.log(err);
    if(!user) res.status(400).send('err')
  };
};

//    res.status(200).header("Access-Control-Expose-headers", "Authorization")
 // .header('Authorization', token)