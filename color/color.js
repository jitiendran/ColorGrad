// Variable declaration
const div = document.getElementById('wrapper')
const web_title = document.querySelector('.web-title');
const Gliders = document.querySelector('.glider')
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
//navigating for home
web_title.addEventListener('click',()=>{
    window.location.href = "../index.html"
})

//copy-to-clipboard
const copy = (id,hex)=>{
    const copytext = document.getElementById(id).textContent
    navigator.clipboard.writeText(copytext).then(()=>{
        const copywrap = document.getElementById("s"+id).style
        copywrap.display = 'block'
        copywrap.border = `2.5px solid ${hex}`
        copywrap.borderRadius = ".3em"
        copywrap.padding = ".1em .3em"
        copywrap.fontWeight = "500"
        setTimeout(() => {
            document.getElementById("s"+id).style.display = 'none'
        }, 3000);
    })
}

//Fetching from json
const fetched = ()=>{
    fetch("./color.json")
    .then((resp)=>{return resp.json()})
    .then((data)=>{
        for(let i = 0 ; i < data.color.length ; i++){
            //Object Destructuring
            const {id,hex} = data.color[i]
            //adding color div to dom
            div.innerHTML += 
            `<div class="color-container">
                <div class="color" style="background-color: ${hex}"></div>
                <div class="copy-wrapper" id="copy">
                    <h3 id="${id}">${hex}</h3>
                    <div id="${"s"+id}" style="display:none"><p>Copied!</p></div>
                    <button onclick="copy('${id}','${hex}')"><i class="far fa-copy"></i></button>
                </div>
            </div>`
        }
    })
}

// Calling fetched() on loading
fetched()

//Searching for colors
const search = ()=>{
    div.innerHTML = ''
    let count = 0
    const item = document.getElementById('search-item').value
    if(item != ''){
        fetch('./color.json')
        .then((res) => {return res.json()})
        .then((data)=>{
            for(let i = 0 ; i < data.color.length; i++){
                if(data.color[i].type == String(item).toLowerCase()){
                    div.innerHTML += 
                    `<div class="color-container">
                        <div class="color" style="background-color: ${data.color[i].hex}"></div>
                        <div class="copy-wrapper" id="copy">
                            <h3 id="${data.color[i].id}">${data.color[i].hex}</h3>
                            <div id="${"s"+data.color[i].id}" style="display:none"><p>Copied!</p></div>
                            <button onclick="copy('${data.color[i].id}','${data.color[i].hex}')"><i class="far fa-copy"></i></button>
                        </div>
                    </div>`
                    count += 1
                }
            }
            if(count == 0){
                div.innerHTML = `<h3><i class="fas fa-dizzy" style="font-size:1.3em"></i> No results found</h3>`
            }
        })
    }
    else{
        fetched()
    }
}
//search also on pressing enter key
document.getElementById('search-item').addEventListener("keyup",(event)=>{
    if(event.keyCode == 13){
        event.preventDefault();
        search();
    }
})

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

//SearchPost() for postColors

 //For all colors search
document.getElementById('s1').addEventListener('click',()=>{
     //reseting the page and displaying
    div.innerHTML = ''
    fetched()
})
 //Other colors
for(let i = 2 ; i <= postColor.length ; i++){
    const id = "s"+i
    let count = 0
    const element = document.getElementById(id) 
    element.addEventListener('click',()=>{
        div.innerHTML = ''
        fetch('./color.json')
        .then((res) => {return res.json()})
        .then((data)=>{
            for(let i = 0 ; i < data.color.length; i++){
                if(data.color[i].type == String(element.textContent).toLowerCase()){
                    div.innerHTML += 
                    `<div class="color-container">
                        <div class="color" style="background-color: ${data.color[i].hex}"></div>
                        <div class="copy-wrapper" id="copy">
                            <h3 id="${data.color[i].id}">${data.color[i].hex}</h3>
                            <div id="${"s"+data.color[i].id}" style="display:none"><p>Copied!</p></div>
                            <button onclick="copy('${data.color[i].id}','${data.color[i].hex}')"><i class="far fa-copy"></i></button>
                        </div>
                    </div>`
                    count += 1
                }
            }
            if(count == 0){
                div.innerHTML = `<h3><i class="fas fa-dizzy" style="font-size:1.3em"></i> No results found</h3>`
            }
        })
    })
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