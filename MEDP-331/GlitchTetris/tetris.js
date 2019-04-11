//Rendering of Game
var canvas = document.getElementById('mycanvas');
var ctx = canvas.getContext('2d');
var raf;
var blocks = ['i','j','l','o','s','t','z'];
var arr = new Array(19);
var dx = (canvas.width/10);
var dy = (canvas.height/19)
var score = 0;
var currentBlock = 'j';
var isEnd = false;
/*Note:
if arr[i][j] ===
 0 -> Unoccupied
 1 -> occupied
 2 -> moving piece

*/
for(var i = 0; i <  arr.length;i++){
  arr[i] = new Array(10);
  for(var j = 0; j < arr[i].length; j++){
    arr[i][j] = 0;
  }
}

function renderGrid(){
  for(var i = 0; i < arr.length; i++){
    for(var j = 0; j < arr[i].length; j++){
        ctx.strokeStyle = ('#121212');
        ctx.strokeRect(0+dx*j,0+dy*(i-2),dx,dy);
        if(arr[i][j] === 1){
          ctx.fillStyle = ('black');
          ctx.fillRect(0+dx*j,0+dy*(i-2),dx,dy);
        }
        if(arr[i][j] == 2){
        switch(currentBlock){
          case 'i':
          ctx.fillStyle = ('cyan');
          ctx.fillRect(1+dx*j,1+dy*(i-2),dx-2,dy-2);
            break;
          case 'j':
          ctx.fillStyle = ('blue');
          ctx.fillRect(1+dx*j,1+dy*(i-2),dx-2,dy-2);
            break;
          case 'l':
          ctx.fillStyle = ('orange');
          ctx.fillRect(1+dx*j,1+dy*(i-2),dx-2,dy-2);
            break;
          case 'o':
          ctx.fillStyle = ('yellow');
          ctx.fillRect(1+dx*j,1+dy*(i-2),dx-2,dy-2);
            break
          case 's':
          ctx.fillStyle = ('green');
          ctx.fillRect(1+dx*j,1+dy*(i-2),dx-2,dy-2);
            break;
          case 't':
          ctx.fillStyle = ('purple');
          ctx.fillRect(1+dx*j,1+dy*(i-2),dx-2,dy-2);
            break;
          case 'z':
          ctx.fillStyle  = ('red');
          ctx.fillRect(1+dx*j,1+dy*(i-2),dx-2,dy-2);
            break;
        }

      }
    }//End for j
  }
} //End Grid Render



function generateBlock(){
  var type = blocks[Math.floor(Math.random()*7)];
  console.log(type);
  currentBlock = type;
  switch(type){
    case 'i':
      arr[0][4] = 2;
      arr[1][4] = 2;
      arr[2][4] = 2;
      arr[3][4] = 2;
      break;
    case 'j':
      arr[0][4] = 2;
      arr[1][4] = 2;
      arr[1][5] = 2;
      arr[1][6] = 2;
      break;
    case 'l':
      arr[1][4] = 2;
      arr[1][5] = 2;
      arr[1][6] = 2;
      arr[0][6] = 2;
      break;
    case 'o':
      arr[0][4] = 2;
      arr[0][5] = 2;
      arr[1][4] = 2;
      arr[1][5] = 2;
      break
    case 's':
      arr[1][4] = 2;
      arr[1][5] = 2;
      arr[0][5] = 2;
      arr[0][6] = 2;
      break;
    case 't':
      arr[1][3] = 2;
      arr[1][4] = 2;
      arr[0][4] = 2;
      arr[1][5] = 2;
      break;
    case 'z':
      arr[0][3] = 2;
      arr[0][4] = 2;
      arr[1][4] = 2;
      arr[1][5] = 2;
      break;
  }

}


