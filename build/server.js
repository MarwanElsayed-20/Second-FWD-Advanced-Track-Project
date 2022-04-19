"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express to make our server
var express_1 = __importDefault(require("express"));
// import bodyParser middleware
var body_parser_1 = __importDefault(require("body-parser"));
// import handlers
var users_1 = __importDefault(require("./handlers/users"));
var products_1 = __importDefault(require("./handlers/products"));
var orders_1 = __importDefault(require("./handlers/orders"));
var app = (0, express_1.default)();
var port = 3000;
app.use(body_parser_1.default.json());
app.get("/", function (req, res) {
    res.send("welcome to the new server");
});
// call our handler function and pass the server in it
(0, users_1.default)(app);
(0, products_1.default)(app);
(0, orders_1.default)(app);
app.listen(port, function () {
    console.log("server is running at: localHost ".concat(port));
});
exports.default = app;
