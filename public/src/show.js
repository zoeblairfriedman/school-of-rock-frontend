const showAndTellContainer = document.getElementById("showAndTellContainer")


class Show {


     constructor(show){
         this.name = show.name
         this.id = show.id
         this.rockId = show.rockId
     }

     static appendShowForm(rock, ul){
        const showForm = `
            <form id="showForm">
                <label>What did ${rock.name} bring today? </label>
                <input id="showContent"/>
                <input type="hidden" id= ${rock.id}>
                <input type="submit" class="btn btn-primary"></input>
            </form>
            `
        let div = document.createElement("div")
        div.innerHTML = showForm
        showAndTellContainer.append(div)
        document.getElementById('showForm').addEventListener('submit', Show.addShow)
        document.getElementById('closeModal').addEventListener('click', function(){
            let container = document.getElementById('showAndTellContainer')
            container.innerHTML = ""
            Show.appendShows()
        })
    }

    static appendShows(){
        for (let rock of Rock.allRocks){
            rock.appendShowsForRock()
        }
    }

    appendShow(ul){
        const li = document.createElement("li")
        li.innerHTML = this.name
        li.id = this.id
        ul.appendChild(li)
    }

    destroyShow(){
        useAPI.deleteFetch("shows", this.id)
        .then(() => {
          this.takeHome()
          Rock.allRocks.find(rock => rock.id == this.rockId).shows = Rock.allRocks.find(rock => rock.id == this.rockId).shows.filter(show => show.id !== this.id)
          document.getElementById(this.id).remove()
        })
        .catch((err) => alert(err))
    }
    
    takeHome(){
        showAndTellContainer.innerHTML = ""
        Show.appendShows()
    }

    static addShow(e){ 
        e.preventDefault()
        const showName = e.target.children[1].value
        const rockId = e.target.children[2].id

        const body = {
            show: {
            name: showName,
            rock_id: rockId
        }}
        useAPI.postFetch("shows", body)
        .then(show => {
            let newShow = new Show(show)
            newShow.rockId = show.rock_id
            if (!!newShow.id){
                let ul = document.getElementById(`show-list`)
                const thisRock = Rock.allRocks.find(r => r.id === show.rock_id)
                thisRock.shows.push(newShow)
                showAndTellContainer.innerHTML = ""
                Show.appendShows()
            } else {
                window.alert(show.message)
            }
        })
        .catch((err) => alert(err))
    }

    }

