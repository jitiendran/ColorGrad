const div = document.getElementById('wrapper')
const copy = (id,hex)=>{
    const copytext = document.getElementById(id).textContent
    navigator.clipboard.writeText(copytext).then(()=>{
        const copywrap = document.getElementById("s"+id)
        copywrap.style.display = 'block'
        copywrap.style.border = `2.5px solid ${hex}`
        copywrap.style.borderRadius = ".3em"
        copywrap.style.padding = ".1em .3em"
        copywrap.style.fontWeight = "500"
        setTimeout(() => {
            document.getElementById("s"+id).style.display = 'none'
        }, 3000);
    })
}
fetch("./color.json")
    .then((resp)=>{return resp.json()})
    .then((data)=>{
        for(let i = 0 ; i < data.color.length ; i++){
            div.innerHTML += 
            `<div class="color-container">
                <div class="color" style="background-color: ${data.color[i].hex}"></div>
                <div class="copy-wrapper" id="copy">
                    <h3 id="${data.color[i].id}">${data.color[i].hex}</h3>
                    <div id="${"s"+data.color[i].id}" style="display:none"><p>Copied!</p></div>
                    <button onclick="copy('${data.color[i].id}','${data.color[i].hex}')"><i class="far fa-copy"></i></button>
                </div>
            </div>`
        }
    })

const search = ()=>{
    // type search code here.....
}
