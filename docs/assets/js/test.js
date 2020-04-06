window.onload = function() {
    var gifElements = document.querySelectorAll('img.gif');
    console.log(gifElements);

    for (var element of gifElements) {
        // console.log(e);

        // var element = gifElements[e];

        console.log(element.nodeName);

        if (element.nodeName == 'IMG') {

            var supergif = new SuperGif({
                gif: element,
                progressbar_height: 0,
                auto_play: false,
            });
            console.log(supergif);

            var controlElement = document.createElement("div");
            controlElement.className = "gifcontrol loading g";

            supergif.load((function (controlElement) {
                controlElement.className = "gifcontrol paused";
                var playing = false;
                controlElement.addEventListener("click", function () {
                    if (playing) {
                        this.pause();
                        playing = false;
                        controlElement.className = "gifcontrol paused";
                    } else {
                        this.play();
                        playing = true;
                        controlElement.className = "gifcontrol playing";
                    }
                }.bind(this, controlElement));

            }.bind(supergif))(controlElement));

            var canvas = supergif.get_canvas();
            controlElement.style.width = canvas.width + "px";
            controlElement.style.height = canvas.height + "px";
            controlElement.style.left = canvas.offsetLeft + "px";
            var containerElement = canvas.parentNode;
            containerElement.appendChild(controlElement);

        }
    }
};