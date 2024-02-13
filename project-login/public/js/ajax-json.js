var resObj = fXHR();

function sndReq( i ) {
    resObj.open( 'get', 'info-json.txt', true );
    resObj.onreadystatechange = function() {
        handleResponse( i );
    }
    resObj.send( null );
}

function handleResponse( i ) {
    var daten = null;
    if( resObj.readyState == 4 && resObj.status === 200 ) {
        daten = JSON.parse( resObj.responseText );

        document.getElementById("info" + i ).innerHTML = daten.info[i];
    }
}

function out() {
    for( let i = 0; i < 3 ; i++){
        document.getElementById("info" + i ).innerHTML = "";
  }
}

function init() {
    const images = document.getElementsByTagName("img");
    for( let i = 0; i < images.length; i++) {
      images[i].onmouseover = () => { sndReq(i); }
      images[i].onmouseout = out;
    }
}

document.addEventListener("DOMContentLoaded", init);