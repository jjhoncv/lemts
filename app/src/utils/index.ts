import { IResponse } from "../components/user/types";

const hydrateResponse = (res: IResponse) => ({
  status: res.statusCode === 200 ? 'success' : '',
  statusCode: res.statusCode,
  data: res.data,
  message: res.message
})

export const asyncHandler = fn =>
  (req, res: any, next) => {
    Promise.resolve(fn(req, res, next)).then(() => {
      const response = hydrateResponse(res);
      res.json({ ...response });
    })
      .catch(next);
  };

