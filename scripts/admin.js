import { alreadyRegistered, logout, notLogged, getTodasEmpresas, checkDepartamentoEmpresa, getAllDepartments, getAllUsers, createDepartmentApi, deletarDepartamento, naosei, getOutOfWork, contratar, dismissUser, deletarUsuário, editUserAdmin } from "./requests.js"

async function selectOptions() {
    const todasEmpresas = await getTodasEmpresas()


    todasEmpresas.forEach(empresa => {
        renderSelectOptions(empresa)
    });
}
function renderSelectOptions(value) {
    const select = document.querySelector("select")
    const option = document.createElement("option")
    option.innerText = value.name
    option.value = value.name
    option.id = value.uuid
    select.appendChild(option)
}
async function selectOptionsModal() {
    const todasEmpresas = await getTodasEmpresas()


    todasEmpresas.forEach(empresa => {
        renderSelectOptionsModal(empresa)
    });
}
function renderSelectOptionsModal(value) {
    const select = document.querySelector(".modalSelect")
    const option = document.createElement("option")
    option.innerText = value.name
    option.value = value.name
    option.id = value.uuid
    select.appendChild(option)
}

async function createLiDepartments() {
    const select = document.querySelector("select")
    const options = document.querySelectorAll("option")
    const result = [...options].filter(option => select.value == option.value);
    const response = await checkDepartamentoEmpresa(result[0].id)
    const ul = document.querySelector(".departments_Container")
    response.forEach(element => {

        const li = document.createElement("li")
        ul.appendChild(li)

        const name = document.createElement("p")
        name.classList.add("nomeDepartamento")
        name.innerText = element.name
        li.appendChild(name)

        const description = document.createElement("p")
        description.innerText = element.description
        li.appendChild(description)

        const companyName = document.createElement("p")
        companyName.innerText = element.companies.name
        li.appendChild(companyName)

        const div = document.createElement("div")
        li.appendChild(div)
        div.classList.add("edit")

        const imgUm = document.createElement("img")
        imgUm.src = "../../pages/assets/olho.svg"
        imgUm.classList.add("olho")
        imgUm.dataset.name = element.name
        imgUm.id = element.uuid
        imgUm.dataset.id = element.companies.name
        imgUm.dataset.class = element.description


        div.appendChild(imgUm)

        const imgDois = document.createElement("img")
        imgDois.src = "../../pages/assets/lapis preto.svg"
        imgDois.id = element.uuid
        imgDois.dataset.id = element.description
        imgDois.classList.add("editDepart")

        div.appendChild(imgDois)

        const imgTres = document.createElement("img")
        imgTres.src = "./assets/lixeira.svg "
        imgTres.id = element.uuid
        imgTres.dataset.id = element.name
        imgTres.classList.add("lixeiraDepart")
        div.appendChild(imgTres)
    });


}
async function renderAllDepartments() {
    const response = await getAllDepartments()
    const ul = document.querySelector(".departments_Container")
    response.forEach(element => {
        const li = document.createElement("li")
        ul.appendChild(li)

        const name = document.createElement("p")
        name.classList.add("nomeDepartamento")
        name.innerText = element.name
        li.appendChild(name)

        const description = document.createElement("p")
        description.innerText = element.description
        li.appendChild(description)

        const companyName = document.createElement("p")
        companyName.innerText = element.companies.name
        li.appendChild(companyName)

        const div = document.createElement("div")
        div.classList.add("edit")

        li.appendChild(div)

        const imgUm = document.createElement("img")
        imgUm.src = "../../pages/assets/olho.svg"
        imgUm.classList.add("olho")
        imgUm.dataset.name = element.name
        imgUm.id = element.uuid
        imgUm.dataset.id = element.companies.name
        imgUm.dataset.class = element.description
        div.appendChild(imgUm)

        const imgDois = document.createElement("img")
        imgDois.src = "../../pages/assets/lapis preto.svg"
        imgDois.id = element.uuid
        imgDois.classList.add("editDepart")
        imgDois.dataset.id = element.description
        div.appendChild(imgDois)

        const imgTres = document.createElement("img")
        imgTres.src = "./assets/lixeira.svg "
        imgTres.classList.add("lixeiraDepart")
        imgTres.id = element.uuid
        imgTres.dataset.id = element.name
        div.appendChild(imgTres)




    });


}
async function renderEmpresaDepartments() {
    const select = document.querySelector("select")
    const ul = document.querySelector(".departments_Container")

    select.addEventListener("change", () => {
        if (select.value != "Selecionar Empresa") {

            ul.innerHTML = ""
            createLiDepartments()
            setTimeout(deleteDepartment, 500);
            setTimeout(editDepartment, 550)
            setTimeout(contratarERemover, 600)
        } else {
            ul.innerHTML = ""
            renderAllDepartments()
            setTimeout(deleteDepartment, 500);
            setTimeout(editDepartment, 550)
            setTimeout(contratarERemover, 600)

        }



    })

}
async function renderAllUsers() {
    const ul = document.querySelector(".users_Container")

    const response = await getAllUsers()
    const responseDois = await getAllDepartments()
    response.forEach(element => {
        const li = document.createElement("li")

        ul.appendChild(li)

        const name = document.createElement("p")
        name.classList.add("nomeDepartamento")
        name.innerText = element.username[0].toUpperCase() + element.username.slice(1)
        li.appendChild(name)

        const description = document.createElement("p")
        description.innerText = element.professional_level
        li.appendChild(description)



        if (element.department_uuid != null) {

            responseDois.forEach(elementdois => {
                if (elementdois.uuid == element.department_uuid) {
                    const companyName = document.createElement("p")
                    companyName.innerText = elementdois.companies.name
                    li.appendChild(companyName)
                }
            });
        } else {
            const companyName = document.createElement("p")
            companyName.innerText = "Não foi contratado"
            li.appendChild(companyName)
        }

        const div = document.createElement("div")
        div.classList.add("edit")

        li.appendChild(div)

        const imgDois = document.createElement("img")
        imgDois.src = "../../pages/assets/lapis preto.svg"
        imgDois.dataset.id = element.uuid
        imgDois.classList.add("editUser")
        div.appendChild(imgDois)

        const imgTres = document.createElement("img")
        imgTres.classList.add("deleteUser")
        imgTres.dataset.id = element.uuid
        imgTres.dataset.class = element.username
        imgTres.src = "./assets/lixeira.svg "
        div.appendChild(imgTres)





    });
}
async function getEmpresaID(nome) {
    const response = await getTodasEmpresas()


    response.forEach(async element => {
        if (element.name == nome) {
            const variavel = element.uuid



            const button = document.querySelector(".submitt")
            button.id = variavel
        }
    });
}

