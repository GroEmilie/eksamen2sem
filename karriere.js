let slideIds = [{slider: 'one', dot: 'dotone', count: 0}, 
                {slider: 'two', dot: 'dottwo', count: 1}, 
                {slider: 'three', dot: 'dotthree', count: 2},                       
                {slider: 'four', dot: 'dotfour', count: 3}];
let count = 0;


let slider = setInterval(setInt, 20000)


//main interval function
function setInt(){
    let curSlide = slideIds[count];
    document.getElementById(curSlide.dot).classList.remove('dot-active');
    document.getElementById(curSlide.slider).style.transform = 'translateX(-150vw)';
    slideRight(curSlide.slider);
    if (count === slideIds.length - 1) { count = 0; } else { count++; }
    curSlide = slideIds[count];
    document.getElementById(curSlide.slider).style.transform = 'translateX(0px)';
    document.getElementById(curSlide.dot).classList.add('dot-active');
}

// takes the slide that has been shifted off the screen left back around to the right side
function slideRight(id){
    setTimeout(function() {
        document.getElementById(id).classList.add('under');
        document.getElementById(id).style.transform = 'translateX(150vw)';
    }, 601);
    setTimeout(function() {
        document.getElementById(id).classList.remove('under');
        document.getElementById(id).classList.add('over');
    }, 1202);
}
// when controls are clicked
function changeSlide(id, clickedControls){
    //if current slide, don't do anything
    if(document.getElementById(id).style.transform === 'translateX(0px)'){ return }
    clearInterval(slider);
    // git rid of current slide and corresponding dot
    document.getElementById(slideIds[count].dot).classList.remove('dot-active');    
    document.getElementById(slideIds[count].slider).style.transform = 'translateX(-150vw)';
    slideRight(slideIds[count].slider);
    // show slide by passed in id
    document.getElementById(id).style.transform = 'translateX(0px)';
    // get current slide info from filtering slide id's array to match id passed in
    let slide = slideIds.filter(obj => obj.slider === id); 
    count = slide[0].count;
    document.getElementById(slide[0].dot).classList.add('dot-active'); 
  // if clickedControls is passed in, it means they are still hovering over the slider and the interval shouldn't start again. once they stop hovering, we will start the slider again with the 'mouseleave' event listener
    if (!clickedControls){
        slider = setInterval(setInt, 20000);
    }
}

let slides = document.getElementById('slide-wrapper').querySelectorAll('div.slide');
// stop slider on hover and add styles for hover
// var i og lægger en oven i 
for (let i=0; i<slides.length; i++){
  slides[i].addEventListener('mouseenter', function(e){
    console.log('in')
    clearInterval(slider);
    document.getElementById('left').style.opacity = '3';
    document.getElementById('right').style.opacity = '3';
    this.style.transform = 'scale(1.01)';
})

// continue slider and remove hover styles
  slides[i].addEventListener('mouseleave', function(e){
    console.log('out')
    slider = setInterval(setInt, 20000);  
    document.getElementById('left').style.opacity = '0.75';
    document.getElementById('right').style.opacity = '0.75';
    this.style.transform = 'scale(1)';
})
}

// when left or right arrows are clicked, we find the previous or next slide's id and pass that into the changeSlide function
function controlSlide(prev, next){
    let idx;
    if(prev){
            if (count === 0) { idx = slideIds[slideIds.length - 1].slider } else { idx = slideIds[count - 1].slider }
    }  else {
      if (count === slideIds.length - 1) { idx = slideIds[0].slider } else { idx = slideIds[count + 1].slider }
    } 
    changeSlide(idx);
}