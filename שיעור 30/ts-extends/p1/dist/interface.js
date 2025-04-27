"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const u1 = getUser(23435);
function getUser(id) {
    return { id: 111, name: "eyal", email: "eyallevi@gmail.com", age: 28, dbId: "aa" };
}
function addUser(u) {
    console.log(u);
}
const myCardIntersection = { header: "new card", color: "black", height: 1, width: 2, src: "source" };
const myCardUnion = { header: "eader", color: "aaa" };
