import { createUser, redirecionar, openAndCloseNav, alreadyRegistered, alreadyLogged } from "./requests.js"

function createUserForm() {
   const inputs = document.querySelectorAll("input")
   const button = document.querySelector(".register_Btn")
   const select = document.querySelector("select")
   const newUser = {}

   button.addEventListener("click", async (event) => {
      event.preventDefault()

      inputs.forEach(input => {
         newUser[input.id] = input.value
      })
      newUser["professional_level"] = select.value
      const request = await createUser(newUser)
      localStorage.setItem("@kenzie:empresa:register", JSON.stringify(request))

      const user = JSON.parse(localStorage.getItem("@kenzie:empresa:register"))
      if (user.error && user.error.length > 0) {
         alert(user.error)
      } else {
         location.replace("./login.html")
      }



   })

   return newUser
}
alreadyLogged()
alreadyRegistered()
redirecionar()
createUserForm()
openAndCloseNav()

