export const mockResponse = () => {
  const res = {};
  res.json = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(send);
  res.send = jest.fn().mockReturnValue(send);
  return res;
};
export const mockRequest = () => {
  const req = {};
  req.body = jest.fn().mockReturnValue(res);
  req.params = jest.fn().mockReturnValue(send);
  req.query = jest.fn().mockReturnValue(send);
  return req;
};
