const xmlType = (request, response, next) => {
  request.app.isXml = false;

  if (request.headers['content-type'] === 'application/xml' || request.headers.accept === 'application/xml' || request.params.type === 'xml') {
    request.app.isXml = true;
  }

  next();
};
export default xmlType;
//# sourceMappingURL=xml-type.js.map