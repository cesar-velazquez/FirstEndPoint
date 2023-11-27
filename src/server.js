const app = require('./app');
const { authenticated, syncUp } = require('./config/database/database');
const { envs } = require('./config/enviroments/enviroments')

async function main() {
    try {
        await authenticated()
        await syncUp()
    } catch (error) {
        console.log(error)
    }
}

main()
const PORT = envs.PORT

app.listen(PORT, () => {
    console.log("Server running on port: " + PORT)
})