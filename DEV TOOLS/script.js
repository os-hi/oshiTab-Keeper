let iconUrls = []
const renameFolder = document.getElementById('createFolderName')
const addFolderButton = document.getElementById('addFolderBtn')
const newFolder = document.getElementById('formId')
const addButton = document.getElementById('add-btn')
const saveIcon = document.getElementById('iconBtn')
const addIcon = document.getElementById('iconContainer')
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("iconUrls"))
const deleteBtn = document.getElementById('delete')

if (leadsFromLocalStorage) {
    iconUrls = leadsFromLocalStorage
    render(iconUrls)
}


// Calls the render function, pushes active tab url to bookMarks array
// also sets the current item of localstorage with id "bookMarks"
saveIcon.addEventListener("click", function(){
    console.log("Step 1. I clicked the button")
    console.log("Step 2. Queried the active tab")
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    console.log("Step 3. pushed url of current tab to iconsUrl")
    iconUrls.push(tabs[0].url)
    console.log(`${tabs[0].url}`)
    console.log("Step 4. set localstorage item with id iconUrls with iconUrls")
    localStorage.setItem("iconUrls", JSON.stringify(iconUrls) )
    console.log("Step 5. Called Render function passing the iconUrls")
    render(iconUrls)
  });
})


function render(iconUrls) {

    function faviconURL(parseThis) {
      const url = new URL(chrome.runtime.getURL('/_favicon/'));
      url.searchParams.set('pageUrl', parseThis); // this encodes the URL as well
      url.searchParams.set('size', '32');
      console.log(`Step 8. Parsing what you gave me${url.toString()} `)
      return url.toString();
    }

    console.log("Step 6. assigning all anchor element of addIcon to anchorTags")
    const anchorTags = addIcon.querySelectorAll("a");

    console.log("Removing anchor tags from addIcon")
    anchorTags.forEach((aTag) => {addIcon.removeChild(aTag);});

    console.log("Step 7. Looping all elemetns of urls which was passed as iconUrls") 

    for (let i = 0; i < iconUrls.length; i++) {
      let img = document.createElement('img');
      let anchor = document.createElement('a');
      console.log(`Step 7.1 This is the url ${iconUrls[i]}`)  
      img.src = faviconURL(iconUrls[i]);
      console.log(`Step 8.1 This is the url ${img.src}`)
      anchor.href = iconUrls[i];
      anchor.target = "_blank";
      anchor.appendChild(img);
      console.log("Step 9. Appending child to addIcon")
      addIcon.appendChild(anchor);
    }
  }
  

addFolderButton.addEventListener("click", function(){
  console.log("addfolderButton")
    newFolder.classList.toggle("show")
    addButton.addEventListener("click", function(){
        addFolder()
    })
})

function addFolder(){
  console.log("Addfolder")
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