const Filter = (filterProducts) => {
  // rating
  const starRating = () => {
    let pattern = [];
    for (let i = 5; i >= 1; i--) {
      let stars = "⭐️".repeat(i);
      pattern.push(
        <div className="flex items-center">
          <input type="checkbox" className="h-4 w-4 me-2" id={"rating" + i} />
          <label htmlFor={"rating" + i}>{stars}</label>
        </div>
      );
    }
    return pattern;
  };

  // brand list
  const getBrandList = () => {
    var brands = [];
    filterProducts.filterProducts.forEach((item) => {
      // Check if the category is already in the list
      const isUnique = !brands.includes(item.brand);

      // If the brand is not found in the list, add it
      if (isUnique) {
        brands.push(item.brand);
      }
    });

    // Now, construct the list elements using the unique categories
    const brandElements = brands.map((brand, index) => (
      <li key={index}>
        <label className="inline-flex items-center">
          <input type="checkbox" className="form-checkbox h-4 w-4" />
          <span className="ml-2">{brand}</span>
        </label>
      </li>
    ));

    return brandElements;
  };

  // category list
  const getCategoryList = () => {
    var categories = [];
    filterProducts.filterProducts.forEach((item) => {
      // Check if the category is already in the list
      const isUnique = !categories.includes(item.category);

      // If the category is not found in the list, add it
      if (isUnique) {
        categories.push(item.category);
      }
    });

    // Now, construct the list elements using the unique categories
    const categoryElements = categories.map((category, index) => (
      <li key={index}>
        <label className="inline-flex items-center">
          <input type="checkbox" className="form-checkbox h-4 w-4" />
          <span className="ml-2">{category}</span>
        </label>
      </li>
    ));

    return categoryElements;
  };

  return (
    <>
      {/* filter by category */}
      <div className="w-full py-4 border-b">
        <h3 className="text-md font-semibold mb-4">Filter by Category</h3>
        <ul className="space-y-2">{getCategoryList()}</ul>
      </div>

      {/* filter by price */}
      <div className="w-full py-4 border-b">
        <h3 className="text-md font-semibold mb-4">Filter by Price</h3>
        <div>
          <input type="range" min="0" max="100" step="1" className="w-full" />
        </div>
      </div>

      {/* filter by brand */}
      <div className="w-full py-4 border-b">
        <h3 className="text-md font-semibold mb-4">Filter by Brand</h3>
        <ul className="space-y-2">{getBrandList()}</ul>
      </div>

      {/* filter by rating */}
      <div className="w-full py-4">
        <h3 className="text-md font-semibold mb-4">Filter by Rating</h3>
        <div className="space-y-2">{starRating()}</div>
      </div>
    </>
  );
};

export default Filter;
