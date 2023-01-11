import{redirecionarIndex,openAndCloseNav,alreadyLogged,alreadyRegistered,getEmpresasPorSetor,getTodasEmpresas} from "./requests.js"

alreadyRegistered()
alreadyLogged()
openAndCloseNav()
redirecionarIndex()
getTodasEmpresas()

function renderEmrpesas(){
    const select = document.querySelector("select")
    const ul = document.querySelector("ul")
    select.addEventListener("change",() =>{


        if (select.value == "Todos"){
            getTodasEmpresas()
        }else {
            ul.innerHTML=""
        getEmpresasPorSetor(select.value)
        }
    })
    
}

renderEmrpesas()