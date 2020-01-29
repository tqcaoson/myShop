const getListProduct = (idType, page) => {
    let url;
    if (idType !== 'COLLECTION') {
        url = `http://localhost/app/product_by_type.php?id_type=${idType}&page=${page}`;
    } else {
        url = `http://localhost/app/get_collection.php?page=${page}`;
    }
    return fetch(url)
    .then(res => res.json());
};

export default getListProduct;
