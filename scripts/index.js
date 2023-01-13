import{redirecionarIndex,openAndCloseNav,alreadyLogged,alreadyRegistered,getEmpresasPorSetor,getTodasEmpresas} from "./requests.js"

alreadyRegistered()
alreadyLogged()
openAndCloseNav()
redirecionarIndex()

function renderEmpresa (element){
    const ul = document.querySelector("ul")
  
    
  
    const li = document.createElement("li")
  
    ul.appendChild(li)
  
    const h3 = document.createElement("h3")
    h3.innerText = `${element.name}`
    li.appendChild(h3)
  
    const div = document.createElement("div")
    div.classList.add("container")
    li.appendChild(div)
  
    const pCarga = document.createElement("p")
    pCarga.innerText=`${element.opening_hours}`
    pCarga.classList.add("carga")
    div.appendChild(pCarga)
  
    const pTag = document.createElement("p")
    pTag.classList.add("tag")
    pTag.innerText=`${element.sectors.description}`
    div.appendChild(pTag)
  }
  async function response (){
    const select = document.querySelector("select")
    const ul = document.querySelector("ul")
    const resposta = await getEmpresasPorSetor(select.value)
    if (select.value == "Todos"){
        renderTodasEmpresas()
    }else {
        ul.innerHTML=""
        console.log(resposta)
        resposta.forEach(element => {
            renderEmpresa(element)
      });
}
 }
async function renderEmpresas(){
    const select = document.querySelector("select")
    
    select.addEventListener("change",() =>{
        
        response()
    })
    
}
async function renderTodasEmpresas(){
    const response = await getTodasEmpresas()
    console.log(response)
    response.forEach(element => {
        renderEmpresa(element)
      });
}


renderTodasEmpresas()
renderEmpresas()