
const jwt = require("jsonwebtoken");
// const SECRET_KEY = require("../config/SECRET");

 const checkUserSession = async (req, res) => {
  try {
    const { userToken } = req.body;

    const session = jwt.verify(userToken, process.env.SECRET_KEY);
    

    if (!session)
      return res.status(419).json({
        status: false,
        title: "Error",
        msg: "Session Expired!",
        icon: "error",
      });
    res.status(200).json({
      status: true,
      title: "Success",
      msg: "Session verified!",
      icon: "success",
    });
  } catch (error) {
    console.log(error);
    // throw new Error(error);
  }
};

module.exports = checkUserSession;
