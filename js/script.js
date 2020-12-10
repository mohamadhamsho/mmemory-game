// Create A Value To Start Page And Start Button
const startPage = document.querySelector('.start-page'),
    startBtn = document.querySelector('.start-page .btn'),
    restartBtn = document.querySelector('.restart'),
    yourName = document.querySelector('.your-name'),
    theInput = document.querySelector('.start-page #the-name'),
    warrningMessage = document.querySelector('.warrning');
    endPage = document.querySelector('.end-page');

startBtn.onclick = function() {

    if (theInput.value === '') {

        // Remove Class On Warrning Message
        warrningMessage.classList.add('show');
    } else {
        // Remove Class On Warrning Message
        warrningMessage.classList.remove('show');

        // Start Page Remove
        startPage.classList.add('hide');
    
        // Write The Name In The Game
        yourName.textContent = capitalizeWordFunction(theInput.value);

        var seconds = 179;
    countDown = setInterval(() => {
        
    const minutes = Math.floor(seconds / 60),
        remSeconds = seconds % 60,
        countDownDiv = document.querySelector('.count-down');

    countDownDiv.innerHTML = minutes + ':' + remSeconds;
    if (remSeconds < 10) {
        countDownDiv.innerHTML = minutes + ':' + '0' + remSeconds;
    }

    if (seconds > 0) {
        seconds = seconds - 1;
    } else {
        endPage.classList.add('show');

        clearInterval(countDown);
    }
}, 1000);        
    }
}
restartBtn.onclick = function (){
    
    endPage.classList.remove('show');
    startPage.classList.remove('hide');

}





// Capitalize The First Letter Function
function capitalizeWordFunction(theWords) {
    var oldArray = theWords.split(' '),
        newArray = [];
        
        oldArray.forEach(element => {
        newArray.push(element.charAt(0).toUpperCase() + element.slice(1))
        });
    return newArray.join(' ');
}
const duration = 1000,
    blocks = document.querySelector('.game-content'),
    blocksElement = Array.from(blocks.children),
    // orderRange = [...Array(blocksElement.length).keys()];
    orderRange = Array.from(Array(blocksElement.length).keys());

shuffle(orderRange);


blocksElement.forEach((element, index) => {
    
    element.style.order = orderRange[index];

    element.addEventListener('click', function (){

        flipBlock(element);
    })
    
})

function flipBlock(selectedBlock) {

    selectedBlock.classList.add('is-flipped');

    let allFlippedBlocks = blocksElement.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    if (allFlippedBlocks.length === 2) {

        // Stop Clicking function
        stopClicking();

        // Check Matched function
        checkMathedBlocks(allFlippedBlocks[0], allFlippedBlocks[1])
    }
}

function stopClicking() {

    blocks.classList.add('no-clicking');

    setTimeout(() => {

    blocks.classList.remove('no-clicking');

    }, duration)
}

function checkMathedBlocks(firstBlock, secondBlock) {

    let triesElement = document.querySelector('.tries span');

    if (firstBlock.dataset.animals === secondBlock.dataset.animals) {

        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        firstBlock.classList.add('has-matched');
        secondBlock.classList.add('has-matched');

        setTimeout(() => {
            firstBlock.classList.add('has-matched-fadeOut')
            secondBlock.classList.add('has-matched-fadeOut')

            document.querySelector('#correct').play();
        }, duration)
    } else {

        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        setTimeout(() => {

            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');

            document.querySelector('#wrong').play();
        }, duration)
    }
}

function shuffle(array) {

    let current = array.length,
        temp,
        random;

        while (current > 0) {
            random = Math.floor(Math.random() * current);

            current--;
            
            temp = array[current];

            array[current] = array[random];

            array[random] = temp;
        }
        

        return array;
    }