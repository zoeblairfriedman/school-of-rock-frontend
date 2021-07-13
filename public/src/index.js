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
    const url = "file:///Users/ZBF/Development/code/school-of-rock-frontend-heroku/"
    logo.src === `${url}logo.png` ? logo.src = `${url}literal-logo.png` : logo.src = `${url}logo.png`
}

logo.addEventListener("click", () => clearTimeout(flash))