function createDepartment() {
    const button = document.querySelector(".criar")
    const dialog = document.querySelector("dialog")
    const newDepartment = {}

    button.addEventListener("click", (event) => {
        event.preventDefault()
        dialog.innerHTML = ""

        const div = document.createElement("div")
        div.classList.add("dialog_Container")
        dialog.appendChild(div)

        const h2 = document.createElement("h2")
        h2.classList.add("h2Create")
        h2.innerText = "Criar Departamento"


        const close = document.createElement("img")
        close.src = "./assets/Vector.svg"
        close.classList.add("closeModal")

        const departmentName = document.createElement("input")
        departmentName.placeholder = "Nome do departamento"
        departmentName.id = "name"

        const description = document.createElement("input")
        description.placeholder = "Descrição"
        description.id = "description"

        const selected = document.createElement("select")
        selected.id = "company_uuid"
        selected.classList.add("modalSelect")


        selectOptionsModal()

        const buttondois = document.createElement("button")
        buttondois.classList.add("submitt")
        buttondois.innerText = "Criar o Departamento"

        buttondois.addEventListener("click", async () => {
            newDepartment[departmentName.id] = departmentName.value
            newDepartment[description.id] = description.value


            await getEmpresaID(selected.value)

            newDepartment[selected.id] = buttondois.id



            await createDepartmentApi(newDepartment)



        })

        div.append(h2, close, departmentName, description, selected, buttondois)

        dialog.showModal()

        closeModal()

    })
}

