(function () {
    angular
        .module("Musiker")
        .service("transactionService", transactionService);


    function transactionService($http) {

        var api =  {
            "createTransaction": createTransaction,

            "findTransactionsByBuyer":findTransactionsByBuyer,
            "findTransactionsBySeller": findTransactionsBySeller,
            "findTransactionById": findTransactionById,

            "updateTransaction": updateTransaction,
            "deleteTransaction": deleteTransaction
        };

        return api;


        function createTransaction(buyerId,songId, transaction) {
            var url = "/projectapi/transaction/" + buyerId + "/song/" + songId;
            return $http.post(url, transaction);
        }


        function findTransactionById(transactionId) {
            var url = "/projectapi/transaction/" + transactionId;
            return $http.get(url);
        }

        function findTransactionsByBuyer(buyerId) {
            var url = "/projectapi/transaction/buyer/" + buyerId;
            return $http.get(url);
        }

        function findTransactionsBySeller(sellerId) {
            var url = "/projectapi/transaction/seller/" + sellerId;
            return $http.get(url);
        }



        function updateTransaction(transactionId,transaction){
            var url = "/projectapi/transaction/" + transactionId;
            return $http.put(url,transaction);
        }

        function deleteTransaction(transactionId){
            var url = "/projectapi/transaction/" + transactionId;
            return $http.delete(url);
        }

    }

})();