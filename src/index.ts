import 'dotenv/config'
import * as express from "express";
import { User } from "./user/adapters/out/user-entity"
import { AppDataSource } from "./data-source"

const SERVER_PORT = process.env.SERVER_PORT ?? 3000

AppDataSource.initialize().then(async () => {
    
    if(!await AppDataSource.getRepository(User).findOneBy({
        cpf: "12345678900"
    })) {
        const user = new User()
        
        user.name = "James Smith"
        user.email = "james.smith@gmail.com"
        user.cpf = "12345678900"

        await AppDataSource.manager.save(user)
    }

    const app = express()

    app.listen(SERVER_PORT, () => {
        console.log(`\n*\n*\n*\nSERVER IS RUNNING ON PORT ${SERVER_PORT}\n*\n*\n*\n`);
    }).on("error", () => {
        console.log(
            `\n*\n*\n*\nCOULD NOT START SERVER, NEW ATTEMPT TO START SERVER ON PORT ${SERVER_PORT}\n*\n*\n*\n`
        );
    
        setTimeout(() => {
            app.listen(SERVER_PORT);
        }, 5000);
    });

})
.then(() => console.log('\n*\n*\n*\nDATABASE CONNECTED\n*\n*\n*\n'))
.catch(error => console.log('\n*\n*\n*\nDATABASE CONNECTION ERROR\n*\n*\n*\n', error))