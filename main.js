Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};

var currentTimeout = NaN;

function start(){
    var c = document.getElementById('pixelart');
    let ctx = c.getContext('2d');
    ctx.moveTo(0,0);
    
    let img = new Image();
    img.src = 'saves/save.png';
    ctx.drawImage(img, 0, 0);

    let px = 5;
    $('#px')[0].value = px;
    $('#r')[0].value = 0;
    $('#g')[0].value = 0;
    $('#b')[0].value = 0;
    
    // When clicked on canvas
    $('#pixelart').click(function(e){
        px = parseInt($('#px')[0].value).clamp(1, 10);
        $('#px')[0].value = px;
        // Read RGB values
        let r = parseInt($('#r')[0].value).clamp(0, 255);
        let g = parseInt($('#g')[0].value).clamp(0, 255);
        let b = parseInt($('#b')[0].value).clamp(0, 255);
        // Calculate click position
        let x = e.pageX - $(this).position().left - 1;
        let y = e.pageY - $(this).position().top - 1;
        x = x - (x%px);
        y = y - (y%px);
        // Fill "pixel"
        ctx.fillStyle = "rgba("+r+","+g+","+b+","+(255/255)+")";
        ctx.fillRect(x, y, px, px);
        //Save image to the server
        clearTimeout(currentTimeout);
        currentTimeout = setTimeout(function(){save(c);}, 5000);
        // Load image from server
        let img = new Image();
        img.src = 'saves/save.png';
        ctx.drawImage(img, 0, 0);
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
    });
};