function closeModal() {
    const close = document.querySelector(".closeModal")
    const dialog = document.querySelector("dialog")
    close.addEventListener("click", () => {

        dialog.close()
        location.reload()
    })
}
function deleteDepartment() {
    const dialog = document.querySelector("dialog")

    const buttons = document.querySelectorAll(".lixeiraDepart")


    buttons.forEach(button => {
        button.addEventListener("click", async () => {
            dialog.innerHTML = ""
            console.log("alo")
            const div = document.createElement("div")
            div.classList.add("deleteDepartment_Container")
            dialog.appendChild(div)

            const h2 = document.createElement("h2")
            h2.classList.add("text_Delete")
            h2.innerText = `Realmente deseja deletar o Departamento ${button.dataset.id} e demitir seus funcionários?`

            const close = document.createElement("img")
            close.src = "./assets/Vector.svg"
            close.classList.add("closeModal")

            const buttondois = document.createElement("button")
            buttondois.innerText = "Confirmar"
            buttondois.classList.add("confirm")

            buttondois.addEventListener("click", async (event) => {
                event.preventDefault()
                await deletarDepartamento(button.id)

            })

            div.append(h2, close, buttondois)


            dialog.showModal()
            closeModal()
        })
    });
}
function editDepartment() {
    const dialog = document.querySelector("dialog")
    const buttons = document.querySelectorAll(".editDepart")

    const data = {}

    buttons.forEach(button => {
        button.addEventListener("click", async () => {
            dialog.innerHTML = ""

            const div = document.createElement("div")
            div.classList.add("edit_Container")
            dialog.appendChild(div)

            const h2 = document.createElement("h2")
            h2.classList.add("text_Edit")
            h2.innerText = `Editar Departamento`

            const close = document.createElement("img")
            close.src = "./assets/Vector.svg"
            close.classList.add("closeModal")

            const textarea = document.createElement("textarea")
            textarea.placeholder = button.dataset.id
            const buttondois = document.createElement("button")
            buttondois.innerText = "Salvar alterações"
            buttondois.classList.add("save")

            buttondois.addEventListener("click", async (event) => {
                event.preventDefault()

                data.description = textarea.value

                naosei(data, button.id)




            })

            div.append(h2, close, textarea, buttondois)


            dialog.showModal()
            closeModal()
        })
    });


}
async function createOptions() {
    const variavel = await getOutOfWork()
    const select = document.querySelector(".desempregados")

    variavel.forEach(element => {
        const option = document.createElement("option")
        option.innerText = element.username
        option.id = element.uuid
        select.appendChild(option)

    });
}
async function contratarERemover() {
    const dialog = document.querySelector("dialog")
    const buttons = document.querySelectorAll(".olho")
    const info = {}
    buttons.forEach(async button => {


        button.addEventListener("click", async () => {
            const id = await getAllDepartmentUsers(button.id)
            dialog.innerHTML = ""
            const div = document.createElement("div")
            div.classList.add("contratar_Container")
            dialog.appendChild(div)

            const h2 = document.createElement("h2")
            h2.classList.add("nomeDepart")
            h2.innerText = button.dataset.name

            const pDescription = document.createElement("p")
            pDescription.innerText = button.dataset.class
            pDescription.classList.add("pDescription")

            const pName = document.createElement("p")
            pName.innerText = button.dataset.id
            pName.classList.add("pName")

            const close = document.createElement("img")
            close.src = "./assets/Vector.svg"
            close.classList.add("closeModal")

            const select = document.createElement("select")
            select.classList.add("desempregados")

            const buttondois = document.createElement("button")
            buttondois.innerText = "Contratar"
            buttondois.classList.add("hire")

            const ulDois = document.createElement("ul")
            ulDois.classList.add("departmentUsers")

            if (id.length <= 0) {

                const h2Vazio = document.createElement("h2")
                ulDois.classList.add("ulVazia")
                h2Vazio.classList.add("pVazio")
                h2Vazio.innerText = "Não há usuários empregados nesse departamento"
                ulDois.appendChild(h2Vazio)
            }



            id.forEach(element => {
                if (id.length > 0) {

                    ulDois.appendChild(createLi(element, button))

                }

            });

            createOptions()

            buttondois.addEventListener("click", async (event) => {
                const ulRefresh = document.querySelector(".departmentUsers")
                var idDois = select.options[select.selectedIndex].id
                info.user_uuid = idDois
                info.department_uuid = button.id
                select.innerHTML = ""
                contratar(info)
                setTimeout(createOptions, 400);

                setTimeout(async () => {
                    const ulRefresh = document.querySelector(".departmentUsers")
                    ulRefresh.innerHTML = ""
                    const idDef = await getAllDepartmentUsers(button.id)
                    idDef.forEach(element => {
                        ulDois.appendChild(createLi(element, button))
                    });

                }, 400);


                setTimeout(async () => {
                    desligarButton()
                }, 500);

                ulDois.classList.remove("ulVazia")
                renderAllUsers()
                renderAllDepartments()
            })

            div.append(h2, pDescription, pName, close, select, buttondois, ulDois)


            dialog.showModal()
            closeModal()

            setTimeout(async () => {
                desligarButton()
            }, 500);
        })
    });


}
function createLi(element, button) {

    const lidois = document.createElement("li")
    lidois.id = element.uuid
    lidois.classList.add("liDois")
    const pUserName = document.createElement("p")
    pUserName.classList.add("pDesligamento")
    pUserName.innerText = element.username

    const plevel = document.createElement("p")
    plevel.innerText = element.kind_of_work

    const pCompany = document.createElement("p")
    pCompany.innerText = button.dataset.name

    const buttontres = document.createElement("button")
    buttontres.classList.add("desligar")
    buttontres.id = element.uuid
    buttontres.innerText = "Desligar"

    lidois.append(pUserName, plevel, pCompany, buttontres)

    return lidois
}

