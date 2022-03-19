exports.Render = (req, res, next, ...args) => {
  return res.status(args[0].status).render(args[0].page, {
    pageTitle: args[0].title,
    message: args[0].message,
    status: args[0].status,
    errorCode: args[0].errorCode
  });
}