var input = document.getElementById("imgInput");
input.addEventListener('change',function (event) {
    var files = event.target.files||event.dataTransfer.files;
    if(files){
        var render = new FileReader();
        render.readAsDataURL(files[0]);
        render.onload = function () {
            var img = document.createElement("img");
            img.src = this.result;
            img.setAttribute("width","48%");
            img.setAttribute("height","115px");
            var imgList = document.getElementById("imgList")
            imgList.insertBefore(img,imgList.getElementsByTagName("button")[0]);
        };
        upUserImg();
    }
    /*var file = e.target.files||e.dataTransfer.files;
    if(file){
        var reader = new FileReader();
        reader.onload=function(){
            $("<img width='200px' src='"+this.result+"'/>").appendTo("body");
        }
        reader.readAsDataURL($("#file")[0].files[0]);
    }
*/
});