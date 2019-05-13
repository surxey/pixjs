Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
};

var currentTimeout;
var c;
var ctx;
function start(){
    c = document.getElementById('pixelart');
    ctx = c.getContext('2d');
    
    let img = new Image;
    img.onload = function(){
        ctx.drawImage(img, 0, 0);
    };
    img.src = 'http://surx.org/pixjs/saves/save.png';

    let px = 5;
    $('#px')[0].value = px;
    $('#r')[0].value = 0;
    $('#g')[0].value = 0;
    $('#b')[0].value = 0;
    
    // When clicked on canvas
    $('#pixelart').click(function(e){
        // Clear canvas
        ctx.clearRect(0, 0, c.width, c.height);
        // Load image from server
	    $('#log')[0].textContent = 'Loading...';
        load(e);
    });
};

function save(c) {
    // Convert to encoded Base64 data
	var dataURL = c.toDataURL('image/png');
    // Send to page upload_data.php
    $.ajax({
        type: "POST",
        url: "upload_data.php",
        data: {
            img: dataURL
        }
    }).done(function(o) {
        console.log(o);
        $('#log')[0].textContent = o;
    });
};

function continueFilling(e){
    px = parseInt($('#px')[0].value).clamp(1, 10);
    $('#px')[0].value = px;
    // Read RGB values
    let r = parseInt($('#r')[0].value).clamp(0, 255);
    let g = parseInt($('#g')[0].value).clamp(0, 255);
    let b = parseInt($('#b')[0].value).clamp(0, 255);
    // Calculate click position
    let x = e.pageX - $('#pixelart').position().left - 1;
    let y = e.pageY - $('#pixelart').position().top - 1;
    x = x - (x%px);
    y = y - (y%px);
    // Fill "pixel"
    ctx.fillStyle = "rgba("+r+","+g+","+b+","+(255/255)+")";
    ctx.fillRect(x, y, px, px);
    //Save image to the server
    clearTimeout(currentTimeout);
    currentTimeout = setTimeout(function(){save(c);}, 0);
}

function load(e) {
    var req = new XMLHttpRequest();
    //req.withCredentials = true;
    req.onload = function() {
            var reader = new FileReader();
            reader.onloadend = function() {
                let img = new Image;
                img.onload = function(){
                    ctx.drawImage(img, 0, 0);
                    continueFilling(e);
	            };
                img.src = reader.result;
            };
            reader.readAsDataURL(req.response);

    };
    req.open("GET", 'http://surx.org/pixjs/saves/save.png', true);
    req.responseType = 'blob';
    req.send();    
}

