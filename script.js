const url ="https://api.tvmaze.com/shows/82/episodes";
let allEpisodes =[];

//You can edit ALL of the code here
function setup() {
  //fetch json data
  fetch(url).then(res => res.json()).then(data => {
    allEpisodes = data;
    makePageForEpisodes(allEpisodes);
  })
  .catch((err) => console.error(err));
 //let backButton = document.getElementById("backButton");
  backButton.disabled = "true";

}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  const dropDown = document.getElementById("mySelect");
  const backButton = document.getElementById("backButton");
  // clear out 
  rootElem.innerHTML="";

  const countEpisodes = document.createElement("p");
  if (episodeList.length>72){
  countEpisodes.innerText = `Showing all 73 episodes`;
  backButton.disabled = "true";
  }
  else {
  countEpisodes.innerText = `Showing ${episodeList.length}/73`;  
  backButton.disabled = "false";
  }
  rootElem.appendChild(countEpisodes);

  episodeList.forEach((episode)=> {

  // add the season and episode and name
  const paragraph = document.createElement("p");
  paragraph.textContent =`S${episode.season.toString().padStart(2,"0")}E${episode.number.toString().padStart(2,"0")}:${episode.name}`
  rootElem.appendChild(paragraph);

  //add the image
  const image = document.createElement("img");
  image.src = episode.image.medium;
  rootElem.appendChild(image);

  // add summar paragraph and the episode summary is actually HTML
  const summaryparagraph = document.createElement("p");
  summaryparagraph.innerHTML =`${episode.summary}`
  rootElem.appendChild(summaryparagraph);

  // add option  to the select - dropdown 
  
  const option = document.createElement("option")
  option.text = `S${episode.season.toString().padStart(2,"0")}E${episode.number.toString().padStart(2,"0")}:${episode.name}`;
  //dropDown.add(option);
  option.value = episode.id;
  dropDown.appendChild(option);

  });

}

// Search an episode and display the episodes searched
const searchInput = document.getElementById("searchText");

searchInput.addEventListener("input",(event)=>{
  const searchString = event.target.value.toLowerCase();
  const filteredEpisodes = allEpisodes.filter((episode)=>{
    return ( episode.summary.toLowerCase().includes(searchString)|| episode.name.toLowerCase().includes(searchString) );
  });
  makePageForEpisodes(filteredEpisodes);
});

const selectInput = document.getElementById("mySelect");

selectInput.addEventListener("change",(event)=>{
  // we now have episode.target.value which is the id of the episode selected in the drop down
  const idSelectedByUser = Number(event.target.value);
  const selectedEpisode = allEpisodes.find(
    (episode)=> episode.id === idSelectedByUser
    );
    if (selectedEpisode){
  makePageForEpisodes([selectedEpisode]);
  }
});
window.onload = setup;
