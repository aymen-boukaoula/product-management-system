let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let submit = document.getElementById('submit')
let mood = 'create'
let tmp; // متغير وهمي (مساعد) global
let mood_search = 'title'
// get totel
function gettotel(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML = result
        total.style.background = '#040'
    }else{
        total.innerHTML = ''
        total.style.background = '#a00d02'
    }

}


// creat product
let datapro
if(localStorage.product != null){
    datapro = JSON.parse(localStorage.product)
}else{
    datapro = [];
}
submit.onclick = function(){
    let newpro = {
       title:title.value.toLowerCase(),
       price:price.value,
       taxes:taxes.value,
       ads:ads.value,
       discount:discount.value,
       total:total.innerHTML,
       count:count.value,
       category:category.value.toLowerCase(),
    }
    // clean data
    if(title.value != '' && price.value != '' && category.value != '' && newpro.count < 100){
        if(mood === 'craete'){
            // count
            if(newpro.count > 1){
                for(let i= 0; i<newpro.count; i++){
                    datapro.push(newpro)
                }
            }else{
            datapro.push(newpro)
            }
        }else{
            datapro[tmp] = newpro;
            mood = 'create';
            submit.innerHTML = 'Create'
            count.style.display = 'block'
            scroll({
                top:0,
                behavior:'smooth'
            })
    
        }
        clearData()
    }
    
    // save localstorage
    localStorage.setItem('product', JSON.stringify(datapro))

    showData()
}


// clear inputs
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';

}


// read 
function showData(){
    let table = ''
    for(let i = 0; i < datapro.length; i++){
        table += `
    <tr>
        <td>${i+1}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button id="update" onclick = "updateData(${i})">update</button></td>
        <td><button id="delete" onclick = "deleteData( ${i} )">delete</button></td>
    </tr>
    `
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if(datapro.length > 0){
        btnDelete.innerHTML = `<button onclick = "deleteAll()">delet All (${datapro.length})</button>`
    }else{
        btnDelete.innerHTML = ``;
    }
    gettotel()
}
showData()


// delet
function deleteData(i){
    datapro.splice(i,1);
    localStorage.product = JSON.stringify(datapro)
    showData()
}


// delet all
function deleteAll(){
    localStorage.clear();
    datapro.splice(0)
    showData()
}



// update
function updateData(i){
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    gettotel()
    count.style.display = 'none'
    category.value = datapro[i].category;
    submit.innerHTML = 'Update'
    mood = 'update'
    tmp = i;
}



// search
function getSearchMood(id){
    let search = document.getElementById('search')
    search.focus()
    if(id == 'searchTitle'){
        mood_search = 'title'
        search.ariaPlaceholder = 'Search By Title'
    }else{
        mood_search = 'category'
        search.ariaPlaceholder = 'Search By Category'
    }
    search.value =''
    showData()
}
function searchData(value){
    let table = ''
    if(mood_search == 'title'){
       for(let i = 0; i<datapro.length; i++){
        if(datapro[i].title.includes(value.toLowerCase())){
            table += `
    <tr>
        <td>${i}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button id="update" onclick = "updateData(${i})">update</button></td>
        <td><button id="delete" onclick = "deleteData( ${i} )">delete</button></td>
    </tr>
    `
        }
       }
    }else{
        for(let i = 0; i<datapro.length; i++){
            if(datapro[i].category.includes(value.toLowerCase())){
                table += `
        <tr>
            <td>${i}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button id="update" onclick = "updateData(${i})">update</button></td>
            <td><button id="delete" onclick = "deleteData( ${i} )">delete</button></td>
        </tr>
        `
            }
           }
    }
    document.getElementById('tbody').innerHTML = table;
}


