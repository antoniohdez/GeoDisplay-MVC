$("#preview-canvas").click(function(){
    $("#image").trigger("click");
});

function ShowImagePreview(files){
    if(!(window.File && window.FileReader && window.FileList && window.Blob)){
      alert('The File APIs are not fully supported in this browser.');
      return false;
    }

    if(typeof FileReader === "undefined"){
        alert("Filereader undefined!");
        return false;
    }

    var file = files[0];
    if(file == undefined){
        var canvas = document.getElementById('preview-canvas');
        var context = canvas.getContext( '2d' );
        context.clearRect(0, 0, canvas.width, canvas.height);
    }else{
        if(!( /image/i ).test(file.type)){
            alert( "File is not an image." );
            return false;
        }
    }
    
    reader = new FileReader();
    reader.onload = function(event) { 
        var img = new Image;
        img.onload = UpdatePreviewCanvas;
        img.src = event.target.result;
    }
    reader.readAsDataURL(file);
}

function UpdatePreviewCanvas(){
    var img = this;
    var canvas = document.getElementById('preview-canvas');

    if(typeof canvas === "undefined" || typeof canvas.getContext === "undefined")
        return;

    var context = canvas.getContext( '2d' );
    context.clearRect(0, 0, canvas.width, canvas.height);

    var world = new Object();
    world.width = canvas.offsetWidth;
    world.height = canvas.offsetHeight;

    canvas.width = world.width;
    canvas.height = world.height;

    if(typeof img === "undefined")
        return;

    var WidthDif = img.width - world.width;
    var HeightDif = img.height - world.height;

    var Scale = 0.0;
    if(WidthDif > HeightDif){
        Scale = world.width / img.width;
    }
    else{
        Scale = world.height / img.height;
    }
    if(Scale > 1)
        Scale = 1;

    var UseWidth = Math.floor( img.width * Scale );
    var UseHeight = Math.floor( img.height * Scale );

    var x = Math.floor( ( world.width - UseWidth ) / 2 );
    var y = Math.floor( ( world.height - UseHeight ) / 2 );

    context.drawImage(img, x, y, UseWidth, UseHeight);  
}