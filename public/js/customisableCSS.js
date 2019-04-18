function swapStyleSheet(sheet){
    document.getElementById('pagestyle').setAttribute('href', sheet);
}

function myMessage() {
    document.getElementById("demo").innerHTML = "Faster technology";
  }

  function myClick(x) {
    x.style.background = "orange";
}