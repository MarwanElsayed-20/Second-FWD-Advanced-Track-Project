"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var order_1 = require("../order");
var userOrder = new order_1.UserOrder();
describe("order model", function () {
    describe("test methods existence", function () {
        it("should have a create function", function () {
            expect(userOrder.create).toBeDefined();
        });
        it("should have a index function", function () {
            expect(userOrder.index).toBeDefined();
        });
        it("should have a show function", function () {
            expect(userOrder.show).toBeDefined();
        });
    });
});
