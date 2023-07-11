let gridsizeX = 16;
let gridsizeY = 16;
let row;
let pixel;
let penColour = "#000000";
let random = false;
let progressiveColor = false;

function initGrid() {
    let etch = document.querySelector(".etch");
    for (i = 0; i < gridsizeY; i++) {
        row = document.createElement("div");
        row.classList.add("row");

        for (j = 0; j < gridsizeX; j++) {
            pixel = document.createElement("div");
            pixel.classList.add("pixel");
            pixel.style.background = "rgb(255, 255,255)"
            row.appendChild(pixel);
        }
        etch.appendChild(row);
    }
    let pixels = document.querySelectorAll(".pixel");

    pixels.forEach(pixel => {
        pixel.addEventListener("mouseover", (e) => {
            console.log("hovered on me" + e);
            if(random){
                var num = Math.round(0xffffff * Math.random());
                var r = num >> 16;
                var g = num >> 8 & 255;
                var b = num & 255;
                e.target.style.background = 'rgb(' + r + ', ' + g + ', ' + b + ')';
                return;
            }
             if(progressiveColor){
                let darker = toRGBArray(e.target.style.background);
                darker[0] = Math.max(darker[0] - (255/10), 0);
                darker[1] = Math.max(darker[1] - (255/10), 0);
                darker[2] = Math.max(darker[2] - (255/10), 0);
                penColour = 'rgb(' + darker[0] + ', ' + darker[1] + ', ' + darker[2] + ')'
             }
            e.target.style.background = penColour;
        })
    });

}

function toRGBArray (rgbStr){
   return rgbStr.match(/\d+/g).map(Number);
} 

function redraw() {
    let inputs = document.querySelectorAll("input");
    let x = parseInt(inputs[0].value);
    let y = parseInt(inputs[1].value);
    if (isNaN(x) || isNaN(y)) {
        alert("Please enter an integer value < 100");
        return;
    }
    gridsizeX = x;
    gridsizeY = y;
    let etch = document.querySelector(".etch");
    while(etch.firstChild){
        etch.firstChild.remove();
    }
    initGrid();

}




function randomColours(e){
   if(e.target.checked){
    random = true;
    colourPicker.disabled = true;
    progressiveCheck.disabled = true;
   } 
   else{
    random = false;
    colourPicker.disabled = false;
    progressiveCheck.disabled = false;
    penColour = colourPicker.value;
   }
}

function progressiveColours(e){
    if(e.target.checked){
        progressiveColor = true;
        colourPicker.disabled = true;
        randomCheck.disabled = true;
       } 
       else{
        progressiveColor = false;
        colourPicker.disabled = false;
        randomCheck.disabled = false;
        penColour = colourPicker.value;
       }
}

let resetButton = document.querySelector(".gridReset");
resetButton.addEventListener("click", redraw);



let colourPicker = document.querySelector(".colourpicker");

colourPicker.addEventListener("input", (e)=>{
    penColour = e.target.value;
});

let randomCheck = document.querySelector(".random");
randomCheck.addEventListener("click", (e)=>{
    randomColours(e);
});


let progressiveCheck = document.querySelector(".progressive");

progressiveCheck.addEventListener("click", (e)=>{
    progressiveColours(e);
});






initGrid();

