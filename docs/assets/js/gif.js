window.onload = function() {
    gifs = document.querySelectorAll('.gif');
    giframes = [];
    for (let gif of gifs) {
        giframes.push(new Freezeframe(gif, { trigger: 'click', overlay: true }));
    }
};