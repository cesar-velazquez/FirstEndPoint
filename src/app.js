const express = require('express')
const usersRoutes = require('./users/users-Routes')
const RepairsRoutes = require('./repairs/repairs.routes')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', usersRoutes)
app.use('/', RepairsRoutes)

// const GetAllRepairs = (req, res) => {
//     res.json({
//         "saludar": "Get"
//     })
// }

// const PostRepairs = (req, res) => {
//     res.json({
//         message: "POST"
//     })
// }

// const GetOneRepairs = (req, res) => {
//     res.json({
//         message: "Get One"
//     })
// }

// const PatchRepairs = (req, res) => {
//     res.json({
//         message: "Patch"
//     })
// }

// const DeleteRepairs = (req, res) => {
//     res.json({
//         message: "Delete"
//     })
// }

// // Rutas
// app.get('/api/v1/repairs', GetAllRepairs)

// app.post('/api/v1/repairs', PostRepairs)

// app.get('/api/v1/repairs/:id', GetOneRepairs)

// app.patch('/api/v1/repairs/:id', PatchRepairs)

// app.delete('/api/v1/repairs/:id', DeleteRepairs)



module.exports = app