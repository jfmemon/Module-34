const loadPhone = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const response = await fetch(url);
    const data = await response.json();
    displayLoadedPhones(data.data, dataLimit);
};
const displayLoadedPhones = (phones, dataLimit) => {
    // console.log(phones)
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = ``;

    // display only 10 phones
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    } else {
        showAll.classList.add('d-none');
    }

    // display message when no phone there
    const noPhoneMessage = document.getElementById('no-phone-found');
    if (phones.length === 0) {
        noPhoneMessage.classList.remove('d-none');
    } else {
        noPhoneMessage.classList.add('d-none');
    }

    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
                <div class="card p-4">
                    <img src="${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${phone.phone_name}</h5>
                      <p class="card-text">${phone.slug}</p>
                      <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneModal">Show details</button>
                    </div>
                </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    })
    showSpinner(false);

};

const searchedElement = dataLimit => {
    showSpinner(true);
    const searchInputField = document.getElementById('search-input-field');
    const searchValue = searchInputField.value;
    loadPhone(searchValue, dataLimit);
    searchInputField.value = ``;
};

document.getElementById('search-button').addEventListener('click', function () {
    searchedElement(10);    // ei button a click korle 10 ta value pathabe
})

document.getElementById('search-input-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchedElement(10);
    }
});

const showSpinner = isLoading => {
    const loadSpinner = document.getElementById('loader-spinner');
    if (isLoading) {
        loadSpinner.classList.remove('d-none');
    } else {
        loadSpinner.classList.add('d-none');
    }
};

document.getElementById('button-show-all').addEventListener('click', function () {
    searchedElement();  // ekhane kono data limit thakbena, cause show all button shob data load korbe
})


const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    phoneDetails(data.data);
}


const phoneDetails = details => {
    console.log(details);
    const phoneName = document.getElementById('phoneModalLabel');
    phoneName.innerText = details.name;
    const phoneDetailsBody = document.getElementById('phone-details-body');
    phoneDetailsBody.innerHTML = `
    <p class="text-center">...Features... </p>
    <p>Chip set: ${details.mainFeatures ? details.mainFeatures.chipSet : 'No chipset available' }</p>
    <p>Display size: ${details.mainFeatures ? details.mainFeatures.displaySize : 'No display size available'}</p>
    <p>Memory: ${details.mainFeatures.memory}</p>
    <p>Bluetooth: ${details.others ? details.others.Bluetooth : 'No bluetooth is available'}</p>
    `
}

