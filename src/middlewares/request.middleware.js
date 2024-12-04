let requestCount = 0;
let elapsed = 0;
const start = Date.now();

async function requestMiddleware(req, res, next) {
  requestCount += 1;

  const end = Date.now();
  elapsed = Math.floor(end - start) / 1000;

  if (elapsed <= 30 && requestCount > 5) {
    elapsed = 0;

    return res
      .status(429)
      .json({
        message: 'Too many requests',
      });
  }

  next();
}

export default requestMiddleware;