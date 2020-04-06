window.onload = function() {
    let gifs = document.querySelectorAll('.gif');
    giframes = [];
    for (let gif of gifs) {
        giframes.push(new Freezeframe(gif, { trigger: 'click', overlay: true }));
    }
};