var express = require('express')
var app = express()
var fs = require('fs')
var PORT = 6969

app.get('/getTequila', (request, response) => {
	var obj = JSON.parse(fs.readFileSync('./response.json', 'utf-8'))
	let sku = request.query.sku
	let tequila = undefined
	for (var i = 0; i < obj.tequileras.length; i++) {
		for (var x = 0; x < obj.tequileras[i].tequilas.length; x++) {
			if (obj.tequileras[i].tequilas[x].sku === sku) {
				tequila = obj.tequileras[i].tequilas[x]
			}
		}
	}
	const origin = request.get('origin');

	response.header('Access-Control-Allow-Origin', origin);
	response.header('Access-Control-Allow-Credentials', true);
	response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma');
	
	console.log('SERVED /getTequila')
	if (tequila == undefined) {
		response.json({})
	} else {
		response.json(tequila)
	}
})

app.get('/getTequilera', (request, response) => {
	var obj = JSON.parse(fs.readFileSync('./response.json', 'utf-8'))
	var marca = request.query.marca
	let tequilera = {}
	
	for (var i = 0; i < obj.tequileras.length; i++) {
		if (obj.tequileras[i].marca == marca) {
			tequilera = obj.tequileras[i]
		}
	}

	const origin = request.get('origin');

	response.header('Access-Control-Allow-Origin', origin);
	response.header('Access-Control-Allow-Credentials', true);
	response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma');
	
	console.log('SERVED /getTequilera')
	response.json(tequilera)
})

app.get('/getTequileras', (request, response) => {
	var obj = JSON.parse(fs.readFileSync('./response.json', 'utf-8'))
	var tequileras = []
	for (var i = 0; i < obj.tequileras.length; i++) {
		tequileras.push(obj.tequileras[i].marca)
	}

	const origin = request.get('origin');

	response.header('Access-Control-Allow-Origin', origin);
	response.header('Access-Control-Allow-Credentials', true);
	response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma');
	
	console.log('SERVED /getTequileras')
	response.json(tequileras)

})

app.get('/getHistorial', (request, response) => {
	var obj = JSON.parse(fs.readFileSync('./response.json', 'utf-8'))
	const origin = request.get('origin');

	response.header('Access-Control-Allow-Origin', origin);
	response.header('Access-Control-Allow-Credentials', true);
	response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma');
	
	console.log('SERVED /getHistorial')
	response.json(obj.historial)
})

app.get('/addTequilaToHistorial', (request, response) => {
	var obj = JSON.parse(fs.readFileSync('./response.json', 'utf-8'))
	let {username,tequila} = request.query
	tequila.fechaCompra = new Date().toUTCString()
	tequila.username = username
	obj.historial.push(tequila)
	fs.writeFileSync('./response.json',JSON.stringify(obj),'utf-8')

	const origin = request.get('origin');

	response.header('Access-Control-Allow-Origin', origin);
	response.header('Access-Control-Allow-Credentials', true);
	response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma');
	
	console.log('SERVED /addTequilaToHistorial')
	response.json(obj.historial)
})

app.get('/login', (request, response) => {
	var us = JSON.parse(fs.readFileSync('userresponse.json', 'utf-8'))
	let username = request.query.username
	let password = request.query.password
	let found = false
	for(var i = 0; i < us.users.length; i++){
		if(us.users[i].username == username && us.users[i].password == password){
			found = true
		}
	}
	const origin = request.get('origin');

	response.header('Access-Control-Allow-Origin', origin);
	response.header('Access-Control-Allow-Credentials', true);
	response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma');
	
	console.log('SERVED /login')
	response.json({found})
})

app.listen(PORT)
console.log('Listening on Port:', PORT)