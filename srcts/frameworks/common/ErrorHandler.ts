import winston from './WinstonLogger'

class ErrorHandler {
  handle (err, req, res, next): void {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}
    console.log(err)
    // add this line to include winston logging
    winston.getLogger().error(`${String(err.status ?? 500)} - ${String(err.message)} - ${String(req.originalUrl)} - ${String(req.method)} - ${String(req.ip)}`)

    // render the error page
    res.status(err.status ?? 500)
    res.json({ error: err.message })
  }
}

export default new ErrorHandler()
