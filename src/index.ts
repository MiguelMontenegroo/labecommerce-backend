import { createProduct, getAllProducts, products, searchProductsByName } from "./database";
import { users } from "./database";
import { getAllUsers } from "./database";
import { createUser } from "./database";
import  express, {Request, Response}  from "express";
import cors from 'cors';
import { TProducts, TUsers } from "./types";
import { db } from "./database/knex"
// console.log(products)
// console.log(users)

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("servidor rodando na porta 3003")
})

app.get("/ping",(req: Request, res: Response) => {
    res.send("pong")
    })

    app.get("/users", async(req: Request, res: Response) => {
        try {
        //    const result = await db.raw(`
        //    SELECT * FROM users;
        //    `)
          const result = await db("users")
            res.status(200).send(result)
        } catch (error:any) {
            console.log(error)
            if(res.statusCode === 200) {
                res.status(500)
                }
            res.send(error.message)
        }
    })

    app.get("/products", async(req: Request, res: Response) => {
       try {
        // const result2 = await db.raw(`
        // SELECT * FROM products;
        // `)

        const result2 = await db("products")
        res.status(200).send(result2)
       } catch (error: any) {
         console.log(error)
            if(res.statusCode === 200) {
                res.status(500)
                }
            res.send(error.message)
       }
    })
    app.get("/products/search", async(req: Request, res: Response) => {
       try {
        const name = req.query.name as string
    
        // const result = products.filter(
        //     (product) => product.name.toLowerCase().includes(name.toLowerCase())
        // )

        const [byName] = await db.raw(`
        SELECT * FROM products
        WHERE name like "%${name}%";
        `)

        if(name.length < 2){
            res.status(400)
            throw new Error("'name' deve ter ao menos 2 caracteres")
        }

        if(!byName){
            res.status(404)
            throw new Error("Produto não encontrado")
        }
    
        res.status(200).send(byName)

       } catch (error: any) {
        console.log(error)
        if(res.statusCode === 200) {
            res.status(500)
            }
        res.send(error.message)
       }
    })
    
    app.post("/users", async(req: Request, res: Response) => {
     try {
        const id = req.body.id as string
        const name = req.body.name as string
        const email = req.body.email as string
        const password = req.body.password as string

    
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
          
         
          
         const [verifyId] = await db.raw(`
         SELECT * FROM users
         WHERE id = "${id}";
         `)

        if(verifyId){
             res.status(400)
            throw new Error("o id ja existe")
         }

    
        const [verifyEmail] = await db.raw(`
        SELECT * FROM users 
        WHERE email = "${email}";
        `) 

         if(verifyEmail){
             res.status(400)
             throw new Error("o email ja existe")
         }

       
         await db.raw(`
         INSERT INTO users (id, name, email, password, created_At)
         VALUES ("${id}", "${name}", "${email}", "${password}", "${new Date().toISOString}");
         `)


      await db.insert({
        id,
        name,
        email,
        password,
        created_at: new Date().toISOString()
      }).into("users")


        res.status(201).send("Usuario cadastrado com sucesso")
     } catch (error: any) {
        console.log(error)
        if(res.statusCode === 200) {
            res.status(500)
            }
        res.send(error.message)
     }
    })

    app.post("/products", async(req: Request, res: Response) => {
     try {
        const id = req.body.id as string
        const name = req.body.name as string
        const price = req.body.price as number
        const description = req.body.description as string
        const imageUrl = req.body.image_url as string
         
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
           
           const [verifyId] = await db.raw(`
           SELECT * FROM products
           WHERE id = "${id}";
           `)

        if(verifyId){
            res.status(400)
            throw new Error("o id é existente")
        }

        await db.raw(`
        INSERT INTO products (id, name, price, description, image_url)
        VALUES ("${id}", "${name}", "${price}", "${description}", "${imageUrl}");
        `)


    
        res.status(201).send("Usuario cadastrado com sucesso")
     } catch (error:any) {
        console.log(error)
        if(res.statusCode === 200) {
            res.status(500)
            }
        res.send(error.message)
     }
    })

    app.post("/purchases", async(req: Request, res: Response) => {
        try {
          const id = req.body.id as string
        const buyer = req.body.buyer as string
        const total_price = req.body.total_price as number

        await db.raw(`
        INSERT INTO purchases (id, buyer, total_price, created_at)
        VALUES ('${id}', '${buyer}', ${total_price}, '${new Date().toISOString}' );
        `)


        res.status(201).send("Purchase cadastrado com sucesso")

        } catch (error: any) {
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

            app.put("/products/:id", async(req: Request, res: Response) => {
            try {   
                 const idToFind = req.params.id
                
                const newId = req.body.id as string | undefined
                const newName = req.body.name as string | undefined
                const newDescription = req.body.description as string | undefined
                const newPrice = req.body.price as number | undefined
                const newImageUrl = req.body.imageUrl as string| undefined

                const [product] = await db.raw(`
                SELECT * FROM products
                WHERE id = ${idToFind}
                `)
                if(!product){
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

               
                
                if(product){
                await db.raw(`
                UPDATE FROM products
                SET 
                id = '${newId || product.id}',
                name = '${newName || product.name}',
                description = '${newDescription || product.description}',
                price = '${newPrice || product.price}',
                image_url = '${newImageUrl || product.image_url}';
                `)
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

                app.delete("/purchases/:id", async(req: Request, res: Response) => {
                try {
                    const idToDelete = req.params.id as string

                    await db.raw(`
                    DELETE FROM purchases
                   WHERE id = "${idToDelete}";
                    `)

                    res.status(200).send("Purchase deletada com sucesso")

                } catch (error:any) {
                    console.log(error)
                if(res.statusCode === 200) {
                    res.status(500)
                    }
                res.send(error.message)
                }
                
                })

                app.get("/purchases/:id", async(req: Request, res: Response) => {
                  try {
                   const idToFind = req.params.id

                    const result = await db.select(
                   'purchases.id',
                   'purchases.buyer AS buyerId',
                   'users.name AS buyerName',
                   'users.email AS buyerEmail',
                   'purchases.total_price',
                   'purchases.created_at'
                    ).from('purchases').innerJoin('users', 'purchases.buyer', '=', 'users.id').where('purchases.id', '=', idToFind)

                    const result2 = await db.select(
                        '*'
                    ).from('purchases_products').where('purchases_products.purchase_id', '=', idToFind)

                    const products = []
                    for(let purchase of result2){
                       const [product] = await db('products').where('products.id', '=', purchase.product_id)
                       products.push(product)
                    }
                    const info = {...result, products}
                    
                    res.status(200).send(info)
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