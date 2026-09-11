import { Hono } from 'hono'
import { prettyJSON } from 'hono/pretty-json'
import weatherRoutes from './routes/weather'

const app = new Hono()
app.use(prettyJSON())
app.get('/', (c) => {
  return c.text('Hello Hono!')
})

// weather routes
app.route('/weather', weatherRoutes)

export default app
