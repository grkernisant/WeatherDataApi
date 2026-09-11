import { Hono } from 'hono'
import weatherRoutes from './routes/weather'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

// weather routes
app.route('/weather', weatherRoutes)

export default app
