import {alreadyRegistered, notLogged,getUserRegistered,alreadyLogged, atualiza} from "./requests.js"
function openModal (){
    const openDialog = document.querySelector(".lapis")
    const dialog = document.querySelector("dialog")

    openDialog.addEventListener("click",(event)=>{
        
        event.preventDefault()
        dialog.showModal()
    })
}


function closeModal(){
    const close = document.querySelector(".closeModal")
    const dialog = document.querySelector("dialog")
    close.addEventListener("click",() =>{
        
    dialog.close()
    })
}
function renderInformations(){
    const username = document.querySelector(".username")
    const email = document.querySelector(".email")
    const professional = document.querySelector(".professional")
    const kindOfWork = document.querySelector(".kindOfWork")
    const user = getUserRegistered()
    email.innerText = `${user.email}`
    professional.innerHTML = `${user.professional_level}`
    kindOfWork.innerText=`${user.kind_of_work}`
    username.innerText = `${user.username.toUpperCase()}`

}

 function  atualizarPerfil(){
    const inputs = document.querySelectorAll("input")
    const button = document.querySelector(".edit")
    const loginUser = {}
    
    button.addEventListener("click",() => {
        inputs.forEach(input => {
            loginUser[input.className] = input.value
        });
        
          atualiza(loginUser)
          alreadyLogged()
          renderInformations()
    } )


}
await alreadyLogged()
notLogged()
alreadyRegistered()
openModal()
closeModal()
atualizarPerfil()
renderInformations()

