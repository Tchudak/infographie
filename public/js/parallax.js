var parallaxList = document.querySelectorAll('#parallax');
var parallaxDataList = []; 

parallaxList.forEach(parallax => {
    let parallaxFactor = parallax.dataset.parallax;

    if (window.scrollY > -400 && window.scrollY < 300) {
        parallax.style = 'transform : translateY(' + parallaxFactor * window.scrollY + 'px);'
    }
    else if (window.scrollY > 300) {
        parallax.style = 'transform : translateY(' + parallaxFactor * 300 + 'px);'
    }
    else {
        parallax.style = 'transform : translateY(' + parallaxFactor * -400 + 'px);'
    }
});
window.onscroll = function() {
    parallaxList.forEach(parallax => {
        let parallaxFactor = parallax.dataset.parallax;
        let scrollY = window.scrollY - window.innerHeight;
        if (scrollY > -400 && scrollY < 300) {
            parallax.style = 'transform : translateY(' + parallaxFactor * scrollY + 'px);'
        }
        else if (scrollY > 300) {
            parallax.style = 'transform : translateY(' + parallaxFactor * 300 + 'px);'
        }
        else {
            parallax.style = 'transform : translateY(' + parallaxFactor * -400 + 'px);'
        }
    });
}

