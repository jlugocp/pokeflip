var num = 1;

//adds an onload event which calls the init function
connect(window, 'onload', init);

//removes all coins
function clearCoins(){
    var coinsDiv = $('coinsDiv');
    for (var i=coinsDiv.childNodes.length-1; i > -1; i--){
        coinsDiv.removeChild(coinsDiv.childNodes[i]);
    }
}

//disables all buttons
function disableButtons(disable){
    $('flipBtn1').disabled = disable;
    $('flipBtn').disabled = disable;
    $('flipTilHeadsBtn').disabled = disable;
    $('flipTilTailsBtn').disabled = disable;
}

//flips num (global variable) number of coins
function flip_n(evt){
    clearCoins();
    disableButtons(true);
    
    wait(1).addCallback(function (res){
        for (var i=0; i<num; i++){
            flip();
        }
        disableButtons(false);
    });
    
}

function flip_1(evt){
    clearCoins();
    disableButtons(true);
    
    wait(1).addCallback(function (res){
        //for (var i=0; i<num; i++){
            flip();
        //}
        disableButtons(false);
    });
    
}
//flip coins until 'heads' or 'tails'
function flipTil(side){
    clearCoins();
    disableButtons(true);
    
    wait(1).addCallback(function (res){
        while (side != flip()){
        }
        disableButtons(false);
    });
}

//flip coins until tails
function flipTilTails(){
    flipTil('tails');
}

//flips coin until heads
function flipTilHeads(){
    flipTil('heads');
}

//flips a coin
function flip(){
    var ret = 'heads';
	var coinsDiv = $('coinsDiv');
	var img_elem = IMG();
	var random_num = Math.floor(Math.random()*10);//0 to 9
	random_num = random_num % 2;
	if (random_num == 1){
        ret = 'tails';
		img_elem.src = 'pix/tails.png';
	}else{
		img_elem.src = 'pix/heads.png';
	}
    appendChildNodes(coinsDiv, img_elem);
	return ret;
}

//increments the number in the 'num' div
function incrementNum(byThis){
	var newNum = num + byThis;
    
    //put a limit on the number of flips via the 'flip N' button
	if (newNum < 1 || newNum > 10)
		return;
	num = newNum;
	var div = $('num');
	div.removeChild(div.firstChild);
	appendChildNodes(div, num+'');
}

//initiliazation
function init(){
    //register event handlers for each button
	connect('flipBtn1', 'onclick', flip_1);
	connect('flipBtn', 'onclick', flip_n);
	connect('flipTilHeadsBtn', 'onclick', flipTilHeads);	
	connect('flipTilTailsBtn', 'onclick', flipTilTails);
}
