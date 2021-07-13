class Rock {

    static allRocks = []

    constructor({name, id, body, eyes, mouth, shows}){
        this.name = name
        this.id = id
        this.body = body
        this.eyes = eyes
        this.mouth = mouth
        this.shows = shows.map(show => new Show(show))
        Rock.allRocks.push(this)
    }


    appendRock(){
        const div = document.getElementById("rockContainer")
        const rockDiv = document.createElement("div")
        rockDiv.className = "rock-div"
        div.append(rockDiv)
        const rockBod = document.createElement("img")
        rockBod.src = `body/${this.body}.png`
        rockBod.className = "rock-body"
        const rockEyes = document.createElement("img")
        rockEyes.src = `eyes/${this.eyes}.png`
        rockEyes.className = "eyes"
        const rockMouth = document.createElement("img")
        rockMouth.src = `mouth/${this.mouth}.png`
        rockMouth.className = "mouth"
        const rockName = document.createElement("h2")
        rockName.innerText = `${this.name}`
        rockName.className = "h2 text-primary my-3 name"
        const deleteRock = document.createElement("button")
        deleteRock.innerText = "graduate"
        deleteRock.className = "btn btn-warning text-white delete border border-white"
        deleteRock.addEventListener("click", () => this.destroyRock(rockDiv))
        rockDiv.append(rockBod, rockEyes, rockMouth, rockName, deleteRock)
    }

    static fetchRocks(){
        return fetch("https://school-of-rock-api.herokuapp.com/rocks")
        // return fetch("http://localhost:3000/rocks")
        .then(jsonToJS)
        .then(this.appendRocks)

    }
    
    static appendRocks(rocks){
        rocks.sort((a, b) => { 
            if (a.name < b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }
              return 0
            
             })
        for (let rock of rocks){
            let newRock = new Rock(rock)
            newRock.appendRock()
        }
    }

    static postRock(e){
        e.preventDefault()
        let rockName = e.target.name.value
        let rockParts = document.querySelectorAll(".radio")
        let rockBody = ""
        let rockEyes = ""
        let rockMouth = ""
        
    
        for (let i = 0; i < rockParts.length; i++){
            if (rockParts[i].checked){
                if (rockParts[i].name === "body"){
                    rockBody = rockParts[i].value
                } else if (rockParts[i].name === "eyes"){
                    rockEyes = rockParts[i].value
                } else {  
                    rockMouth = rockParts[i].value
                }
            }
        }
        const body = {
            rock: {
            name: rockName,
            body: rockBody,
            eyes: rockEyes,
            mouth: rockMouth
        }}
        useAPI.postFetch("rocks", body)
        .then(rock => {
            if (!!rock.id) {
            let newRock = new Rock(rock)
            newRock.appendRock()
            newRock.appendShowsForRock()
            $('#createModal').modal('hide')
            newRock.welcome(newRock)
            } else {
                window.alert(rock["message"])
            }
        })
        .catch((err) => alert(err))
        e.target.reset()
    }

    welcome(rock){
        const nav = document.getElementById("mainNav")
        let alert = document.createElement("div")
        const gradAlert = `
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                Welcome, ${rock.name}!
                <br>
                <small>It's time for Show & Tell!</small>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            `
        alert.innerHTML = gradAlert
        nav.append(alert)
    }

    editShows(){
        showAndTellContainer.innerHTML = ""
        this.appendShowsForRock()
        const liCollection = document.querySelectorAll("li")
        const ul = document.querySelector("ul")
        ul.id = "show-list"
        for (let li of liCollection){
            if (!!li.id){
             const btn = document.createElement("button")
             btn.innerText = "take home"
             btn.className = "btn btn-warning btn-sm take-home"
             const show = this.shows.find(s => s.id == li.id)
             btn.addEventListener("click", () => show.destroyShow())
             li.className = "my-2"
             li.append(btn)
         }
        }
        Show.appendShowForm(this, ul)
     }

     appendShowsForRock(){
        const div = document.createElement("div")
        div.id = `rock-${this.id}-div`
        const intro = document.createElement("h4")
        intro.innerHTML = `${this.name} brought:`
        intro.className = `show-and-tell-intro`
        intro.addEventListener('click', () => this.editShows())
        const ul = document.createElement("ul")
        ul.id = `rock-${this.id}`
            if (this.shows.length !== 0)
            for (let show of this.shows){
                show.appendShow(ul)
            } else {
                const li = document.createElement("li")
                li.innerHTML = "nothing :("
                ul.appendChild(li)
            }
    
        showAndTellContainer.append(div)
        div.append(intro, ul)
    }


    destroyRock(rockDiv){
        useAPI.deleteFetch("rocks", this.id)
        .then(jsonToJS).then(message => this.graduate(message, rockDiv))
        .catch((err) => alert(err))
        Rock.allRocks = Rock.allRocks.filter(r => r !== Rock.allRocks.find(rock => rock.id == this.id)) 
        document.getElementById(`rock-${this.id}-div`).remove()
    }
    
    graduate(m, div){
        div.remove()
        const nav = document.getElementById("mainNav")
        let alert = document.createElement("div")
        const gradAlert = `
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>Congrats!</strong>
                <br> 
                <small>${m.message}</small>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            `
        alert.innerHTML = gradAlert
        nav.append(alert)
    }

}



