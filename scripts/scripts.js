const intervalDivPoints = setInterval(() => {
  const divBottomChatTwitch = getElementByXpath("//div[@class='chat-input__buttons-container tw-flex tw-justify-content-between tw-mg-t-1']");
  if (divBottomChatTwitch) {
    clearInterval(intervalDivPoints);
    
    const divPoints = document.createElement("div");
    divPoints.classList.add("tw-inline-flex", "tw-relative", "tw-tooltip-wrapper", "revert-position");
    divBottomChatTwitch.appendChild(divPoints);
    
    const button = document.createElement("button");
    button.classList.add("button-points-receiver");
    divPoints.appendChild(button);

    const icon = document.createElement("div");
    icon.classList.add("icon");
    button.appendChild(icon);

    const spanNumber = document.createElement("span");
    if(localStorage.getItem("gg_pointsReceivedToday")){
      compareDates();
      spanNumber.innerHTML = localStorage.getItem("gg_pointsReceivedToday");
    }else{
      localStorage.setItem("gg_pointsReceivedToday", "00");
      spanNumber.innerHTML = localStorage.getItem("gg_pointsReceivedToday");
    }
    spanNumber.id = "span-number-points-receiver";
    spanNumber.classList.add("number-points-receiver");
    button.appendChild(spanNumber);

    const divTip = document.createElement("div");
    divTip.innerHTML = "Pontos recolhidos automaticamente";
    divTip.classList.add("tw-tooltip", "tw-tooltip--align-center", "tw-tooltip--up");
    divPoints.appendChild(divTip);       
  };
}, 1000);

const intervalPStreamer = setInterval(() =>{
  const pStreamer = getElementByXpath("//p[@class='tw-c-text-inherit tw-font-size-5 tw-white-space-nowrap']");
  if (pStreamer) {
    clearInterval(intervalPStreamer);
    compareStreamers(pStreamer.innerHTML);
    getElementByXpath("//span[@id='span-number-points-receiver']").innerHTML = localStorage.getItem("gg_pointsReceivedToday");
  }
}, 1000);

const intervalConfigTwitch = setInterval(() => {  
  const divConfigTwitch = getElementByXpath("//div[@class='chat-settings__content tw-border-bottom-left-radius-medium tw-border-bottom-right-radius-medium tw-c-background-base tw-c-text-base tw-pd-1']");
  if (divConfigTwitch) {
    if(!getElementByXpath("//p[@id='GetGiftTitleId']")){
      const divDivisor = document.createElement("div");
      divDivisor.classList.add("tw-border-t", "tw-mg-t-1", "tw-mg-x-05", "tw-pd-b-1");
      divConfigTwitch.appendChild(divDivisor);    

      const divConfig = document.createElement("div");
      divConfig.classList.add();
      divConfigTwitch.appendChild(divConfig); 

      const divName = document.createElement("div");
      divName.classList.add("tw-mg-y-05", "tw-pd-x-05");
      divConfig.appendChild(divName);

      const pName = document.createElement("P");
      pName.id = "GetGiftTitleId";
      pName.classList.add("tw-c-text-alt-2", "tw-font-size-6", "tw-strong", "tw-upcase");
      pName.innerHTML = "Get Gift";
      divName.appendChild(pName);

      const divLabelSound = document.createElement("div");
      divLabelSound.classList.add("tw-pd-05");
      divConfig.appendChild(divLabelSound);

      const divNameLabelSound = document.createElement("div");
      divNameLabelSound.classList.add("tw-align-items-center", "tw-flex");
      divLabelSound.appendChild(divNameLabelSound);

      const labelSoundName = document.createElement("label");
      labelSoundName.classList.add("tw-drop-down-menu-input-item__label", "tw-flex-grow-1", "tw-mg-r-2");
      labelSoundName.innerHTML = "Habilitar/Desalitar som";
      labelSoundName.htmlFor = "gg-toggle-sound-name";
      divNameLabelSound.appendChild(labelSoundName);

      const divLabelToggleSound = document.createElement("div");
      divLabelToggleSound.classList.add("tw-toggle");
      divNameLabelSound.appendChild(divLabelToggleSound);
      
      const inputToggleSound = document.createElement("input");
      inputToggleSound.id = "gg-toggle-sound-name";
      inputToggleSound.type = "checkbox";
      inputToggleSound.checked = localStorage.getItem("gg_soundCheck") == "true" ? true : false; 
      inputToggleSound.classList.add("tw-toggle__input");
      divLabelToggleSound.appendChild(inputToggleSound);
      setInterval(() =>{
        if (inputToggleSound.checked) {
          localStorage.setItem("gg_soundCheck", true);
        }else{
          localStorage.setItem("gg_soundCheck", false);
        }
      }, 100);

      const labelInputSoundName = document.createElement("label");
      labelInputSoundName.classList.add("label-input-sound-name", "tw-toggle__button");
      labelInputSoundName.htmlFor = "gg-toggle-sound-name";
      divLabelToggleSound.appendChild(labelInputSoundName);

      const pLabelInputName = document.createElement("P");
      pLabelInputName.classList.add("tw-hide-accessible");
      pLabelInputName.innerHTML = "Habilitar/Desalitar som";
      labelInputSoundName.appendChild(pLabelInputName);
    }
  }
}, 500);


let totalPointsReceived = 0;
let valuePointReceived;
const intervalClickButtonGift = setInterval(() =>{
  const btnGift = getElementByXpath("//span[@data-a-target='tw-core-button-label-text']");
  if (!btnGift){
    return "Button Gift Not Find!";
  }
  btnGift.click();
  audioPlay(true);
  const intervalValuePointReceived = setInterval(() => {
    valuePointReceived = getElementByXpath("//div[@class='tw-align-items-center tw-c-text-link tw-flex tw-pd-y-05']");
    if (valuePointReceived){
      clearInterval(intervalValuePointReceived);
      totalPointsReceived = parseInt(localStorage.getItem("gg_pointsReceivedToday")) + parseInt(valuePointReceived.innerText.split("+")[1]);
      localStorage.setItem("gg_pointsReceivedToday", totalPointsReceived);
      getElementByXpath("//span[@id='span-number-points-receiver']").innerHTML = localStorage.getItem("gg_pointsReceivedToday");
    }

  }, 500);
}, 5000);


function compareDates() {
  let date = new Date().getDate()+""+new Date().getMonth()+""+new Date().getFullYear();
  
  if(!(localStorage.getItem("gg_lastDate") == date)){
    localStorage.setItem("gg_pointsReceivedToday", "00");
    localStorage.setItem("gg_lastDate", date);
  }
}

function compareStreamers(currentStreamer) {
  if (localStorage.getItem("gg_lastStreamer") === null) {
    localStorage.setItem("gg_lastStreamer", currentStreamer);
  }
  if (!(localStorage.getItem("gg_lastStreamer") == currentStreamer)) {
    localStorage.setItem("gg_pointsReceivedToday", "00");
    localStorage.setItem("gg_lastStreamer", currentStreamer);
  }
}

function audioPlay() {
  if (localStorage.getItem("gg_soundCheck") == "true") {
    let audio = new Audio(chrome.runtime.getURL("assets/beep.mp3"));
    audio.play();
  }
}

function getElementByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
