apiKey = "7022a16defmsh1d5202114094ee0p128749jsnd8e087308d39"
document.addEventListener("DOMContentLoaded", () => {
    console.log(`DOM Loaded`)
    //putData()
    groupMembers()
    form()
    // formB()
})

let groupMembers = () => {
    fetch('http://localhost:3000/groupMembers')
    .then(res => res.json())
    .then(group => group.forEach(member => renderGroupMember(member)))
}



let putData = (searchURL) => {
    fetch(`${searchURL}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": `${apiKey}`,
            "x-rapidapi-host": "imdb8.p.rapidapi.com"
        }
    })
    .then(res => res.json())
    .then(movies => returnSearchList(movies))
}


let form = () => {
    let searchForm = document.querySelector('#selectSearch')
    searchForm.addEventListener('click', (e) => {
        e.preventDefault()
        formB(e.target.id)
    })
    
    
}

let formB = (criterion) => {
   let searchForm = document.querySelector('#secondForm')
   searchForm.innerHTML = ''
   let label = document.createElement('input')
   label.placeholder = `Please input a ${criterion.toUpperCase()} to search by`
   let inputbtn = document.createElement('button')
   inputbtn.innerText = "Submit"
   searchForm.append(label, inputbtn)
   
   searchForm.addEventListener('submit',(e) =>{
       e.preventDefault()
        
       selectURL(criterion, label.value)
    })
}

let selectURL = (selectedSearch, searchValue) =>{
    
    let titleSeach = `https://imdb8.p.rapidapi.com/title/auto-complete?q=${searchValue}`
    let performerSearch = `https://imdb8.p.rapidapi.com/actors?q=${searchValue}`
    // https://imdb8.p.rapidapi.com/title/find?q=
    let genreSearch = `url-3 ${searchValue}`
    let yearSearch = `url-4 ${searchValue}`
    switch (selectedSearch) {
        case "title":
             putData(titleSeach)
             break;
        case  "performer":
            putData(performerSearch)
            break;
            case "genre":
            console.log(genreSearch)
            break;
            case "year":
                console.log(yearSearch)
            break;
        }
        
}

const returnSearchList = (movies) => {
    console.log(movies)
    const searchResults = document.querySelector("#searchResults")
    searchResults.textContent = " "
    movies.d.forEach(retrievedTitle => {
        const LiElement = document.createElement("li")
        LiElement.textContent = retrievedTitle.l
        searchResults.append(LiElement)
         const addToWatchListBtn = document.createElement("button")
         addToWatchListBtn.className = "saveButton"
        addToWatchListBtn.textContent = "Add To WatchList"
        LiElement.appendChild(addToWatchListBtn)
        saveToServer(addToWatchListBtn, retrievedTitle.l)
        
    })    
}

let saveToServer = (toWatch,movieTitle) => {
    console.log(movieTitle)
    toWatch.addEventListener("click", (e) => {
        
        fetch('http://localhost:3000/moviesToWatch',{
               method: 'POST',
               headers: {
                'Content-Type': 'application/json'
               },
               body: JSON.stringify({
                   title: `${movieTitle}`
            })
           })
           .then(resp => resp.json())
           .then (savedTitle => console.log(savedTitle))
        
            // addToWatchList.remove()
        })
 }

 let appendTowatchList = (savedTitle) => {
     const watchList = document.querySelector("#watchList")
     let towatchTitle = document.createElement('li')
     towatchTitle.textContent = savedTitle
     console.log(savedTitle)
     watchList.append(towatchTitle)
 }
    let renderGroupMember = (member) => {
       let mainDiv =  document.querySelector('#name')
       let memberContainer = document.createElement('div')
       memberContainer.className = "mainContainer"
       let linkDiv = document.createElement('div')
       let appendMainDiv = (value) => {
            
           memberContainer.append(value)
           
       }
       let appendLinkDiv = (imgLink) => {
           linkDiv.append(imgLink)
           linkDiv.className = "linkDiv"
           appendMainDiv(linkDiv)
       }
        Object.keys(member).forEach(item => {
            let createA = document.createElement('a')
            //I know it's forbidden and now i see why
            //But without jquery or react couldn't find another way
            
             
            switch (item) {
                case 'image':
                    let memPic = document.createElement('img')
                    memPic.src = `${member[item]}`
                    memPic.className = "memImg"
                    appendMainDiv(memPic)
                    break;
                case 'name':
                    let memName = document.createElement('h2')
                    memName.textContent = `${member[item]}`
                    memName.className = 'groupMember'
                    appendMainDiv(memName)
                    break;
                case 'github':
                    let memGit = createA
                    memGit.href = `${member[item]}`
                    
                    memGit.innerHTML = "<img src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'/>"
                    
                    appendLinkDiv(memGit)
                    break;
                    case 'linkedIn':
                    let memLinked = createA
                    memLinked.href = `${member[item]}`
                    memLinked.innerHTML = "<img src='https://th.bing.com/th/id/OIP.oI1c_Wxmo9X4HZLGG47MBgHaGj?w=228&h=202&c=7&o=5&dpr=1.25&pid=1.7'/>"
                    
                    appendLinkDiv(memLinked)
                    break;
                    case 'blog':
                    let memBlog = createA
                    memBlog.href = `${member[item]}`
                    memBlog.innerHTML = "<img src='https://th.bing.com/th/id/OIP.r7yP6vGO2LurQpddAIe3UQHaF4?w=261&h=207&c=7&o=5&dpr=1.25&pid=1.7'/>"
                    
                    appendLinkDiv(memBlog)
                    break;
            } 
        }
    )
           // memberContainer.append(memPic, memName, memGit, memLinked, membBlog)
         mainDiv.append(memberContainer)
} 