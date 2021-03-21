const port=3000;
const fetch = require('node-fetch');
const express = require('express');
const app = express();
const service = require('./service');
const my_service = new service();

app.get('/api/user/:userID/avatar', (req, res)=>{
	my_service.getAvatar(req.params.userID, img=>{
		res.writeHead(200, {
			'Content-Type': 'image/png',
			'content-length' : img.length
		});
		res.end(img);
	});
});

app.delete('/api/user/:userID/avatar', (req, res)=>{
	my_service.deleteAvatar(req.params.userID, ()=>res.end());
});

app.get('/api/user/:userID', (req, res)=>{
	fetch('https://reqres.in/api/users/'+req.params.userID)
	.then(res => res.json())
	.then(json => res.send(json))
	.catch(err => res.send(err));
});

app.listen(port, () => console.log(`Listening to port ${port}...`));
