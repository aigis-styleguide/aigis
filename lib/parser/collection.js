function collection(comments, type) {
  var collection = _(comments)
    .map(function(comment) {
      return comment.config[type];
    })
    .flatten()
    .union()
    .sortBy()
    .value();
    
  return collection;
}

module.exports = collection;
