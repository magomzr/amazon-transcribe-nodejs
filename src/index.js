const recordButton = document.getElementById("record");
const inputLanguageList = document.getElementById("input-language-list");
const transcribedText = document.getElementById("transcribed-text");

window.onRecordPress = () => {
  if (recordButton.getAttribute("class") === "recordInactive") {
    startRecording();
  } else {
    stopRecording();
  }
};

const startRecording = async () => {
  window.clearTranscription();
  const selectedLanguage = inputLanguageList.value;
  if (selectedLanguage === "nan") {
    alert("Please select a language");
    return;
  }
  inputLanguageList.disabled = true;
  recordButton.setAttribute("class", "recordActive");
  try {
    const { startRecording } = await import("./libs/transcribeClient.js");
    await startRecording(selectedLanguage, onTranscriptionDataReceived);
  } catch (error) {
    alert("An error occurred while recording: " + error.message);
    await stopRecording();
  }
};

const onTranscriptionDataReceived = (data) => {
  transcribedText.insertAdjacentHTML("beforeend", data);
};

const stopRecording = async function () {
  inputLanguageList.disabled = false;
  recordButton.setAttribute("class", "recordInactive");
  const { stopRecording } = await import("./libs/transcribeClient.js");
  stopRecording();
};

window.clearTranscription = () => {
  transcribedText.innerHTML = "";
};
