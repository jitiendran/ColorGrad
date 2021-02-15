// Variable declaration
const div = document.getElementById('wrapper')
const web_title = document.querySelector(".web-title");

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
        console.log("Key pressed")
        event.preventDefault();
        search();
    }
})