import { createProduct, getAllProducts, products, searchProductsByName } from "./database";
import { users } from "./database";
import { getAllUsers } from "./database";
import { createUser } from "./database";
import  express, {Request, Response}  from "express";
import cors from 'cors';
import { TProducts, TUsers } from "./types";
// console.log(products)
// console.log(users)

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("servidor rodando na porta 3003")
})

app.get("/ping", (req: Request, res: Response) => {
    res.send("pong")
    })

    app.get("/users", (req: Request, res: Response) => {
        try {
            res.status(200).send(users)
        } catch (error:any) {
            console.log(error)
            if(res.statusCode === 200) {
                res.status(500)
                }
            res.send(error.message)
        }
    })

    app.get("/products", (req: Request, res: Response) => {
        res.status(200).send(products)
    })
    app.get("/products/search", (req: Request, res: Response) => {
       try {
        const name = req.query.name as string
    
        const result = products.filter(
            (product) => product.name.toLowerCase().includes(name.toLowerCase())
        )

        if(name.length < 2){
            res.status(400)
            throw new Error("'name' deve ter ao menos 2 caracteres")
        }

        if(!result){
            res.status(404)
            throw new Error("Produto não encontrado")
        }
    
        res.status(200).send(result)

       } catch (error: any) {
        console.log(error)
        if(res.statusCode === 200) {
            res.status(500)
            }
        res.send(error.message)
       }
    })
    
    app.post("/users", (req: Request, res: Response) => {
     try {
        const id = req.body.id as string
        const name = req.body.name as string
        const email = req.body.email as string
        const password = req.body.stack as string
    
        if(typeof id !== "string"){
         res.status(400)
         throw new Error("id precisa ser uma string")
        }
        
        if(typeof name !== "string"){
            res.status(400)
            throw new Error("name precisa ser uma string")
        }
        
        if(typeof email !== "string"){
            res.status(400)
            throw new Error("email precisa ser uma string")
        }

        if(typeof password !== "string"){
            res.status(400)
            throw new Error("password precisa ser uma string")
        }
          
          const verifyId = users.find((user) => user.id === id)
          

        if(verifyId){
            res.status(400)
            throw new Error("o id ja existe")
        }

        const verifyEmail = users.find((user) => user.email === email)
        
        if(verifyEmail){
            res.status(400)
            throw new Error("o email ja existe")
        }

        const newUser: TUsers = {
            id,
            name,
            email,
            password,
            createdAt: new Date().toISOString()
            
        }

        users.push(newUser)
    
        res.status(201).send("Usuario cadastrado com sucesso")
     } catch (error: any) {
        console.log(error)
        if(res.statusCode === 200) {
            res.status(500)
            }
        res.send(error.message)
     }
    })

    app.post("/products", (req: Request, res: Response) => {
     try {
        const id = req.body.id as string
        const name = req.body.name as string
        const price = req.body.price as number
        const description = req.body.description as string
        const imageUrl = req.body.imageUrl as string
         
        if(typeof id !== "string"){
            res.status(400)
            throw new Error("id precisa ser uma string")
           }

        if(typeof name !== "string"){
            res.status(400)
            throw new Error("name precisa ser uma string")
           }

        if(typeof price !== "number"){
            res.status(400)
            throw new Error("price precisa ser um number")
           }

           if(typeof description !== "string"){
            res.status(400)
            throw new Error("description precisa ser uma string")
           }

           if(typeof imageUrl !== "string"){
            res.status(400)
            throw new Error("imageUrl precisa ser uma string")
           }
           

 const verifyId2 = products.find((product) => product.id === id)
          

        if(verifyId2){
            res.status(400)
            throw new Error("o id ja existe")
        }


        const newProduct: TProducts = {
            id,
            name,
            price,
            description,
            imageUrl
            
        }
    
        products.push(newProduct)
    
        res.status(201).send("Usuario cadastrado com sucesso")
     } catch (error:any) {
        console.log(error)
        if(res.statusCode === 200) {
            res.status(500)
            }
        res.send(error.message)
     }
    })

    app.delete("/users/:id", (req: Request, res: Response) => {
       try {
        const idToDelete = req.params.id

        const verifyId3 = users.find((user) => user.id === idToDelete)
          
        if(!verifyId3){
            res.status(400)
            throw new Error("o id não existe")
        }

        const usersIndex = users.findIndex((user)=> user.id === idToDelete)
        
        if(usersIndex >= 0){
        users.splice(usersIndex, 1)
        }
        res.status(200).send("Usuario deletado com sucesso")

       } catch (error: any) {
        console.log(error)
        if(res.statusCode === 200) {
            res.status(500)
            }
        res.send(error.message)
       }
        })

        app.delete("/products/:id", (req: Request, res: Response) => {
       try {
        const idToDelete2 = req.params.id

        const verifyId4 = products.find((product) => product.id === idToDelete2)
          

        if(!verifyId4){
            res.status(400)
            throw new Error("id não existe")
        }

            
        const productsIndex = products.findIndex((product)=> product.id === idToDelete2)
        
        if(productsIndex >= 0){
       products.splice(productsIndex, 1)
        }
        res.status(200).send("Produto deletado com sucesso")
       } catch (error: any) {
        console.log(error)
        if(res.statusCode === 200) {
            res.status(500)
            }
        res.send(error.message)
       }
            })

            app.put("/products/:id", (req: Request, res: Response) => {
            try {   
                 const idToFind = req.params.id
                
                const newId = req.body.id as string | undefined
                const newName = req.body.name as string | undefined
                const newDescription = req.body.description as string | undefined
                const newPrice = req.body.price as number | undefined
                const newImageUrl = req.body.imageUrl as string| undefined

                const verifyId5 = products.find((product) => product.id === idToFind)

                if(!verifyId5){
                    res.status(400)
                    throw new Error("id não existe")
                }
        
               if(newId !== undefined){
                if(typeof newId !== "string"){
                    res.status(400)
                    throw new Error("o id não é uma string")
                }
                
                if(newName !== undefined){
                    if(typeof newName !== "string"){
                        res.status(400)
                    throw new Error("o name não é uma string") 
                    }
                }
               
                if(newDescription !== undefined){
                  if(typeof newDescription !== "string"){
                    res.status(400)
                    throw new Error("o description não é uma string") 
                  }
                }

                if(newPrice !== undefined){
                    if(typeof newPrice !== "number")
                    res.status(400)
                    throw new Error("o description não é um number") 
                }

               if(newImageUrl !== undefined){
                if(typeof newImageUrl !== "string"){
                    res.status(400)
                    throw new Error("o newImageUrl não é uma string") 
                }
               }


               }

                const product = products.find((product) => product.id === idToFind)
                
                if(product){
                product.id = newId || product.id
                product.name = newName|| product.name
                product.description = newDescription || product.description
                product.imageUrl = newImageUrl || product.imageUrl
                product.price = isNaN(Number(newPrice)) ? product.price : newPrice as number
                }
                res.status(200).send("Conta atualizada com sucesso")
                
            } catch (error: any) {
                console.log(error)
                if(res.statusCode === 200) {
                    res.status(500)
                    }
                res.send(error.message)
            }
                })




// console.log("funcionou")
// console.table(getAllUsers())
// console.table(getAllProducts())
// createProduct("prod003", "Monitor 144hz", 1200, "Monitor gamer", "https://picsum.photos/seed/Monitor/400")
// createUser("u003", "Br", "br@labenu.com", "br123")
// console.table(getAllUsers())
// console.table(getAllProducts())
// console.log(searchProductsByName("monitor"))