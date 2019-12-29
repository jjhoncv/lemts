export const asyncHandler = (dispacthHandler) => {
  return async function (req, res, next) {
    try {
      await dispacthHandler(req, res, next);
    } catch (err) {
      next(err);
    }
  }
}
