const audio = document.getElementById("myAudio");
const audio_source = document.getElementById("audioSource");
const playBtn = document.getElementById("playBtn");
const pause_icon = document.getElementById("pause_icon");
const play_icon = document.getElementById("play_icon");
const muteBtn = document.getElementById("muteBtn");
const muteIcon = document.getElementById("muteIcon");
const audio_currentTime = document.getElementById("audio_currentTime");
const audio_durationTime = document.getElementById("audio_durationTime");
const orderBtn = document.getElementById("orderBtn");
const previous_btn = document.getElementById("previous_btn");
const next_btn = document.getElementById("next_btn");
const orderIcon = document.getElementById("orderIcon");
const icons = ['shuffle' , 'repeat' , 'repeat_one']
const songs_cards_container = document.querySelector('.cards_container')
const music_name = document.getElementById("music_name")
let orderCounter = 0;
let progressBar = document.getElementById("progressBar");
let progressBarFill = document.createElement("div");
const menu_btn = document.querySelector(".menu-btn")
const music_list_section = document.querySelector(".music_list_section")
let played = false;
let muted = false;
let menu_clicked = false ;
progressBarFill.id = "progressBarFill";
progressBar.appendChild(progressBarFill);

function setDisplayProperty() {
  if (window.innerWidth > 768) {
    music_list_section.style.display = 'block';
  } else {
    music_list_section.style.display = 'none';
  }
}

// set initial display property on page load
setDisplayProperty();

// add event listener to update display property on resize
window.addEventListener('resize', setDisplayProperty);

menu_btn.addEventListener('click' , ()=>{
  if(menu_clicked){
    if (window.innerWidth > 768) {
      music_list_section.style.display = 'block';
    } else {
      music_list_section.style.display = 'flex';
    }
    menu_clicked = false;
  }
  else{
    if (window.innerWidth > 768) {
      music_list_section.style.display = 'none';
    } else {
      music_list_section.style.display = 'none';
    }
    menu_clicked = true;
  }
  
})

playBtn.addEventListener("click", () => {
  if (played){
    pause_icon.style.display = "none";
    play_icon.style.display = "block";
    audio.pause();
    played = false;
  }
  else{
    pause_icon.style.display = "block";
    play_icon.style.display = "none";
    audio.play();
    played = true;
  }
  
});
progressBar.addEventListener("click", function(event) {
  let totalWidth = progressBar.offsetWidth;
  let clickedWidth = event.offsetX;
  let percentClicked = (clickedWidth / totalWidth) * 100;
  let newTime = (percentClicked / 100) * audio.duration;
  audio.currentTime = newTime;
});

audio.addEventListener("timeupdate", function() {
  let percentComplete = (audio.currentTime / audio.duration) * 100;
  progressBarFill.style.width = percentComplete + "%";
  let minutes = Math.floor(audio.currentTime / 60);
  let seconds = Math.floor(audio.currentTime % 60);
  audio_currentTime.innerHTML = `${minutes}:${seconds}`;
  let d_minutes = Math.floor(audio.duration / 60);
  let d_seconds = Math.floor(audio.duration % 60);
  audio_durationTime.innerHTML = `${d_minutes}:${d_seconds}`;
});
orderBtn.addEventListener('click',()=>{
  orderCounter++;
  if(orderCounter > 2){
    orderCounter = 0;
  }
  orderIcon.innerHTML = icons[orderCounter]

})
muteBtn.addEventListener('click' , ()=>{
  if(muted){
    audio.muted = false;
    muted = false;
    muteIcon.innerHTML = 'volume_up'
  }
  else{
    audio.muted = true;
    muted = true;
    muteIcon.innerHTML = 'volume_off'
  }
})

const songs = [
  {
    'name':'AC DC - Back In Black',
    'img' :''
  },
  {
    'name':'Alan Walker, K-391 & Emelie Hollow - Lily',
    'img' :''
  },
  {
    'name':"Dirty Heads -Vacation",
    'img' :''
  },
  {
    'name':"Hotline Bling",
    'img' :''
  },
  {
    'name':"Imagine Dragons - Sharks",
    'img' :''
  },
  {
    'name':"Ludovico Einaudi - Experience",
    'img' :''
  },
  {
    'name':"Yann Tiersen - Comptine d'un autre été (Amélie)",
    'img' :''
  },
  {
    'name':"Rohi Yanssmah",
    'img' :''
  }
]
let active_song_index = 0;
audio_source.src = `songs/${songs[active_song_index].name}.mp3`
music_name.innerHTML = `${songs[active_song_index].name}`
audio.load()
next_btn.addEventListener('click' , ()=>{
  if(active_song_index > (songs.length - 1)){
    active_song_index = 0;
  }
  else{
    active_song_index++;
  }
  pause_icon.style.display = "block";
  play_icon.style.display = "none";
  audio_source.src = `songs/${songs[active_song_index].name}.mp3`
  music_name.innerHTML = `${songs[active_song_index].name}`
  audio.load()
  audio.play()
})
previous_btn.addEventListener('click' , ()=>{
  if(active_song_index < 0 ){
    active_song_index = songs.length - 1;
  }
  else{
    active_song_index--;
  }
  pause_icon.style.display = "block";
  play_icon.style.display = "none";
  audio_source.src = `songs/${songs[active_song_index].name}.mp3`
  music_name.innerHTML = `${songs[active_song_index].name}`
  audio.load()
  audio.play()
})

let songs_cards = songs.forEach((song , index)=>{
  console.log(song.name)
  songs_cards_container.innerHTML +=
    `
    <div class="cards_row">
      <div class="songCard ">
          <div>
              <button class="playBtn" id="playBtn_${index}"><i class="material-icons" id="play_icon">play_arrow</i>
          </div>
          <div>
              <h1>${song.name}</h1>
          </div>
      </div>
    </div>
    `
  
})

songs.forEach((song , index)=>{
  const song_Btn = document.getElementById(`playBtn_${index}`);
  song_Btn.addEventListener('click',()=>{
    audio_source.src = `songs/${song.name}.mp3`
    music_name.innerHTML = `${song.name}`
    active_song_index = index ;
    if (played){
      pause_icon.style.display = "none";
      play_icon.style.display = "block";
      song_Btn.innerHTML = `<i class="material-icons" id="play_icon">play_arrow</i>`
      audio.pause();
      played = false;
    }
    else{
      pause_icon.style.display = "block";
      play_icon.style.display = "none";
      song_Btn.innerHTML= `<i class="material-icons" id="pause_icon">pause</i>`;
      let minutes = Math.floor(audio.duration / 60);
      let seconds = Math.floor(audio.duration % 60);
      audio_durationTime.innerHTML = `${minutes}:${seconds}`;
      played = true;
      audio.load()
      audio.play();
    }
  
  })
})