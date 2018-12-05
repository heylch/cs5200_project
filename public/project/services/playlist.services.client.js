(function () {
    angular
        .module("Musiker")
        .service("playlistService", playlistService);


    function playlistService($http) {

        var api =  {
            "createPlaylistForUser": createPlaylistForUser,
            "findPlaylistById": findPlaylistById,
            "findPlaylistByPlaylistName":findPlaylistByPlaylistName,
            "findAllPlaylistsByUser": findAllPlaylistsByUser,
            "updatePlaylist": updatePlaylist,
            "deletePlaylist": deletePlaylist,
            "addSongToPlaylist":addSongToPlaylist,
            "getAllSongsFromPlaylist":getAllSongsFromPlaylist,
            "removeSongFromPlaylist": removeSongFromPlaylist
        };

        return api;


        function findPlaylistById(playlistId) {
            var url = "/projectapi/playlist/" + playlistId;
            return $http.get(url);
        }

        function findAllPlaylistsByUser(userId) {
            // console.log(userId);
            var url = "/projectapi/user/" + userId + "/playlist";
            return $http.get(url);
        }

        function createPlaylistForUser(userId, playlist) {
            var url = "/projectapi/user/" + userId + "/playlist";
            return $http.post(url,playlist);
        }

        function findPlaylistByPlaylistName(playlistname) {
            var url = "/projectapi/playlist?playlistname="+playlistname;
            return $http.get(url);
        }

        function updatePlaylist(playlistId,playlist){
            var url = "/projectapi/playlist/" + playlistId;
            return $http.put(url,playlist);
        }

        function deletePlaylist(playlistId){
            var url = "/projectapi/playlist/" + playlistId;
            return $http.delete(url);
        }

        function addSongToPlaylist(playlistId, songId) {
            // console.log(playlistId);
            var url = "/projectapi/playlist/" + playlistId + "/song/" + songId;
            return $http.put(url);
        }

        function getAllSongsFromPlaylist(playlistId) {
            var url = "/projectapi/playlist/" + playlistId + "/song/";
            return $http.get(url);
        }
        function removeSongFromPlaylist(playlistId,songId) {
            var url = "/projectapi/playlist/" + playlistId + "/song/" + songId +"/remove";
            return $http.put(url);
        }


    }

})();