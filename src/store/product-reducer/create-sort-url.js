const createSortUrl = (sort) => {
  if (sort) {
    switch(sort) {
      case ("data_down"):
        return `&h={"$orderby": {"_created": 1 }}`;
      case ("data_up"):
        return `&h={"$orderby": {"_created": -1 }}`;
      case ("alphabet"):
        return `&h={"$orderby": {"title": 1 }}`;
      case ("price_down"):
        return `&h={"$orderby": {"price": -1 }}`;
      case ("price_up"):
        return `&h={"$orderby": {"price": 1 }}`;
      default: return null  
    }
  }
}

export default createSortUrl;
