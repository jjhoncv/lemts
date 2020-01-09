export const asyncHandler = dispacthHandler => {
  return function(req, res, next) {
    dispacthHandler(req, res, next)
      .then(q => {
        // console.log("res", res);
        res.json({
          status: res.statusCode,
          data: res.data,
          message: res.message
        });
        // console.log(res.data);
        // console.log(res.statusCode);
        // res['data'] = 'asdasdsdasd'
        // console.log("g", g);
      })
      .catch(next);
  };
};
