var mongoose = require("mongoose");
var publisherSchema = require("./publisher.schema.server");
var publisherModel = mongoose.model("PublisherModel", publisherSchema);
// var userModel = require("./user.model.server");

publisherModel.findPublisherById = findPublisherById;
publisherModel.findPublisherByPublisherName = findPublisherByPublisherName;
publisherModel.updatePublisher = updatePublisher;
publisherModel.findAllPublishers = findAllPublishers;
publisherModel.createPublisherFromApi = createPublisherFromApi;
publisherModel.deletePublisher = deletePublisher;
publisherModel.getPublisherProfit = getPublisherProfit;
module.exports = publisherModel;

function deletePublisher(publisherId) {
    return publisherModel.findOneAndRemove(publisherId)
        .then(function (publisher) {
            return publisher;
        })
}

function findPublisherById(publisherId) {
    return publisherModel
        .findOne({_id: publisherId})
        .populate('_creator')
        .exec();
}

function findPublisherByPublisherName(publishername) {
    return publisherModel.find({name: publishername});
}



function updatePublisher(publisherId, publisher) {
    return publisherModel
        .updateOne({_id: publisherId},
            {$set: publisher});
}

function getPublisherProfit(publisherId) {
    return publisherModel
        .findById(publisherId)
        .then(function (publisher) {
            return publisher.profit;
        })
}



function findAllPublishers() {
    return publisherModel
        .find()
        .populate('_creator')
        .exec();
}


function createPublisherFromApi(publisher) {
    return publisherModel.create(publisher);
}