function checkRound(i,j){
  if(j-1 === 0){
    if(arr[i][j+1] === 2){
      arr[i][j+1] = 1;
      checkRound(i,j+1);
    }
    if(i > 1 && arr[i-1][j] === 2){
      arr[i-1][j] = 1;
      checkRound(i-1,j)
    }
  } else if(j+1 === 10){
    if(arr[i][j-1] === 2){
      arr[i][j-1] = 1;
      checkRound(i,j-1);
    }
    if(i > 1 && arr[i-1][j] === 2){
      arr[i-1][j] = 1;
      checkRound(i-1,j)
    }
  } else{
    if(arr[i][j-1] === 2){
      arr[i][j-1] = 1;
      checkRound(i,j-1);
    }
    else if(arr[i][j+1] === 2){
      arr[i][j+1] = 1;
      checkRound(i,j+1);
    }

    if(i >1 && arr[i-1][j] === 2){
      arr[i-1][j] = 1;
      checkRound(i-1,j)
    }
  }

}

function detectCollision(){

  for(var i = arr.length-1; i >= 0; i--){
    var count = 0;
    for(var j = 0; j < arr[i].length; j++){
      if(arr[i][j] == 2){
        if(i === arr.length-1){
          arr[i][j] = 1;
          checkRound(i,j);
          generateBlock();
          break;
        } else{
          arr[i][j] = 0;
          arr[i+1][j] = 2;
        }
      }
      if(arr[i][j] === 1){
        count++;
        if(i <= 1){
          gameOver();
          break;
        }
        if(arr[i-1][j] === 2){
          arr[i-1][j] = 1;
          checkRound(i-1,j);
          generateBlock();
          break;
        }
      }
    }
    if(count === arr[i].length){
      for(var j = 0; j < arr[i].length; j++){
        arr[i][j] = 0;
      }
      pushdown(i);
      updateScore(100);
    }
  }

} //End function

function pushdown(i){
  while(i != 0){
    for(var j = 0; j < arr[i].length; j++){
      arr[i][j] = arr[i-1][j];
    }
    i--;
  }
}

function updateScore(value){
  score += value;
}
function displayScore(){
  document.getElementById("scoreShower").innerHTML = "Score: " + score;
}
function helperMove(y,x,dir){

  if(dir === 'LEFT'){
    if(x >= 1){
      if(arr[y][x-1] === 2){
        if(helperMove(y,x-1,dir)){
          arr[y][x-1] = arr[x][y];
          arr[y][x] = 0;
          return true;
        }

      } else if(arr[y][x-1] === 1){
        return false;
      } else{
        //Means empty space, and therefor, can move

        arr[y][x-1] = arr[y][x];
        arr[y][x] = 0;
        return true;
      }
    }
    return false;
  } else{
    if(x+1 < arr[y].length){
      if(arr[y][x+1] === 2){
        if(helperMove(y,x+1,dir)){
          arr[y][x+1] = arr[y][x];
          arr[y][x] = 0;
          return true;
        }
        return false;
      } else if(arr[y][x+1] === 1){
        return false;
      } else{
        arr[y][x+1] = arr[y][x];
        arr[y][x] = 0;
        return true;
      }
    }
    return false;
  }
}

window.onkeyup = function(event){
  var userInput = event.keyCode;

  for(var i = 0; i < arr.length; i++){

    for(var j = 0; j < arr[i].length; j++){
      if(userInput === 37 && arr[i][j] === 2){
        helperMove(i,j,'LEFT');


      } //end if
      else if(userInput === 39 && arr[i][j] === 2){
        helperMove(i,j,'RIGHT');
        break;
      }
    }
  }
}


function gameOver(){
  document.getElementById('game').innerHTML=`I'm sorry, but you lost. You can play again if you pay $4.99!`;
  isEnd = true;
}

function payDLC(){
  document.getElementById('game').innerHTML=`Congrats, you won level one! if you wish to play more, donate to us @giveUsMoney on our patreon page! Thank you!~`;
  isEnd = true;
}


var timer = 0;

function draw() {
  if(!isEnd){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    renderGrid();
    displayScore();

    timer++;

    if(timer === 20){
      detectCollision();
      timer = 0;
    }
    if(score >= 300){
      payDLC();
    }
  }

  raf = window.requestAnimationFrame(draw);
}

raf = window.requestAnimationFrame(draw);
generateBlock();
//END
