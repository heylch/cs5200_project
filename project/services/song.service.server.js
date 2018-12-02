var app = require("../../express");
var songModel = require("../model/song.model.server");
var userModel = require("../model/user.model.server");
var multer = require('multer'); // npm install multer --save
var upload = multer({dest: __dirname + '/../../public/uploads'});
var fs = require('fs');

app.post("/projectapi/user/:userId/song", createSongForUser);
app.get("/projectapi/song", findSongBySongName);
app.get("/projectapi/user/:userId/song", findAllSongsByUser);
app.get("/projectapi/search/song/:songId", findSongById);
app.put("/projectapi/song/:songId", updateSong);
app.post("/projectapi/upload", upload.single('myFile'), uploadSong);
app.delete("/projectapi/user/:userId/song/:songId", deleteSong);
app.get("/projectapi/songs", findAllSongs);
app.get("/projectapi/song/:songId/creator", getSongCreator);
app.put("/projectapi/song/:songId/owner/:ownerId/price/:priceNum", addSongOwner);
app.post("/projectapi/song/api", createSongFromApi);
app.get("/projectapi/review/song/:songId", findSongByIdWithReview);
app.put("/projectapi/song/:songId/playlist/:playlistId", addPlaylistToSong);

function findSongByIdWithReview(req, res) {
    var songId = req.params.songId;
    songModel.findSongByIdWithReview(songId)
        .then(function (songs) {
            res.json(songs);
        }, function (err) {
            res.sendStatus(500).send(err);;
        })
}

function uploadSong(req, res) {

    var myFile = req.file;

    var userId = req.body.userId;
    var cover = req.body.cover;
    var songName = req.body.songName;
    var originalname = myFile.originalname; // file name on user's computer
    var index = originalname.indexOf(".");
    originalname = originalname.substring(0, index);
    if(songName === "") {
        songName = originalname;
    }
    var filename = myFile.filename;     // new file name in upload folder
    var path = myFile.path;         // full path of uploaded file
    var destination = myFile.destination;  // folder where file is saved to
    var size = myFile.size;
    var mimetype = myFile.mimetype;

    var song= { "url":'/public/uploads/' + filename,
                "name": songName,
                "_creator" : userId,
                "cover" : cover,
    };

    userModel.createSongForUser(userId,song)
        .then(function () {
            var callbackUrl = "/project/#!/home";
            res.redirect(callbackUrl);
        })
}

function createSongForUser(req,res) {
    var song = req.body;
    var userId = req.params.userId;
    userModel
        .createSongForUser(userId, song)
        .then(function (song) {
            res.json(song);
        });
}

function findSongById(req,res) {
    var songId = req.params.songId;
    songModel
        .findSongById(songId)
        .then(function (song) {
            res.json(song);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function findSongBySongName(req, res) {
    var songname = req.query.songname;
    songname += ".mp3";
    songModel
        .findSongBySongName(songname)
        .then(function (song) {
            if (song === null)
                return res.send("0");
            else
                return res.json(song);

        }, function (err) {
            return res.sendStatus(404).send(err);
        });
}

function findAllSongsByUser(req, res) {
    var userId = req.params.userId;
    console.log(userId);
    songModel
        .findAllSongsByUser(userId)
        .then(function (songs) {
            res.json(songs);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function updateSong(req, res){
    var songId = req.params.songId;
    var song = req.body;
    songModel
        .updateSong(songId,song)
        .then(function (song) {
            res.json(song);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function deleteSong(req, res) {
    var songId = req.params.songId;
    var userId = req.params.userId;
    songModel.findSongById(songId)
        .then(function (song) {
            var filePath = __dirname + '/../../'
            filePath += song.url;
            fs.unlinkSync(filePath);
            console.log('successfully deleted ');
        })
    userModel
        .deleteSong(userId, songId)
        .then(function (song) {
            res.json(song);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}

function findAllSongs(req, res) {
    return songModel.findAllSongs()
        .then(function (songs) {
            res.json(songs);
        }, function (err) {
            res.sendStatus(500).send(err);
        })
}

function getSongCreator(req,res) {
    var songId = req.params.songId;
    return songModel
        .getSongCreator(songId)
        .then(function (creator) {
            res.json(creator);
        }, function (err) {
            res.sendStatus(500).send(err);
        })
}


function addSongOwner(req, res) {
    var songId = req.params.songId;
    var ownerId = req.params.ownerId;
    var priceNum = req.params.priceNum;
    return songModel.findSongById(songId)
        .then(function (song) {
            song._owner = ownerId;
            song.price = priceNum;
            return songModel.updateSong(song._id, song);
        })
        .then(function (songDoc) {
            res.json(songDoc);
        })
}

function addPlaylistToSong(req,res) {
    var songId = req.params.songId;
    var playlistId = req.params.playlistId;
    return songModel
        .addPlaylistToSong(playlistId,songId)
        .then(function (song) {
            res.json(song);
        });
}

function createSongFromApi(req, res) {
    var song = req.body;
    songModel
        .findOne({thridPartyId: song.thridPartyId})
        .then(
            function (user) {
                if (user) {//.length !== 0
                    res.json(user);
                } else {
                    songModel.createSongFromApi(song)
                        .then(function (songTmp) {
                            res.json(songTmp);
                        })
                }
            })
}