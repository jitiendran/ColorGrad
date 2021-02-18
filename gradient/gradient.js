//Global Declarations
const body = document.querySelector("body");
const Gradient_wrapper = document.querySelector(".gradient-wrapper");
const input = document.querySelector("input");
//Fetching from json is done by function so it can be reused
const Fetching = () => {
  fetch("./gradient.json")
    //converting the fetched data to json
    .then((response) => {
      return response.json();
    })
    //actual fetching
    .then((data) => {
      for (let i = 0; i < data.gradient.length; i++) {
        const { Id, Color1, Color2, Direction } = data.gradient[i];
        Gradient_wrapper.innerHTML += `<div class="gradient-container">
                                                <div class="gradient-bg"
                                                     style="background-image: linear-gradient(${Direction},${Color1},${Color2})">
                                                    <button onclick="setBg('${Color1}','${Color2}','${Direction}')"><i class="fas fa-eye"></i></button>
                                                    <p id=${Id}></p>
                                                </div>
                                                <div class="gradient-content">
                                                    <p>${Color1}<span>&#8594;</span>${Color2}</p>
                                                    <button onclick="copy('${Id}','${Color1}','${Color2}','${Direction}')"><i class="fas fa-copy"></i></button>
                                                </div>
                                            </div>`;
      }
    });
};
//called Fetched()
Fetching();

//copy function
const copy = (id, color1, color2, direction) => {
  navigator.clipboard
    .writeText(`linear-gradient(${direction},${color1},${color2})`)
    .then(() => {
      const element = document.getElementById(id);
      element.style.marginTop = "3em";
      element.style.marginLeft = "6em";
      element.style.fontWeight = "500";
      element.style.padding = ".3em";
      element.style.borderRadius = ".3em";
      element.style.border = "3px solid white";
      element.style.display = "inline-block";
      element.textContent = "Copied";
      setTimeout(() => {
        element.textContent = "";
        element.style.border = "none";
      }, 2000);
    });
};

//setbg for view button
const setBg = (color1, color2, direction) => {
  body.style.backgroundImage = `linear-gradient(${direction},${color1},${color2})`;
  body.style.backgroundRepeat = "no repeat";
  body.style.backgroundSize = "cover";
  body.style.backgroundAttachment = "fixed";
  setTimeout(() => {
    body.style.backgroundImage = "none";
  }, 2000);
};
//Search function
const search = () => {
  Gradient_wrapper.innerHTML = "";
  const value = input.value;
  const all = "all";
  //searching particular colors
  if (value != "" && value.toLowerCase() != all) {
    fetch("./gradient.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let count = 0;
        for (let i = 0; i < data.gradient.length; i++) {
          const { Id, Color1, Color2, Direction, Type } = data.gradient[i];
          if (Type === value.toLowerCase()) {
            count++;
            Gradient_wrapper.innerHTML += `<div class="gradient-container">
                                                <div class="gradient-bg"
                                                     style="background-image: linear-gradient(${Direction},${Color1},${Color2})">
                                                    <button onclick="setBg('${Color1}','${Color2}','${Direction}')"><i class="fas fa-eye"></i></button>
                                                    <p id=${Id}></p>
                                                </div>
                                                <div class="gradient-content">
                                                    <p>${Color1}<span>&#8594;</span>${Color2}</p>
                                                    <button onclick="copy('${Id}','${Color1}','${Color2}','${Direction}')"><i class="fas fa-copy"></i></button>
                                                </div>
                                            </div>`;
          }
        }
        if (count == 0) {
          Gradient_wrapper.innerHTML = `<h3><i class="fas fa-dizzy" style="font-size:1.3em"></i> No results found</h3>`;
        }
      });
  }
  //searching for all colors
  else if (value === "" || value.toLowerCase() === all) {
    Gradient_wrapper.innerHTML = "";
    Fetching();
  }
};

//Search by pressing enter key
input.addEventListener("keyup", (event) => {
  event.preventDefault();
  if (event.keyCode === 13) {
    search();
  }
});
