module.exports = function (doc) {
  delete doc._id;
  doc.categories = [];
  for (var idx = 0; idx < doc.categoryList.length; idx++) {
    var categories = findId(doc.categoryList[idx].$id, {
      database: "products",
      collection: "category",
    })
      ["categoryPath"].split(">>")
      .join(" ");
    doc.categories.push(categories);
  }
  delete doc.imageUrlList;
  delete doc.productSpecifications.availableOffers;
  delete doc.productSpecifications.colorImgUrls;
  delete doc.productSpecifications.seller;
  delete doc.productSpecifications.services;
  delete doc.productSpecifications.shareUrl;
  doc.f_assured = doc.productSpecifications.f_assured;
  doc.discounted = doc.productSpecifications.discounted;
  doc.rating = doc.productSpecifications.rating;
  doc.price = doc.discountedPrice;
  if (doc.price === 0) doc.price = doc.retailPrice;
  delete doc.productSpecifications;
  return doc;
};
