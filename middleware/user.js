const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
  try {
    const user = jwt.decode(req.header('Authorization'), {complete:true});
    req.user = user?user:{};
    next()
  } catch(err) {
    console.log(err);
    next()
  };
};

//    res.status(200).header("Access-Control-Expose-headers", "Authorization")
 // .header('Authorization', token)