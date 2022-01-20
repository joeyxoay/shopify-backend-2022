const api = "http://localhost:3000/";

export async function addItem(body, successCallback, failCallback) {
    var jsonBody = {
        "title": body.title,
        "description": body.description,
        "price": body.price,
        "quantity": body.quantity
    }
	await fetch(api + "additem", {
        method: 'POST',
        body: JSON.stringify(jsonBody),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json', 
        }
    })
	.then(res => {
        if(res.status != 200){
            failCallback(res.statusText)
        }else{
            res.json()
            .then(jsonRes => {
                successCallback(res.statusText);
            })
        }
	})
	.catch(error => console.log(error));
}

export async function editItem(body, successCallback, failCallback) {
    var jsonBody = {
        "title": body.title,
        "description": body.description,
        "price": body.price,
        "quantity": body.quantity,
        "id": body.id
    }
	await fetch(api + "edititem/" + jsonBody.id, {
        method: 'PUT',
        body: JSON.stringify(jsonBody),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json', 
        }
    })
	.then(res => {
        if(res.status != 200){
            failCallback(res.statusText)
        }else{
            res.json()
            .then(jsonRes => {
                successCallback(res.statusText);
            })
        }
	})
	.catch(error => console.log(error));
}

export async function deleteItem(body, successCallback, failCallback) {
    var jsonBody = {
        "id": body.id,
        "comment": body.comment
    }
	await fetch(api + "deleteItem/" + jsonBody.id, {
        method: 'PUT',
        body: JSON.stringify(jsonBody),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json', 
        }
    })
	.then(res => {
        if(res.status != 200){
            failCallback(res.statusText)
        }else{
            res.json()
            .then(jsonRes => {
                successCallback(res.statusText);
            })
        }
	})
	.catch(error => console.log(error));
}

export async function undeleteItem(body, successCallback, failCallback) {
    var jsonBody = {
        "id": body.id
    }
	await fetch(api + "restoreItem/" + jsonBody.id, {
        method: 'PUT',
        body: JSON.stringify(jsonBody),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json', 
        }
    })
	.then(res => {
        if(res.status != 200){
            failCallback(res.statusText)
        }else{
            res.json()
            .then(jsonRes => {
                successCallback(res.statusText);
            })
        }
	})
	.catch(error => console.log(error));
}

export async function getItems(successCallback, failCallback) {
	await fetch(api + "items", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json', 
        }
    })
	.then(res => {
        if(res.status != 200){
            failCallback(res.statusText)
        }else{
            res.json()
            .then(jsonRes => {
                successCallback(jsonRes);
            })
        }
	})
	.catch(error => console.log(error));
}

export async function getDeletedItems(successCallback, failCallback) {
	await fetch(api + "deletedItems", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json', 
        }
    })
	.then(res => {
        if(res.status != 200){
            failCallback(res.statusText)
        }else{
            res.json()
            .then(jsonRes => {
                successCallback(jsonRes);
            })
        }
	})
	.catch(error => console.log(error));
}