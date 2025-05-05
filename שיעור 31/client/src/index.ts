//test

function init() {
  //to get all customers
  const getAllBTN = document.getElementById("getAllCustomersBTN")
  const allCustomersOutput = document.getElementById("allCustomerOutput")
  //to get customer by ID
  const customerByIdInput = <HTMLInputElement>document.getElementById("customerIdInput")
  const customerByIdBTN = document.getElementById("getCustomerByIdBTN")
  const customerByIdOutput = document.getElementById("customerByIdOutput");
  //to delete customer by ID
  const deleteCustomerByIdInput = <HTMLInputElement>document.getElementById("deleteCustomerIdInput")
  const deleteCustomerByIdBTN = document.getElementById("deleteCustomerByIdBTN")
  const deleteCustomerByIdOutput = document.getElementById("deleteCustomerByIdOutput");
  //to update customer by ID
  const updateCustomerByIdInput = <HTMLInputElement>document.getElementById("updateCustomerIdInput")
  const updateCustomerNameInput = <HTMLInputElement>document.getElementById("updateCustomerNameInput")
  const updateCustomerByIdBTN = document.getElementById("updateCustomerBTN")
  const updateCustomerByIdOutput = document.getElementById("updateCustomerOutput");
  //to create new customer
  const createCustomerNameInput = <HTMLInputElement>document.getElementById("createCustomerNameInput")
  const createCustomerMailInput = <HTMLInputElement>document.getElementById("createCustomerMailInput")
  const createCustomerBTN = document.getElementById("createCustomerBTN")
  const createCustomerOutput = document.getElementById("createCustomerOutput");

  getAllBTN?.addEventListener("click", async function () {
    try {
      const result = await fetch("http://localhost:3000/customers", {
        method: "GET"
      })
      const data = await result.json()
      console.log(data)
      if (allCustomersOutput) {
        allCustomersOutput.innerHTML = ""
        allCustomersOutput.innerHTML = data.map((customer: string) => `<p> ${customer} </p>`).join("")
      }

    } catch (error) {
      console.log(error)
    }
  })

  customerByIdBTN?.addEventListener("click", async function () {
    const idToSend = customerByIdInput.value

    if (!idToSend) {
      return customerByIdOutput!.innerText = "please enter ID!"
    }

    try {
      const result = await fetch(`http://localhost:3000/customer/${idToSend}`, {
        method: "GET"
      })
      const data = await result.text()
      console.log(data)
      customerByIdOutput!.innerHTML = `<p> ${data} </p>`
      customerByIdInput.value = "";

    } catch (error) {
      console.log(error)
    }
  })

  deleteCustomerByIdBTN?.addEventListener("click", async function () {
    const idToSend = deleteCustomerByIdInput.value

    if (!idToSend) {
      return deleteCustomerByIdOutput!.innerText = "please enter ID to delete!"
    }

    try {
      const result = await fetch(`http://localhost:3000/customer/${idToSend}`, {
        method: "DELETE"
      })
      const data = await result.text()
      console.log(data)
      deleteCustomerByIdOutput!.innerHTML = `<p> ${data} </p>`
      deleteCustomerByIdInput.value = "";

    } catch (error) {
      console.log(error)
    }
  })

  updateCustomerByIdBTN?.addEventListener("click", async function () {
    const idToUpdate = updateCustomerByIdInput.value
    const nameToUpdate = updateCustomerNameInput.value

    if (!idToUpdate || !nameToUpdate) {
      return updateCustomerByIdOutput!.innerText = "please enter Name AND ID"
    }

    try {
      const result = await fetch(`http://localhost:3000/customer/${idToUpdate}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: nameToUpdate })
      })
      const data = await result.text()
      console.log(data)
      updateCustomerByIdOutput!.innerHTML = `<p>${data}</p>`
      updateCustomerByIdInput.value = "";
      updateCustomerNameInput.value = ""

    } catch (error) {
      console.log(error)
    }
  })

  createCustomerBTN?.addEventListener("click", async function () {
    const createName = createCustomerNameInput.value
    const createMail = createCustomerMailInput.value

    if (!createName || !createMail) {
      return createCustomerOutput!.innerText = "please enter Name AND Email"
    }

    try {
      const result = await fetch(`http://localhost:3000/customer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: createName,
          email: createMail
        })
      })
      const data = await result.text()
      console.log(data)
      createCustomerOutput!.innerHTML = `<p>${data}</p>`
      createCustomerNameInput.value = "";
      createCustomerMailInput.value = ""
    } catch (error) {
      console.log(error)
    }

  })

}

init();