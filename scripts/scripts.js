const intervalDivPoints = setInterval(() => {
  const divDefaultTwitch = getElementByXpath("//div[@class='chat-input__buttons-container tw-flex tw-justify-content-between tw-mg-t-1']");
  if (divDefaultTwitch) {
    clearInterval(intervalDivPoints);

    const divPoints = document.createElement("div");
    divPoints.classList.add("tw-inline-flex", "tw-relative", "tw-tooltip-wrapper", "revert-position");
    divDefaultTwitch.appendChild(divPoints);

    
    const button = document.createElement("button");
    button.classList.add("button-points-receiver");
    divPoints.appendChild(button);    

    const icon = document.createElement("div");
    icon.classList.add("icon");
    button.appendChild(icon);

    const spanNumber = document.createElement("span");
    spanNumber.innerHTML = "00";
    spanNumber.id = "span-number-points-receiver";
    spanNumber.classList.add("number-points-receiver");
    button.appendChild(spanNumber);


    const divTip = document.createElement("div");
    divTip.innerHTML = "Pontos recolhidos automaticamente";
    divTip.classList.add("tw-tooltip", "tw-tooltip--align-center", "tw-tooltip--up");
    divPoints.appendChild(divTip); 
  }
}, 1000);


let totalPointsReceived = 0;  
let valuePointReceived;

const intervalClickButtonGift = setInterval(() =>{
  const btnGift = getElementByXpath("//span[@data-a-target='tw-core-button-label-text']"); 

  if (!btnGift){
    return "Button Gift Not Find!";
  }
  btnGift.click();

  const intervalValuePointReceived = setInterval(() => {      
    valuePointReceived = getElementByXpath("//div[@class='tw-align-items-center tw-c-text-link tw-flex tw-pd-y-05']"); 

    if (valuePointReceived){
      clearInterval(intervalValuePointReceived);
      totalPointsReceived = totalPointsReceived + parseInt(valuePointReceived.innerText.split("+")[1]);
      getElementByXpath("//span[@id='span-number-points-receiver']").innerHTML = totalPointsReceived;
    }
  }, 500);

}, 5000);

function getElementByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
