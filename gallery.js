(function(){
  
    var counter = 0, // to keep track of current slide
    $items = document.querySelectorAll('.gallery figure'), // a collection of all of the slides, caching for performance
    numItems = $items.length; // total number of slides

    document.getElementById('allpics').innerHTML = numItems;

    // this function is what cycles the slides, showing the next or previous slide and hiding all the others
    var showCurrent = function(){
        var itemToShow = Math.abs(counter%numItems);// uses remainder (aka modulo) operator to get the actual index of the element to show  
  
        // remove .show from whichever element currently has it 
        [].forEach.call( $items, function(el){
            el.classList.remove('show');
        });
  
        // add .show to the one item that's supposed to have it
        $items[itemToShow].classList.add('show');    

        document.getElementById('thepic').innerHTML = counter+1;

    };

    // add click events to prev & next buttons 
    document.querySelector('.next').addEventListener('click', function() {
        if (counter>=numItems-1) {
          counter=0;
        } else{
          counter++;
        }
        showCurrent();
    }, false);

    document.querySelector('.prev').addEventListener('click', function() {
        if (counter<1) {
          counter = numItems-1;
        } else {
          counter--;
        }
        showCurrent();
    }, false);

})(); 

/* thank you, leemark (https://github.com/leemark/simple-slideshow) */