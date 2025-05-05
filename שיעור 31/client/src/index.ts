
 
async function getAllCustomers(){
    const result =fetch("http://localhost:3000", { method: 'PUT' ,   headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({salary:"10k"}) })
}