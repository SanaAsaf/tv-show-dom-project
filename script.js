const url = getUrlFromId(82);
let allEpisodes =[];
const searchInput = document.getElementById("searchText");
const dropDown = document.getElementById("mySelect");
const backButton = document.getElementById("backButton");
const dropDownShow = document.getElementById("selectShow");


function setup() {
  makeShowDropdownItems();
  //fetch json data
  fetch(url).then(res => res.json()).then(data => {
    allEpisodes = data;
    makePageForEpisodes(allEpisodes);
  })
  .catch((err) => console.error(err));
  backButton.disabled = true;

}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
    
  // clear out the search input box and the drop down
  rootElem.innerHTML="";
  dropDown.innerHTML="";
  backButton.disabled=true;

  const countEpisodes = document.createElement("p");
  if (episodeList.length>72){
  countEpisodes.innerText = `Showing all 73 episodes`;
  backButton.disabled = true ;
  }
  else {
  countEpisodes.innerText = `Showing ${episodeList.length}/73`;  
  backButton.disabled = false;
  backButton.addEventListener("click",(event)=>{ 
    //dropDown.innerHTML="";
    makePageForEpisodes(allEpisodes);
  });
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

  // add summary paragraph and the episode summary is actually HTML
  const summaryparagraph = document.createElement("p");
  summaryparagraph.innerHTML =`${episode.summary}`
  rootElem.appendChild(summaryparagraph);

  // add option  to the select - dropdown 
  
  const option = document.createElement("option")
  option.text = `S${episode.season.toString().padStart(2,"0")}E${episode.number.toString().padStart(2,"0")}:${episode.name}`;
  option.value = episode.id;
  dropDown.appendChild(option);

  });

}
/**
 * Event Listeners
 */



// Search input an episode and display the episodes searched
searchInput.addEventListener("input",(event)=>{
  const searchString = event.target.value.toLowerCase();
  const filteredEpisodes = allEpisodes.filter((episode)=>{
    return ( episode.summary.toLowerCase().includes(searchString)|| episode.name.toLowerCase().includes(searchString) );
  });
  makePageForEpisodes(filteredEpisodes);
});

// Select from drop down an episode and display all the episode 
dropDown.addEventListener("change",(event)=>{
  // we now have episode.target.value which is the id of the episode selected in the drop down
  const idSelectedByUser = Number(event.target.value);
  const selectedEpisode = allEpisodes.find(
    (episode)=> episode.id === idSelectedByUser
    );
    if (selectedEpisode){
  makePageForEpisodes([selectedEpisode]);
  }
});

// Select from drop down a show and display all the shows
selectShow.addEventListener("change",(event)=>{
  const showIdSelectedByUser = Number(event.target.value);
  const nextFetchUrl = getUrlFromId(showIdSelectedByUser);
});




window.onload = setup;

/***
 * Helper functions
 */

function makeShowDropdownItems() {
  const allShows = getAllShows();
  allShows.forEach((show) => {
    const option = document.createElement("option");
    option.textContent = show.name;
    option.value = show.id;
    selectShow.appendChild(option);
  });
}

function getUrlFromId(id) {
  return `https://api.tvmaze.com/shows/${id}/episodes`;}