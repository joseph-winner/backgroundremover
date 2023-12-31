var addCard = document.getElementById("addCard");
var displayCard = document.getElementById("displayCard");
var loadingCard = document.getElementById("loadingCard");
var downloadCard = document.getElementById("downloadCard");
var fileInput = document.getElementById("fileInput");
var imageBefore = document.getElementById("display-img");
var startBtn = document.getElementById("startBtn");
var imageAfter = document.querySelector(".image-after")
var imageBeforeSH = document.querySelector(".image-before")
var uploadAnother = document.getElementById("uploadAnother")
var downLoadImage = document.getElementById("downloadHref")
var file = null;
var reader = new FileReader();
const formData = new FormData();

const API_URL = "https://api.remove.bg/v1.0/removebg";
const API_KEY = "3W4Q8CLF2FNeVKc8NNaAHaop";
const activeScreen = (screen) =>{
    addCard.style.display = 'none';
    displayCard.style.display = 'none';
    loadingCard.style.display = 'none';
    downloadCard.style.display = 'none';
    screen.style.display = 'flex';
}

activeScreen(addCard)

fileInput.addEventListener('input', ()=>{
    file = fileInput.files[0];
    reader.readAsDataURL(file)
    reader.onloadend = () =>{
        imageBefore.src = reader.result;
        imageBeforeSH.src = reader.result;
    }
    activeScreen(displayCard)
})

startBtn.addEventListener("click", ()=>{
    activeScreen(loadingCard)
    formData.append("image_file", file)
    fetch(API_URL, {
        method: 'POST',
  headers: {
    'X-Api-Key': API_KEY,
  },
  body: formData,
}).then((res) =>res.blob()).then((blob) =>{
    reader.readAsDataURL(blob)
    reader.onloadend = () =>{
        imageAfter.src = reader.result;
        downLoadImage.setAttribute("href",reader.result)
    }
    activeScreen(downloadCard)
})
})

uploadAnother.addEventListener("click", ()=>{
    window.location.reload();
})