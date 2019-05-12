Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};

function start(){
    let c = document.getElementById('pixelart');
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
    
    $('#pixelart').click(function(e){
        px = parseInt($('#px')[0].value).clamp(1, 10);
        $('#px')[0].value = px;

        let r = parseInt($('#r')[0].value).clamp(0, 255);
        let g = parseInt($('#g')[0].value).clamp(0, 255);
        let b = parseInt($('#b')[0].value).clamp(0, 255);

        let x = e.pageX - $(this).position().left - 1;
        let y = e.pageY - $(this).position().top - 1;
        x = x - (x%px);
        y = y - (y%px);
        ctx.fillStyle = "rgba("+r+","+g+","+b+","+(255/255)+")";
        ctx.fillRect(x, y, px, px);

        var dataURL = c.toDataURL('image/png');
	
	$.ajax({
            type: "POST",
            url: "upload_data.php",
            data: {
                img: dataURL
            }
        }).done(function(o) {
            console.log(o);
        });
	let img = new Image();
	img.src = 'saves/save.png';
	ctx.drawImage(img, 0, 0);

    })
}