async function desligarButton() {

    const select = document.querySelector(".desempregados")
    const buttons = document.querySelectorAll(".desligar")
    buttons.forEach(element => {

        const li = document.getElementById(`${element.id}`)
        element.addEventListener("click", (event) => {
            const ul = document.querySelector(".departmentUsers")
            const select = document.querySelector(".desempregados")
            event.preventDefault()
            dismissUser(element.id)
            select.innerHTML = ""
            setTimeout(createOptions, 400)

            li.remove()







        })

    });
}
async function getAllDepartmentUsers(id) {
    const allUsers = await getAllUsers()
    const array = []
    allUsers.forEach(element => {
        if (element.department_uuid == id) {
            array.push(element)
        }

    });
    return array
}
async function deletarFuncionário() {
    const dialog = document.querySelector("dialog")
    const buttons = document.querySelectorAll(".deleteUser")

    buttons.forEach(button => {

        button.addEventListener("click", async () => {
            dialog.innerHTML = ""

            const div = document.createElement("div")
            div.classList.add("deleteDepartment_Container")
            dialog.appendChild(div)

            const h2 = document.createElement("h2")
            h2.classList.add("text_Delete")
            h2.innerText = `Realmente deseja remover o usuário ${button.dataset.class} `

            const close = document.createElement("img")
            close.src = "./assets/Vector.svg"
            close.classList.add("closeModal")

            const buttondois = document.createElement("button")
            buttondois.innerText = "Deletar"
            buttondois.classList.add("confirm")

            buttondois.addEventListener("click", async (event) => {
                event.preventDefault()
                console.log("alo")
                console.log(button.dataset.id)
                await deletarUsuário(button.dataset.id)

            })

            div.append(h2, close, buttondois)


            dialog.showModal()
            closeModal()
        })
    });
}
async function editUser() {
    const dialog = document.querySelector("dialog")
    const buttons = document.querySelectorAll(".editUser")
    const obj = {}
    buttons.forEach(button => {
        button.addEventListener("click", async (event) => {
            event.preventDefault()
            dialog.innerHTML = ""

            const div = document.createElement("div")
            div.classList.add("dialog_Container")
            dialog.appendChild(div)

            const h2 = document.createElement("h2")
            h2.classList.add("editProfile")
            h2.innerText = "Editar usuário"


            const close = document.createElement("img")
            close.src = "./assets/Vector.svg"
            close.classList.add("closeModal")



            const modalidade = document.createElement("select")
            modalidade.classList.add("selectEdit")

            const escolher = document.createElement("option")
            escolher.innerText = "Selecionar modalidade de trabalho"

            const homeoffice = document.createElement("option")
            homeoffice.innerText = "home office"

            const presencial = document.createElement("option")
            presencial.innerText = "presencial"

            const hibrido = document.createElement("option")
            hibrido.innerText = "hibrido"
            modalidade.append(escolher, homeoffice, presencial, hibrido)

            const nivel = document.createElement("select")
            nivel.classList.add("selectEdit")

            const estagio = document.createElement("option")
            estagio.innerText = "estágio"

            const junior = document.createElement("option")
            junior.innerText = "júnior"

            const pleno = document.createElement("option")
            pleno.innerText = "pleno"
            const senior = document.createElement("option")
            senior.innerText = "sênior"
            const escolha = document.createElement("option")
            escolha.innerText = "Selecione nível profissional"

            nivel.append(escolha, estagio, junior, pleno, senior)





            const buttondois = document.createElement("button")
            buttondois.classList.add("submit")
            buttondois.innerText = "Editar"
            buttondois.addEventListener("click", async () => {


                obj.kind_of_work = modalidade.value
                obj.professional_level = nivel.value

                await editUserAdmin(button.dataset.id, obj)







            })

            div.append(h2, close, modalidade, nivel, buttondois)

            dialog.showModal()

            closeModal()
        })
    });
}


renderAllUsers()
renderAllDepartments()

createDepartment()
renderEmpresaDepartments()
notLogged()
alreadyRegistered()
logout()
selectOptions()
setTimeout(deleteDepartment, 500);
setTimeout(editDepartment, 550)
setTimeout(contratarERemover, 600)
setTimeout(deletarFuncionário, 500);
setTimeout(editUser, 500);
