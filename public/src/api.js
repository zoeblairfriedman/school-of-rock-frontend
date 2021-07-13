class API {

// figure this out eventually please:
    // constructor(){
    //     this.baseUrl = "http://locahost:3000/"
    // }

    postFetch(resource, body){
       return fetch(`https://school-of-rock-api.herokuapp.com/${resource}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
        },
        body: JSON.stringify(body)
        })
        .then(jsonToJS)

    }

    deleteFetch(resource, id){
        return fetch(`https://school-of-rock-api.herokuapp.com/${resource}/${id}`, {
            method: "DELETE"
        })
        
    }
}