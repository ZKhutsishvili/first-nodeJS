const fs = require('fs');
const request = require('request').defaults({ encoding: null});

function downloadImage(uri, filename, callback){
  request.head(uri, function(err, res, body){
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

function sendBase64Image(filename, writeToResponseCallback){
	fs.readFile(filename, function(err, data) {
	    if (err) throw err; 
	    const img = Buffer.from(data, 'base64');
		writeToResponseCallback(img);
	});
}

exports.downloadImage = downloadImage;
exports.sendBase64Image = sendBase64Image;