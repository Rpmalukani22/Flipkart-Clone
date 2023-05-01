module.exports = function (doc) {
    delete doc._id;
    delete doc.categoryList;
    delete doc.imageUrlList;
    delete doc.productSpecifications.availableOffers;
    delete doc.productSpecifications.colorImgUrls;
    delete doc.productSpecifications.seller;
    delete doc.productSpecifications.services;
    delete doc.productSpecifications.shareUrl;
    doc.price = doc.discountedPrice;
    if(doc.price===0)
    doc.price=doc.retailPrice;
    delete doc.productSpecifications.specs;
    delete doc.productSpecifications.details;

    return doc;
}
