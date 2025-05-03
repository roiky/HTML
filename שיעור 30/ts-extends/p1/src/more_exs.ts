//=====================[ex1 - Types]===============================
type Product = {
    id: number,
    name: string,
    price: number,
    inStock: boolean
}

// TODO: define type Product

function printProduct(product: Product): void {
    console.log(
        `Product: ${product.name} costs $${product.price} and is ${product.inStock ? "available" : "out of stock"}.`
    );
}

//=====================[ex2 - Interfaces]===============================
interface User {
    username: string,
    email: string,
    login(): boolean
}


const user: User = {
    username: "coolcat99",
    email: "coolcat@example.com",
    login() {
        return true; // Just a dummy implementation
    },
};

//=====================[ex3 - Generics]===============================
wrapInArray(5); // returns [5]
wrapInArray("hello"); // returns ["hello"]

function wrapInArray<T>(item: T): T[] {
    return [item];
}

const result = wrapInArray("test"); // result should be ["test"]

//=====================[ex4 - Union]===============================
// TODO: define type Status

type Status = {
    status: "success" | "error" | "loading"
}

function handleStatus(status: Status): void {
    if (status.status === "success") {
        console.log("Everything went fine!");
    } else if (status.status === "error") {
        console.log("There was a problem!");
    } else if (status.status === "loading") {
        console.log("Loading, please wait...");
    }
}

//=====================[ex5 - Intersection]===============================

type HasId = {
    id: number
}
type HasTimestamp = {
    timestamp: Date
}

// TODO: define types HasId and HasTimestamp

function logEntity(entity: HasId & HasTimestamp): void {
    console.log(`Entity #${entity.id} was last updated at ${entity.timestamp}`);
}   