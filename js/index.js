var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCatInput = document.getElementById("productCategory");
var productDescInput = document.getElementById("productDescrption"); 
var searchInput = document.getElementById("searchInput");  

var productNameAlert = document.getElementById("productNameAlert");
var productPriceAlert = document.getElementById("productPriceAlert");

// var addBtn = document.getElementById("btn-add");


var productList;
var productIndex = 0;
 
if(localStorage.getItem("savedProductList")==null) 
{ 
    productList = [];
}else{  
    productList = JSON.parse(localStorage.getItem("savedProductList")); 
    displayProduct();
}


function addProduct(){   
    if(ValidateProductName() && ValidateProductPrice()){ 
        var product ={ 
            name: productNameInput.value, 
            price: productPriceInput.value, 
            category: productCatInput.value, 
            description: productDescInput.value,
        } 
        productList.push(product);   
        localStorage.setItem("savedProductList",JSON.stringify(productList))
        displayProduct(); 
        
        clearForm();
    } 
} 

function displayProduct(){  

    var temp = `` ; 
    if(productList.length == 0){ 
        document.getElementById("paragraphInstead").style.display ="block"; 
    }
    for(var i = 0 ; i<productList.length; i++){  
            document.getElementById("paragraphInstead").style.display ="none";
            temp += `   
            <div class= "col-lg-4 col-sm-6 ">
    
            <div class="card mb-3 ms-3 ">
            <div class="card-header">Product Id <span>${i+1}</span></div>
            <div class="card-body">
                <h6 class="card-title">Product Name: <span class="card-text">${productList[i].name}</span></h6> 
                <hr>
                <h6 class="card-title">Product Price: <span class="card-text">${productList[i].price}</span></h6>
                <hr> 
                <h6 class="card-title">Product Category: <span class="card-text">${productList[i].category}</span></h6>
                <hr> 
                <h6 class="card-title">Product Description: <span class="card-text">${productList[i].description}</span></h6> 
                <hr> 
                <div class="card-buttons d-grid gap-2"> 
                    <button type="button" onclick="updateProduct(${i})" class="btn text-white">Update</button> 
                    <button type="button" onclick="deleteProduct(${i})" class="btn text-white ">Delete</button>
                </div>
            </div> 
            </div>
      </div>
            `
        } 
        document.getElementById("cardsPlace").innerHTML = temp;
    }


function deleteProduct(index){    
    productList.splice(index,1);  
    localStorage.setItem("savedProductList",JSON.stringify(productList)); 
    displayProduct();  
} 

function clearForm(){ 
    productNameInput.value = ""; 
    productPriceInput.value = ""; 
    productCatInput.value = ""; 
    productDescInput.value = "";
} 

function updateProduct(index){ 
    productNameInput.value =productList[index].name;
    productPriceInput.value =productList[index].price; 
    productCatInput.value =productList[index].category; 
    productDescInput.value =productList[index].description; 

    document.getElementById("btn-add").style.display = "none";
    document.getElementById("btn-edit").style.display = "block"; 
    productIndex = index;
} 

function editProduct(){ 
    productList[productIndex].name = productNameInput.value;
    productList[productIndex].price = productPriceInput.value;
    productList[productIndex].category = productCatInput.value;
    productList[productIndex].description = productDescInput.value; 
    displayProduct()
    document.getElementById("btn-add").style.display = "block";
    document.getElementById("btn-edit").style.display = "none"; 
} 

function searchProduct(){ 
    searchInputValue = searchInput.value.toLowerCase();  
    temp = ``;
    for(var i=0; i<productList.length; i++){ 
        if(productList[i].name.toLowerCase().startsWith(searchInputValue)==true){  
            temp += `   
            <div class= "col-lg-4 col-sm-6 ">
    
            <div class="card mb-3 ms-3 ">
            <div class="card-header">Product Id <span>${i+1}</span></div>
            <div class="card-body">
            <h6 class="card-title">Product Name: <span class="card-text">${productList[i].name.toLowerCase().replace(searchInputValue,`<span class="text-danger">${searchInputValue}</span>`)}</span></h6> 
            <hr>
                <h6 class="card-title">Product Price: <span class="card-text">${productList[i].price}</span></h6>
                <hr> 
                <h6 class="card-title">Product Category: <span class="card-text">${productList[i].category}</span></h6>
                <hr> 
                <h6 class="card-title">Product Description: <span class="card-text">${productList[i].description}</span></h6> 
                <hr> 
                <div class="card-buttons d-grid gap-2"> 
                    <button type="button" onclick="updateProduct(${i})" class="btn text-white">Update</button> 
                    <button type="button" onclick="deleteProduct(${i})" class="btn text-white ">Delete</button>
                </div>
            </div> 
            </div>
      </div>
            `
        } 
    }
    document.getElementById("cardsPlace").innerHTML = temp;

}   
productNameInput.addEventListener("keyup",ValidateProductName) 

function ValidateProductName(){ 
    var productNameRegex = /^[A-Z][a-z]{3,12}[0-9]{0,3}$/ ;
    if(productNameRegex.test(productNameInput.value)){   
        productNameInput.classList.add("is-valid"); 
        productNameInput.classList.remove("is-invalid"); 
        productNameAlert.classList.add("d-none");   
        return true; 
        
    } 
    else{  
        productNameInput.classList.remove("is-valid"); 
        productNameInput.classList.add("is-invalid"); 
        productNameAlert.classList.remove("d-none");  
        return false;

    }
}
productPriceInput.addEventListener("blur", ValidateProductPrice) 
function ValidateProductPrice(){ 
    var productPriceRegex = /^[1-9][0-9]{2,5}$/;
    if(productPriceRegex.test(productPriceInput.value)){ 
        productPriceInput.classList.add("is-valid"); 
        productPriceInput.classList.remove("is-invalid"); 
        productPriceAlert.classList.add("d-none");  
        return true;
        
    } 
    else{  
        productPriceInput.classList.remove("is-valid"); 
        productPriceInput.classList.add("is-invalid"); 
        productPriceAlert.classList.remove("d-none"); 
        productPriceflag = false; 
        return false;
    }
}
