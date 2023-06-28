"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const database_2 = require("./database");
const database_3 = require("./database");
console.log("funcionou");
console.table((0, database_2.getAllUsers)());
console.table((0, database_1.getAllProducts)());
(0, database_1.createProduct)("prod003", "Monitor 144hz", 1200, "Monitor gamer", "https://picsum.photos/seed/Monitor/400");
(0, database_3.createUser)("u003", "Br", "br@labenu.com", "br123");
console.table((0, database_2.getAllUsers)());
console.table((0, database_1.getAllProducts)());
console.log((0, database_1.searchProductsByName)("monitor"));
//# sourceMappingURL=index.js.map