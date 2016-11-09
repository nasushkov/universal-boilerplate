import Router from 'koa-router'

const apiRouter = Router({ prefix: '/api' })
//TODO: implement REST composition or GraphQL server here
apiRouter
    .get('bar', '/bar', function *() {
        this.response.body = { bar: [ 'foo' ] }
    })

export default apiRouter