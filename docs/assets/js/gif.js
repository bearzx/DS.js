function freezeGifs() {
    /*
      The short pause allows any required callback functions
      to execute before actually highlighting, and allows
      the JQuery $(document).ready wrapper to finish.
     */
    setTimeout(function() {
        let gifs = document.querySelectorAll('.gif');
        giframes = [];
        for (let gif of gifs) {
            giframes.push(new Freezeframe(gif, { trigger: 'click', overlay: true }));
        }
    }, 200);
}

/*
  Only trigger the highlighter after document fully loaded.  This is
  necessary for cases where page load takes a significant length
  of time to fully load.
*/
if (document.readyState == 'complete') {
    freezeGifs();
} else {
    document.onreadystatechange = function () {
        if (document.readyState == "complete") {
            freezeGifs();
        }
    }
}