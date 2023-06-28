import { createProduct, getAllProducts, products, searchProductsByName } from "./database";
import { users } from "./database";
import { getAllUsers } from "./database";
import { createUser } from "./database";
// console.log(products)
// console.log(users)
console.log("funcionou")
console.table(getAllUsers())
console.table(getAllProducts())
createProduct("prod003", "Monitor 144hz", 1200, "Monitor gamer", "https://picsum.photos/seed/Monitor/400")
createUser("u003", "Br", "br@labenu.com", "br123")
console.table(getAllUsers())
console.table(getAllProducts())
console.log(searchProductsByName("monitor"))