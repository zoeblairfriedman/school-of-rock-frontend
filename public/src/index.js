const useAPI = new API()

const rockForm = document.getElementById("rockForm")
rockForm.addEventListener('submit', Rock.postRock)



function jsonToJS(r){
    return r.json()
}

Rock.fetchRocks().then(Show.appendShows)

let flash = setInterval(flashLogo, 1000)

const logo = document.getElementById("logo")
function flashLogo(){
    debugger
    logo.src === "./logo.png" ? logo.src = "./literal-logo.png" : logo.src = "./logo.png"
}


logo.addEventListener("click", () => clearTimeout(flash))



