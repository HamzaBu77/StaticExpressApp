import DotEnv from 'dotenv'
DotEnv.config()
import Express from 'express'
import EmployeeRouter from './routes/employees.routes.js'
import DepartmentRouter from './routes/departments.routes.js'
import DashboardRouter from './routes/dashboard.routes.js'

const app = Express()
const port = process.env.PORT

app.use(Express.json())

app.use('/employees', EmployeeRouter)
app.use('/departments', DepartmentRouter)
app.use('/dashboard', DashboardRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}.`)
})
