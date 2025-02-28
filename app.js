const videoSection = document.querySelector("#video");
const commentSection = document.querySelector("#comments")
const btn = document.querySelector("#btn")


btn.addEventListener("click", () => {
    geturl();
    btn.disabled = true;
})


function geturl() {

    const url = document.querySelector("#url");
    const urlId = url.value.substring(32,43);
    
    fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${urlId}&key=AIzaSyAmN35DreRYwgZJfcgpju5v4dcRYckJX64`)
    .then((res) => res.json())
    .then(data => {
        videoSection.innerHTML = `<a target="_blank" href="https://www.youtube.com/watch?v=${data.items[0].id}" class="yt-video">
        <img src="${data.items[0].snippet.thumbnails.maxres.url}"  />
    </a>
    <h3>${data.items[0].snippet.title}</h3>`
    //videoSection.innerHTML = `<h3>${data.items[0].snippet.title}</h3>`
    console.log(data.items);
    })

    fetch(`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=7&videoId=${urlId}&key=AIzaSyAmN35DreRYwgZJfcgpju5v4dcRYckJX64`)
    .then((res) => res.json())
    .then(data =>{
        data.items.forEach((element) => {
            commentSection.innerHTML += `<img src="${element.snippet.topLevelComment.snippet.authorProfileImageUrl}" /> 
            <b>${element.snippet.topLevelComment.snippet.authorDisplayName}</b>
            <p>${element.snippet.topLevelComment.snippet.textDisplay}</p><br><br>`
        });
        
        console.log(data.items)
    })

}


// console.log(element.snippet.topLevelComment.snippet.authorDisplayName);
// console.log(element.snippet.topLevelComment.snippet.textDisplay);








