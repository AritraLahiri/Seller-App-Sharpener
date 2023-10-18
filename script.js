const deleteDataFromApi = (id) => {
  console.log(id);
  axios
    .delete(
      `https://crudcrud.com/api/3c768e09154d4c5d80d4aa71b47efa5f/Products/${id}`
    )
    .then((response) => console.log(response.data))
    .catch((err) => console.log(err));
};

const GetDataFromApi = () => {
  const eceLst = document.getElementById("elec_lst");
  const foodLst = document.getElementById("food_lst");
  const skinCareLst = document.getElementById("skin_lst");
  axios
    .get("https://crudcrud.com/api/3c768e09154d4c5d80d4aa71b47efa5f/Products")
    .then((response) => {
      response.data.forEach((element) => {
        const { _id } = element;
        const { productName, productPrice, productCategory } = element.data;
        const lst = document.createElement("li");
        const deleteBtn = document.createElement("button");
        lst.className = "list-group-item";
        deleteBtn.className = "btn btn-danger";
        const data = document.createTextNode(
          ` Price : ${productPrice} , Name : ${productName} , Category ${productCategory}  `
        );
        const btnData = document.createTextNode("Delete Product");
        deleteBtn.addEventListener("click", function () {
          if (confirm("Do you want to delete product ?")) {
            deleteDataFromApi(_id);
            this.parentElement.remove();
          }
        });
        lst.appendChild(data);
        deleteBtn.appendChild(btnData);
        lst.appendChild(deleteBtn);
        if (productCategory === "Electronics") {
          eceLst.appendChild(lst);
        } else if (productCategory === "Skincare") {
          skinCareLst.appendChild(lst);
        } else {
          foodLst.appendChild(lst);
        }
      });
    })
    .catch((err) => console.log(err));
};

GetDataFromApi();

const AddProductToApi = (data) => {
  axios
    .post(
      "https://crudcrud.com/api/3c768e09154d4c5d80d4aa71b47efa5f/Products",
      {
        data,
      }
    )
    .then((response) => {
      console.log(response);
    })
    .catch((err) => console.log(err));
};

const AddProduct = (event) => {
  event.preventDefault();
  const productPrice = event.target.SellingPrice.value;
  const productName = event.target.productName.value;
  const productCategory = event.target.productCategory.value;
  const data = { productName, productPrice, productCategory };

  AddProductToApi(data);

  GetDataFromApi();
};
