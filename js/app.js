const loadPhones = async(searchText, dataLimit)=>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);

}
const displayPhones = (phones, dataLimit) =>{
    const phonesContainer = document.getElementById('phones-container')
    phonesContainer.innerText = '';

    const showAll = document.getElementById('show-all')
    if(dataLimit && phones.length > 10){
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }
    
    // Display no phone found start
    const noPhone = document.getElementById('no-message-found')
    if(phones.length === 0){
        noPhone.classList.remove('d-none')
    }
    else{
        noPhone.classList.add('d-none')
    }
    // Display no phone found end

    phones.forEach(phone => {        
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
              <div class="card h-100 p-4">
                    <img src=" ${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title"> ${phone.phone_name}</h5>
                      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                      <button href="#" onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneModal">Show Details</button>
                    </div>
                  </div>
        `;
        phonesContainer.appendChild(div);

    });  
    // spinner will be stopped after appendChild
    toggleSpinner(false);
    
}

// Function for show all 
const processSearch = (dataLimit) => {
    toggleSpinner(true)
    const searchField = document.getElementById('input-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}
// Search field 

document.getElementById('search-btn').addEventListener('click', function(){
    // spinner will be run after click on button
    processSearch(10);
    // searchField.value = '';
})

// Enter event listener 
document.getElementById('input-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch() //I added 10
    }
});

// spinner start
const toggleSpinner = isLoading =>{
    const spinnerSection = document.getElementById('spinner')
    if(isLoading){
        spinnerSection.classList.remove('d-none')
    }
    else{
        spinnerSection.classList.add('d-none')
    }
}
// spinner end

// show all phones start 
document.getElementById('show-all-btn').addEventListener('click', function(){
    processSearch();

})

const loadPhoneDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhonesDetails(data.data);
}

// Phone Modal
const displayPhonesDetails = phone =>{
    console.log(phone);
    const modalTitle = document.getElementById('phoneModalLabel');
    modalTitle.innerText = phone.name;
    const modalBody = document.getElementById('modal-body');
    modalBody.innerText = phone.mainFeatures.storage;
}



loadPhones();