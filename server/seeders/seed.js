import { User } from "../models/user.js";
import { faker } from "@faker-js/faker";


export const UserSeeder = async(usercnt)=>{
    try{ 
         const userPromise = [];
         for(let i=0;i<usercnt;i++){
                const userpromise = await User.create({
                name: faker.person.fullName(),
                username: faker.internet.username(),
                password: faker.internet.password(),
                avatar:{
                    public_id: faker.string.uuid(),
                    url: faker.image.url(),
                }
             });
             userPromise.push(userpromise);
         }
         await Promise.all(userPromise);
         console.log(`${usercnt} users created successfully`);
    }
    catch(error){
        console.log(error);
    }

};