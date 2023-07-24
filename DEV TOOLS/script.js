let bookMarks = []
const renameFolder = document.getElementById('createFolderName')
const addFolderButton = document.getElementById('addFolderBtn')
const newFolder = document.getElementById('formId')
const addButton = document.getElementById('add-btn')
const saveLogo = document.getElementById('iconBtn')
const addIcon = document.getElementById('iconContainer')
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("bookMarks"))
const deleteBtn = document.getElementById('delete')

if (leadsFromLocalStorage) {
    bookMarks = leadsFromLocalStorage
    render(bookMarks)
}

saveLogo.addEventListener("click", function(){
    saveActiveTab()
})

function saveActiveTab() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        bookMarks.push(tabs[0].url)
    localStorage.setItem("bookMarks", JSON.stringify(bookMarks) )
    render(bookMarks)
  });
}

function render(urlNotConvertFavicon){
    function faviconURL(origin) {
        const url = new URL(chrome.runtime.getURL('/_favicon/'));
        url.searchParams.set('pageUrl', origin); // this encodes the URL as well
        url.searchParams.set('size', '32');
        return url.toString();
    }  
    let img = document.createElement('img');
    let anchor = document.createElement('a');  
    for (let i = 0; i < urlNotConvertFavicon.length; i++) {
        img.src = faviconURL(urlNotConvertFavicon[i]);
        anchor.href = urlNotConvertFavicon[i];
        anchor.target = "_blank"
        document.body.appendChild(img);
        anchor.appendChild(img)
        addIcon.appendChild(anchor)    
       // localStorage.setItem("myLeads", JSON.stringify(myLeads))
    }
}

addFolderButton.addEventListener("click", function(){
    newFolder.classList.toggle("show")
    addButton.addEventListener("click", function(){
        addFolder()
    })
})

function addFolder(){
    let createFolder = document.getElementById('create-btn')
    renameFolder.textContent = createFolder.value
    newFolder.classList.toggle("show")
}

deleteBtn.addEventListener("click", function() {
    localStorage.clear()
    bookMarks = []
    let image = addIcon.lastChild;
    addIcon.removeChild(image)
    render(bookMarks)
    // console.log("clicked")
})