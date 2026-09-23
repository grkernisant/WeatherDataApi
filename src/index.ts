import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { prettyJSON } from 'hono/pretty-json'
import weatherRoutes from './routes/weather'

const app = new Hono()
app.use(prettyJSON())
app.get('/', (c) => {
  return c.text('Hello Hono!')
})

// weather routes
app.use(
  '/weather/*',
  cors({
    origin: 'http://localhost:5173',
  })
)
app.route('/weather', weatherRoutes)

export default app
