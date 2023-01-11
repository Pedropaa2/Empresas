function getUser(){
    const user = JSON.parse(localStorage.getItem("@kenzie:empresa:User"))

    return user
}
function getUserRegistered(){
  const user = JSON.parse(localStorage.getItem("@kenzie:empresa:register"))
  return user
}

function openAndCloseNav (){
  const nav =  document.querySelector("nav")
  const abre = document.querySelector(".abre")

  abre.addEventListener("click",()=>{
      
      if (nav.classList=="fechado"){
          nav.className = "aberto"
          abre.src = "../pages/assets/vector.svg"
      }else {
          nav.className = "fechado"
          abre.src = "../pages/assets/hrmburgue.svg"
      }
  })
}
async function login(data){
    const loginData = await fetch(`http://localhost:6278/auth/login`,{
      method:`Post`,
      headers:{
        "Content-Type" : "application/json"
      } ,
      body: JSON.stringify(data)
       
    })
    .then(res=> res.json())
    .catch(err => console.log(err))

    return loginData
}
async function createUser(data){
  const userData = await fetch(`http://localhost:6278/auth/register`, {
    method:`Post`,
      headers:{
        "Content-Type" : "application/json"
      } ,
      body: JSON.stringify(data)
       
    })
    .then(res=>res.json())
    .catch (err=> alert(err))
    return userData
  }

  function redirecionar (){
    const buttons = document.querySelectorAll("button")

    buttons.forEach(button => {
      button.addEventListener("click",() => {
        if (button.className=="home" || button.className=="return_Button"){
          location.replace("./index.html")
        }else if (button.className == "login"){
          location.replace("./login.html")
        }else if (button.className == "register"  || button.className == "register_Button"  )
        location.replace("./register.html")
      })
    });
  }

  function redirecionarIndex (){
    const buttons = document.querySelectorAll("button")

    buttons.forEach(button => {
      button.addEventListener("click",() => {
         if (button.className == "login"){
          location.replace("./login.html")
        }else if (button.className == "register"  || button.className == "register_Button"  )
        location.replace("./register.html")
      })
    });
  }
   async function isAdm() {
    try {
        let localStorageValue = getUser()
        
        const request = await fetch(`http://localhost:6278/auth/validate_user`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorageValue.token}`
            }
        })
        const response = await request.json()
        
        
        if (response.is_admin === false){
          
          location.replace("./user.html")

        }else if (response.is_admin){
          location.replace("./admin.html")
        }
        return response
    } catch (err) {
        console.log("erro")
        
    }
}
async function alreadyRegistered() {
  try {
      let localStorageValue = getUser()
      
      const request = await fetch(`http://localhost:6278/auth/validate_user`, {
          method: "GET",
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorageValue.token}`
          }
      })
      const response = await request.json()
      
      
      if (response.is_admin === false && window.location.pathname != "/pages/user.html" ){
        
        location.replace("./user.html")
        
      }else if (response.is_admin === true  && window.location.pathname != "/pages/admin.html" ){
        
        location.replace("./admin.html")
      }
      
  } catch (err) {
      console.log("error")
      
  }
}

async function alreadyLogged() {
  try {
      let localStorageValue = getUser()
      
      const request = await fetch(`http://localhost:6278/users/profile`, {
          method: "GET",
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorageValue.token}`
          }
      })
      const response = await request.json()
      
      
      
      localStorage.setItem("@kenzie:empresa:register",JSON.stringify(response))
      
      return response
  } catch (err) {
      console.log("error")
      
  }
}

async function notLogged () {
  const localStorageValue = getUser()  || []

  const request = await fetch(`http://localhost:6278/users/profile`, {
          method: "GET",
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorageValue.token}`
          }
      })
      const response = await request.json()

      if (response.error == "invalid token"){
          location.replace("./index.html")
      }
      

}
async function getEmpresasPorSetor(setor){
  const request = await fetch(`http://localhost:6278/companies/${setor}`, {
          method: "GET",
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer null`
          }
      })
      const response = await request.json()
      response.forEach(element => {
        
        renderEmpresa(element)
      });
      return response
}

async function getTodasEmpresas(){
  const request = await fetch(`http://localhost:6278/companies`, {
          method: "GET",
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer null`
          }
      })
      const response = await request.json()
      response.forEach(element => {
        renderEmpresa(element)
      });
}

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
async function atualiza(loginUser){
  const localStorageValue = getUser()  || []
  const request = await fetch(`http://localhost:6278/users
  `, {
          method: "PATCH",
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorageValue.token}`
          },
          body: JSON.stringify(loginUser)
      })
      const response = await request.json()
      console.log(response)
      if (typeof response === "object"){
        location.reload()
      }else{
        alert(response)
      }
      
      return response
}
async function checkColleagues(){
  const localStorageValue = getUser()  
  const request = await fetch(`http://localhost:6278/users/departments/coworkers`, {
          method: "GET",
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorageValue.token}`
          }
      })
      const response = await request.json()
      
      return response
}
async function checkLoggedDepartmentInfo(){
  const localStorageValue = getUser()  
  const request = await fetch(`http://localhost:6278/users/departments`, {
          method: "GET",
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorageValue.token}`
          }
      })
      const response = await request.json()
      
      return response
}
function logout(){
  const button = document.querySelector(".logout")

  button.addEventListener("click",()=>{
      window.localStorage.clear()
      location.replace("./index.html")

  })
}

export {
  login,
  createUser,
  redirecionar,
  redirecionarIndex,
  openAndCloseNav,
  getUser,
  isAdm, 
  alreadyLogged,
  alreadyRegistered,
  notLogged,
  getEmpresasPorSetor,
  getTodasEmpresas,
  getUserRegistered,
  atualiza,
  checkColleagues,
  checkLoggedDepartmentInfo,
  logout
} 


