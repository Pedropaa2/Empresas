
import { login,redirecionar,openAndCloseNav,isAdm,alreadyRegistered} from "./requests.js"





function loginForm(){
    const inputs = document.querySelectorAll("input")
    const button = document.querySelector(".login_Button")
    const loginuser = {}

    button.addEventListener("click", async (event) =>{
        event.preventDefault()
        inputs.forEach(input=> {
        loginuser[input.id] = input.value   
        })
        const request = await login(loginuser)
        console.log(request)
        localStorage.setItem("@kenzie:empresa:User",JSON.stringify(request))
        isAdm()
        if (request.error){
            alert(request.error)
        }
    })
}
alreadyRegistered()
loginForm()
redirecionar()
openAndCloseNav()

