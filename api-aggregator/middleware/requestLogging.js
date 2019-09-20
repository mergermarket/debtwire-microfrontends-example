import morgan from 'morgan'

export default function (logger) {
  morgan.token('id', req => req.id)
  morgan.token('user', req => req.authentication && req.authentication.userId)

  const format = ':req[X-Forwarded-For] :method :url HTTP/:http-version :status :res[content-length] - :response-time[1] ms - :user-agent - :id :req[X-Amzn-Trace-Id] - :user'

  return morgan(format, {
    immediate: false,
    stream: { write: (msg, _) => logger.info(msg) },
    skip: req => /\/favicon.ico|\/healthcheck/i.test(req.url)
  })
}
