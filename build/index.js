"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const database_2 = require("./database");
const database_3 = require("./database");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log("servidor rodando na porta 3003");
});
app.get("/ping", (req, res) => {
    res.send("pong");
});
console.log("funcionou");
console.table((0, database_2.getAllUsers)());
console.table((0, database_1.getAllProducts)());
(0, database_1.createProduct)("prod003", "Monitor 144hz", 1200, "Monitor gamer", "https://picsum.photos/seed/Monitor/400");
(0, database_3.createUser)("u003", "Br", "br@labenu.com", "br123");
console.table((0, database_2.getAllUsers)());
console.table((0, database_1.getAllProducts)());
console.log((0, database_1.searchProductsByName)("monitor"));
//# sourceMappingURL=index.js.map