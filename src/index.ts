import * as express from "express";
import { AppDataSource } from "./data-source"
import { User } from "./user/user.entity"

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

    app.listen(3000)

}).catch(error => console.log(error))

