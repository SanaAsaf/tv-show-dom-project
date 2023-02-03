//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  // clear out 
  rootElem.innerHTML="";

  const countEpisodes = document.createElement("p");
  if (episodeList.length>72){
  countEpisodes.innerText = `Showing all 73 episodes`;
  }
  else {
  countEpisodes.innerText = `Showing ${episodeList.length}/73`;  
  }
  rootElem.appendChild(countEpisodes);

  episodeList.forEach((episode)=>{
  const paragraph = document.createElement("p");
  paragraph.textContent =`S${episode.season.toString().padStart(2,"0")}E${episode.number.toString().padStart(2,"0")}:${episode.name}`
  rootElem.appendChild(paragraph);

  const image = document.createElement("img");
  image.src = episode.image.medium;
  rootElem.appendChild(image);

  const summaryparagraph = document.createElement("p");
  summaryparagraph.innerHTML =`${episode.summary}`
  rootElem.appendChild(summaryparagraph);

  });

}

var dropDown = document.getElementById("mySelect");
var option = document.createElement("option")
  option.text="S01E01";
  dropDown.add(option);
//console.log(dropDown.innerHTML);



const searchInput = document.getElementById("searchText");

searchInput.addEventListener("input",(event)=>{
  const searchString = event.target.value.toLowerCase();
  const filteredEpisodes = getAllEpisodes().filter((episode)=>{
    return ( episode.summary.toLowerCase().includes(searchString)|| episode.name.toLowerCase().includes(searchString) );
  });
  makePageForEpisodes(filteredEpisodes);
});
window.onload = setup;
