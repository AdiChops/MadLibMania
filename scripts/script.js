import madlibs from '../data/stories.js';

if(!location.search){
    let listHtml = ""
    console.log(madlibs)
    madlibs.forEach((madlib)=>{
        console.log(madlib)
        listHtml += `<li><a href="?id=${madlib.id}">${madlib.title} by ${madlib.author}</a></li>`
    });
    console.log(listHtml)

    document.getElementById("madlibs").innerHTML = listHtml;
    document.getElementById("info").textContent = "Pick from one of the stories below: 😁";
}
else if(location.search.includes("?id=")){
    let id = location.search.substring(4);
    if(isNaN(id) || !madlibs[id]){
        location.href=".";
    }
    else{
        document.getElementById("info").textContent = "Enter words below: 😊";
        document.getElementById("link").style.display = "block";
        let blankBoxes = [];
        madlibs[id].blanks.forEach((blank)=>{
            let div = document.createElement("div")
            let label = document.createElement("label")
            label.textContent = `Enter ${blank}: `
            div.appendChild(label)
            let box = document.createElement("input");
            box.setAttribute("type","text");
            div.appendChild(box);
            document.getElementById("story").appendChild(div)
            blankBoxes.push(box)
        })
        let btn = document.createElement("button");
        btn.textContent = "Reveal my Story!";
        btn.addEventListener("click", ()=>{
            let st = "";
            let isValid = true;
            let i;
            for(i=0; i < madlibs[id].story.length-1; i++){
                st += madlibs[id].story[i];
                console.log(blankBoxes[i]);
                st += `<span class="blank">${blankBoxes[i].value}</span>`;
                if(!blankBoxes[i].value){
                    alert("Please fill out every field.")
                    isValid = false;
                    break;
                }
            }
            st += madlibs[id].story[i];
            if(isValid){
                if(!document.getElementById("content")){
                    let para = document.createElement("p");
                    para.setAttribute("id", "content");
                    para.innerHTML = st;
                    document.getElementById("story").appendChild(para)
                }
                else{
                    document.getElementById("content").innerHTML = st;
                }
            }
        });
        document.getElementById("story").appendChild(btn)
    }
}
else{
    location.href=".";
}

