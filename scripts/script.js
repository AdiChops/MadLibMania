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
    document.getElementById("info").textContent = "Pick from one of the stories below: :D";
}
else if(location.search.includes("?id=")){
    let id = location.search.substring(4);
    if(isNaN(id) || !madlibs[id]){
        location.href="/";
    }
    else{
        document.getElementById("info").textContent = "Enter words below: :)";
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
            let para = document.createElement("p");
            let st = "";
            let i;
            for(i=0; i < madlibs[id].story.length-1; i++){
                st += madlibs[id].story[i];
                console.log(blankBoxes[i]);
                st += blankBoxes[i].value;
            }
            st += madlibs[id].story[i];
            para.textContent = st;
            document.getElementById("story").appendChild(para)
        });
        document.getElementById("story").appendChild(btn)
    }
}
else{
    location.href="/";
}

