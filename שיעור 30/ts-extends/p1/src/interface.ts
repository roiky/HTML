import { ExitStatus } from "typescript"

interface User {
  id: number,
  email: string,
  age: number,
  name: string
}



const u1 = getUser(23435)

function getUser(id: number): User & { dbId: string } {
  return { id: 111, name: "eyal", email: "eyallevi@gmail.com", age: 28, dbId: "aa" }
}

interface Admin extends User {
  permissions: string
}

//const eyalIsAdmin: Admin = { id: 111, name: "eyal", email: "eyallevi@gmail.com", age: 28, permissions: "admin" }

interface HTMLElement {
  tomer: boolean
}

function addUser(u: User) {
  console.log(u)
}


interface Card {
  header: string,
  color: string
}

interface CustomImage {
  height: number,
  width: number,
  src: string
}

const myCardIntersection: CustomImage & Card = { header: "new card", color: "black", height: 1, width: 2, src: "source" }
const myCardUnion: CustomImage | Card = { header: "eader", color: "aaa" }

