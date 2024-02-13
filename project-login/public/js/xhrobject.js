function fXHR() {               //erzeuge ein XHR-Object
    let responseObject = null ;         //das xhr-Object

    try {
        responseObject = new ActiveXObject("Microsoft.XMLHTTP") ;           // wird für alte internet Explorer benutzt
    } catch(e) {
        try {
            responseObject = new ActiveXObject("MSXML2.XMLHTTP") ;
        } catch(e) {
            try{
                responseObject = new XMLHttpRequest() ;                     // wird für alle anderen neuen Browser verwendet
            } catch(e) {
                alert ("Erzeugung des XMLHttpRequest fehlgeschlagen")
                return false;
            }
        }
    }
    return responseObject ;
}