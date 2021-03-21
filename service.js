const fs = require('fs');
const image = require('./image');
const fetch = require('node-fetch');

module.exports = class Service{
	
    constructor() {}

    getAvatar(userId, sendResponseCallback){
        const filename = 'user'+userId+'-avatar.txt';
        fs.access(filename, fs.F_OK, (err) => {
            if(err){
                fetch('https://reqres.in/api/users/'+userId)
                    .then(res => res.json())
                    .then(json => {
                        image.downloadImage(json.data.avatar, filename, function (err){
                            image.sendBase64Image(filename, sendResponseCallback);
                        });
                    })
                    .catch(err => res.send(err));
            }else{
                image.sendBase64Image(filename, sendResponseCallback);
            }
        });
    }

    deleteAvatar(userId, responseEndCallback){
        const filename = 'user'+userId+'-avatar.txt';
        fs.access(filename, fs.F_OK, (err) => {
            if(err){
                console.log(err);
            }else{
                fs.unlink(filename, function(error){})
            }
            responseEndCallback();
        });
    }
}