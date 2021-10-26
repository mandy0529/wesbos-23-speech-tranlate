const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
msg.text = document.querySelector('[name=text]').value;

let start = true;

const handleVoiceChange = (e) => {
  voices = e.target.getVoices();
  voicesDropdown.innerHTML = voices.map((voice) => {
    const {lang, name} = voice;
    return `<option value="${name}">${name} (${lang})</option>`;
  });
};

const handleSpeak = (start) => {
  speechSynthesis.cancel();
  if (start) {
    speechSynthesis.speak(msg);
  }
};

const setVoice = (e) => {
  const target = e.target.value;
  msg.voice = voices.find((voice) => voice.name === target);
  handleSpeak();
};

const setOption = (e) => {
  console.log('changed');
  msg[e.target.name] = e.target.value;
  handleSpeak();
};

speechSynthesis.addEventListener('voiceschanged', handleVoiceChange);
voicesDropdown.addEventListener('change', setVoice);
speakButton.addEventListener('click', handleSpeak);
stopButton.addEventListener('click', () => handleSpeak(!start));
options.forEach((option) => option.addEventListener('change', setOption));
