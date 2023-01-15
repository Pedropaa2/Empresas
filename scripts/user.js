import { alreadyRegistered, notLogged, getUserRegistered, alreadyLogged, atualiza, checkColleagues, checkLoggedDepartmentInfo, logout } from "./requests.js"
function openModal() {
    const openDialog = document.querySelector(".lapis")
    const dialog = document.querySelector("dialog")

    openDialog.addEventListener("click", (event) => {

        event.preventDefault()
        dialog.showModal()
    })
}


function closeModal() {
    const close = document.querySelector(".closeModal")
    const dialog = document.querySelector("dialog")
    close.addEventListener("click", () => {

        dialog.close()
    })
}
function renderInformations() {
    const username = document.querySelector(".username")
    const email = document.querySelector(".email")
    const professional = document.querySelector(".professional")
    const kindOfWork = document.querySelector(".kindOfWork")
    const user = getUserRegistered()
    email.innerText = `${user.email}`
    professional.innerHTML = `${user.professional_level}`
    kindOfWork.innerText = `${user.kind_of_work}`
    username.innerText = `${user.username.toUpperCase()}`

}

function atualizarPerfil() {
    const inputs = document.querySelectorAll("input")
    const button = document.querySelector(".edit")
    const loginUser = {}

    button.addEventListener("click", () => {
        inputs.forEach(input => {
            loginUser[input.className] = input.value
        });

        atualiza(loginUser)
        alreadyLogged()
        renderInformations()
    })


}
async function renderColleagues() {
    const arrayColleagues = await checkColleagues()
    const empresaFuncionario = await checkLoggedDepartmentInfo()
    const ul = document.querySelector("ul")
    const section = document.querySelector(".colegas")
    console.log(arrayColleagues)

    if (arrayColleagues.length == 0) {
        ul.innerHTML = ""

        const h2 = document.createElement("h2")
        h2.classList.add("notFound")
        h2.innerText = "Você ainda não foi contratado"
        ul.appendChild(h2)

        section.id = "section_Vazia"
    } else if (arrayColleagues.length > 0) {

        ul.innerHTML = ""
        const div = document.querySelector(".name_Hide")
        div.className = "name_Show"
        arrayColleagues.forEach(element => {
            console.log(element)
            const nameAndDepartment = document.querySelector(".nameAndDepartment")
            nameAndDepartment.innerText = `${empresaFuncionario.name} - ${element.name} `

            element.users.forEach(element => {
                const emailUser = document.querySelector(".email")
                if (element.email != emailUser.innerText) {

                    const li = document.createElement("li")
                    ul.appendChild(li)

                    const name = document.createElement("p")
                    name.innerText = `${element.username[0].toUpperCase() + element.username.slice(1)}`
                    name.classList.add("name")

                    const level = document.createElement("p")
                    level.innerText = `${element.professional_level}`

                    ul.classList.remove("vazio_Container")
                    ul.classList.add("colegas_Depart")
                    li.appendChild(name)
                    li.appendChild(level)
                }

            });


        });

    }
}

await alreadyLogged()
notLogged()
alreadyRegistered()
openModal()
closeModal()
atualizarPerfil()
renderInformations()
renderColleagues()
logout()



