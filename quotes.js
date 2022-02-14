let text = document.getElementById("text");
let textauthor = document.getElementById("author");
let btn = document.getElementById("btn");
let userInput = document.getElementById("usersearch");
let removeTags = document.getElementById("removetagsid");
let infoDiv = document.getElementById("infoid");
let circleDiv = document.getElementById("circleid");
let infoMark = document.getElementById("questionMark");

btnquotes()
btn.addEventListener("click", btnquotes)

function btnquotes() {
    if (sessionStorage.getItem("search")) {
        let search = sessionStorage.getItem("search")

        fetch(`https://api.quotable.io/random?tags=${search}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                text.textContent = data.content;
                textauthor.textContent = `-- ${data.author}`;
            })

    } else {
        fetch("https://api.quotable.io/random")
            .then(response => {
                return response.json()
            })
            .then(data => {
                text.textContent = data.content;
                textauthor.textContent = `-- ${data.author}`;
            })
    }
}

userInput.addEventListener("keypress", search)
function search(event) {
    if (event.keyCode === 13) {
        fetch("https://api.quotable.io/tags")
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {

                   
                    if (userInput.value == data[i].name) {
                        console.log(userInput.value)

                        fetch(`https://api.quotable.io/random?tags=${userInput.value}`)
                            .then(response => {
                                return response.json()
                            })
                            .then(data => {
                                text.textContent = data.content;
                                textauthor.textContent = data.author;
                            })

                        sessionStorage.setItem("search", userInput.value);

                        location.reload()

                    } else {
                        text.textContent = "Could not find any matching tags"
                        textauthor.textContent = " ";
                    }
                }
            })
    }
}

removeTags.addEventListener("click", clearTags)
function clearTags() {
    sessionStorage.removeItem("search");
    location.reload();
}


function infoFun() {
    infoDiv.classList.add("info");

    fetch("https://api.quotable.io/tags")
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                let span = document.createElement("span");
                span.classList.add("spaninfo")
                infoDiv.appendChild(span)

                span.textContent = data[i].name + " " + `(${data[i].quoteCount})`;

            }



        })
}



function removeInfo() {

    let getSpan = document.getElementsByClassName("spaninfo")

    while (getSpan.length) {
        getSpan[0].parentElement.removeChild(getSpan[0])
    }

    infoDiv.classList.remove("info")

};

infoMark.addEventListener("mouseenter", infoFun);
infoMark.addEventListener("mouseleave",  removeInfo);