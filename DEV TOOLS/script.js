let iconUrls = []
const iconUrlsFromLocalStorage = JSON.parse( localStorage.getItem("iconUrls"))
const darkLightMode = document.getElementById('dark-light-mode')
const toggleOff = document.getElementById('toggle-off')
const toggleOn = document.getElementById('toggle-on')
const webIconSection = document.getElementById('webIconSection')
const bookMarkSection = document.getElementById('bookMarkSection')
const changeFolderName = document.getElementById('input-folder-name')
const enterInput = document.getElementById('enterInput')
const addNewFolder = document.getElementById('new-folder')
const deleteFolder = document.getElementById('deleteFolder')
const currentFolder = document.getElementById('folder')
const saveCurrentTabIcon = document.getElementById('saveTabIcon')
const addIcon = document.querySelector(".addIconList")
const undoButton = document.getElementById('undoButton')

if (iconUrlsFromLocalStorage) {
    iconUrls = iconUrlsFromLocalStorage
    render(iconUrls)
}
// Event listeners
darkLightMode.addEventListener("click",function(){
  switchDarkLightMode()
})
toggleOff.addEventListener("click", function(){
  toggleOnMode()
})
toggleOn.addEventListener("click", function(){
  toggleOffMode()
})
enterInput.addEventListener("click", function(){
  reNameFolder()
})
addNewFolder.addEventListener("click", function(){
  createNewFolder()
})
deleteFolder.addEventListener("click", function(){
  removeFolder()
})
saveCurrentTabIcon.addEventListener("click", function(){
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    iconUrls.push(tabs[0].url)
    localStorage.setItem("iconUrls", JSON.stringify(iconUrls) )
    render(iconUrls)
  })
})
undoButton.addEventListener("click", function() {
  undoSavedIcon()
})
// Functions below

function switchDarkLightMode(){
  var background = document.body;
  background.classList.toggle("lightMode");
  darkLightMode.classList.toggle("fa-moon-o")
}
function toggleOnMode(){
  bookMarkSection.removeAttribute("hidden"); 
  webIconSection.setAttribute("hidden", false)
}
function toggleOffMode(){
  webIconSection.removeAttribute("hidden"); 
  bookMarkSection.setAttribute("hidden", false)
}
function reNameFolder(){
  event.preventDefault()
  changeFolderName.removeAttribute("disabled")
}
function createNewFolder(){
  event.preventDefault()
  let parentFolder = document.getElementById("webIconFolder")
  let folderItem = document.querySelector('#folder');
  let clonedFolder = folderItem.cloneNode(true);
  clonedFolder.id = 'new_folder';
  parentFolder.appendChild(clonedFolder);
}
function removeFolder(){
  currentFolder.remove()
}
function render(iconUrls) {
    function faviconURL(parseThis) {
      const url = new URL(chrome.runtime.getURL('/_favicon/'));
      url.searchParams.set('pageUrl', parseThis); // this encodes the URL as well
      url.searchParams.set('size', '32');
      return url.toString();
    }

    const anchorTags = addIcon.querySelectorAll("a");
    anchorTags.forEach((aTag) => {addIcon.removeChild(aTag);});
    for (let i = 0; i < iconUrls.length; i++) {
      let img = document.createElement('img');
      let anchor = document.createElement('a');
      img.src = faviconURL(iconUrls[i]);
      anchor.href = iconUrls[i];
      anchor.target = "_blank";
      anchor.appendChild(img);
      addIcon.appendChild(anchor);
    }
}
function undoSavedIcon(){
    localStorage.clear()
    iconUrls = []
    let icon = addIcon.lastChild;
    addIcon.removeChild(icon)
    render(iconUrls)
}






























//  
// const renameFolder = document.getElementById('createFolderName')
// const addFolderButton = document.getElementById('addFolderBtn')
// const newFolder = document.getElementById('formId')
// const addButton = document.getElementById('add-btn')
// const saveIcon = document.getElementById('iconBtn')
// const addIcon = document.getElementById('iconContainer')
// const leadsFromLocalStorage = JSON.parse( localStorage.getItem("iconUrls"))
// const deleteBtn = document.getElementById('delete')




  

// addFolderButton.addEventListener("click", function(){
//   console.log("addfolderButton")
//     newFolder.classList.toggle("show")
//     addButton.addEventListener("click", function(){
//         addFolder()
//     })
// })

// function addFolder(){
//   console.log("Addfolder")
//     let createFolder = document.getElementById('create-btn')
//     renameFolder.textContent = createFolder.value
//     newFolder.classList.toggle("show")
// }

// deleteBtn.addEventListener("click", function() {
//     localStorage.clear()
//     bookMarks = []
//     let image = addIcon.lastChild;
//     addIcon.removeChild(image)
//     render(bookMarks)
//     // console.log("clicked")
// })