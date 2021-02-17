//Global Declarations
const body = document.querySelector('body')
const Gliders = document.querySelector('.glider')
const Gradient_wrapper = document.querySelector('.gradient-wrapper')
const postColor = [
    {
        id:  "s1",
        color: "white",
        text: "All"
    },
    {
        id:  "s2",
        color: "red",
        text: "Red",
    },
    {
        id:  "s3",
        color: "blue",
        text: "Blue"
    },
    {
        id:  "s4",
        color: "green",
        text: "Green"
    },
    {
        id: "s5",
        color: "#ff5e78",
        text: "Pink"
    },
    {
        id: "s6",
        color: "violet",
        text: "Violet"
    },
    {
        id: "s7",
        color: "gold",
        text: "Gold"
    },
    {
        id:  "s8",
        color: "orange",
        text: "Orange"
    },
    {
        id:  "s9",
        color: "yellow",
        text: "Yellow"
    },
    {
        id: "s10",
        color: "white",
        text: "White"
    },
    {
        id: "s11",
        color: "grey",
        text: "Grey"

    },
    {
        id: "s12",
        color: "brown",
        text: "Brown"
    },
    {
        id: "s13",
        color: "black",
        text: "Black"
    }
]

//Fetching from json is done by function so it can be reused
const Fetching = ()=>{
    fetch('./gradient.json')
    //converting the fetched data to json 
    .then((response)=> 
    {
        return response.json()
    })
    //actual fetching
    .then((data)=>{
        for(let i = 0 ; i < data.gradient.length; i++){
            const{Color1,Color2,Direction} = data.gradient[i]
            const Id = "g"+i
            Gradient_wrapper.innerHTML +=   `<div class="gradient-container">
                                                <div class="gradient-bg"
                                                     style="background-image: linear-gradient(${Direction},${Color1},${Color2})">
                                                    <button onclick="setBg('${Color1}','${Color2}','${Direction}')">view</button>
                                                    <p id=${Id}></p>
                                                </div>
                                                <div class="gradient-content">
                                                    <p>${Color1}<span>&#8594;</span>${Color2}</p>
                                                    <button onclick="copy('${Id}','${Color1}','${Color2}','${Direction}')"><i class="fas fa-copy"></i></button>
                                                </div>
                                            </div>`
        }
    })
}
//called Fetched()
Fetching()

//copy function 
const copy = (id,color1,color2,direction) =>{
    navigator.clipboard.writeText(`linear-gradient(${direction},${color1},${color2})`)
    .then( ()=>{
        const element = document.getElementById(id)
        element.style.marginTop = "3em"
        element.style.marginLeft = "6em"
        element.style.fontWeight = "500"
        element.style.padding = ".3em"
        element.style.borderRadius = ".3em"
        element.style.border = "3px solid white"
        element.style.display = "inline-block"
        element.textContent = "Copied"
        setTimeout(()=>{
            element.textContent = ""
            element.style.border = "none"
        },2000)
    })
}

//setbg for view button
const setBg = (color1,color2,direction)=>{
    body.style.backgroundImage = `linear-gradient(${direction},${color1},${color2})`
    body.style.backgroundRepeat = "no repeat"
    body.style.backgroundSize = "cover"
    body.style.backgroundAttachment = "fixed"
    setTimeout(()=>{
        body.style.backgroundImage = "none"
    },2000)
}
//postcolor bar
for(let i = 0 ; i < postColor.length ; i++){
    const{id,color,text} = postColor[i]
    const div  = document.createElement('div')
    div.className = "searched-list"
    div.id = id
    div.style.width = "100%"
    div.style.display = "flex"
    div.style.alignItems = "center"
    div.style.justifyContent = "space-evenly"
    div.style.background = color
    div.style.color = "white"
    div.style.padding = '.5em'
    div.style.borderRadius = ".5em"
    div.style.marginRight = "1em"
    div.style.fontSize = "1.2em"
    div.style.fontWeight = "500"
    div.style.cursor = "pointer"
    //special cases for background
    if(text === "All" || color === "white"){
        div.style.color = "black"
        div.style.border = "2px solid gainsboro"
    }
    div.textContent = text
    Gliders.append(div)
}

//Glider.js library for carousel
new Glider(Gliders, {
    slidesToShow: 6,
    slidesToScroll: 3,
    draggable: true,
    dots: '.dots',
    arrows: {
      prev: '.glider-prev',
      next: '.glider-next'
    }
});