
var box =  document.getElementsByClassName("box");
var ships = [{name:"Carrier",size:5},{name:"Battleship",size:4},{name:"Cruiser",size:3},{name:"Submarine",size:3},{name:"Destroyer",size:2}]
var board = document.getElementsByClassName("board");
var shipObj;
var shipsAtBoard = [];
var rotate=false;
var box_position=0;
var size = ships[0].size;
var count = 0;
const socket =io();

socket.on('disparo',(data)=>{
    putShoot(box[data.position].firstChild)
});

for(let i=0;i<=100;i++){
    board[0].appendChild(document.createElement("div"));
    board[0].childNodes[i].className = "box";
}


function putShoot(box_position){
    box_position.appendChild(document.createElement("div"));
    box_position.childNodes[0].className = "shoot";
}
function putShipBox(box_position){
    box_position.appendChild(document.createElement("div"));
    box_position.childNodes[0].className = "ship";
}
function removeShipBox(box_position){
    box_position.removeChild(box_position.childNodes[0])
}


for(let i = 0;i<box.length;i++){
    box[i].addEventListener("click",function(e){
        if(this.firstChild !== null && this.firstChild.className === "ship" && this.firstChild.childNodes[0] === undefined){
            putShoot(this.firstChild);
            console.log(`You shoot at ${i} ship!!`);
            socket.emit('disparo',{position:i});
        }
        else if(this.firstChild === null){
            putShoot(this);
            console.log(`You miss`);
        }
        else{
            console.log(`You already shooted here`);
        }
    },true );
}

function putShip(size,box_position,rotate){
    if(rotate){
        for(let r=0; r<size;r++){
            putShipBox(box[box_position+r*10]);
        }
    }
    else{
        for(let r=0; r<size;r++){
            putShipBox(box[box_position+r]);
        }
    }
}

function removeShip(size,box_position,rotate){
    if(rotate){
        for(let r=0; r<size;r++){
            removeShipBox(box[box_position+r*10]);
        }
    }
    else{
        for(let r=0; r<size;r++){
            removeShipBox(box[box_position+r]);
        }
    }
}

function putShipsAtBoard(s){
    if(count>0){
        for(let i=0;i<s.length;i++){
            putShip(s[i].shipSize,s[i].position,s[i].r);
        }
    }
}

function validPosition(size,box_position,rotate,s){
    let validate = true;
    let boxsOfShip = [];
    let boxsOfBoardShips =[];

    if(count>0){

        if(rotate){
            for(let i=0;i<size;i++){
                boxsOfShip.push({position:box_position+i*10});
            }
        }
        else{
            for(let i=0;i<size;i++){
                boxsOfShip.push({position:box_position+i});
            }
        }

        for(let i=0; i <s.length;i++){
            if(s[i].r){
                for(let x=0;x<s[i].shipSize;x++){
                    boxsOfBoardShips.push({position:s[i].position+x*10});
                }
            }
            else{
                for(let x=0;x<s[i].shipSize;x++){
                    boxsOfBoardShips.push({position:s[i].position+x});
                }
            }
        }

        for(var i=0;i<boxsOfShip.length;i++){
            for(var x=0;x<boxsOfBoardShips.length;x++){
                if(boxsOfShip[i].position === boxsOfBoardShips[x].position){
                    return !validate;
                }
            }
        }
        return validate;
    }
    else{return validate}
}
       
        putShip(size,box_position,rotate);

        onkeydown = e => {
            if(count<5){

                //DERECHA

                    if(e.keyCode == 68 || e.keyCode == 39){
                        removeShip(size,box_position,rotate);
                        putShipsAtBoard(shipsAtBoard);
                        box_position += 1;
                        if(rotate){
                            if(box_position%10===0){
                                box_position = box_position - 10;
                                putShip(size,box_position,rotate);
                            }
                            else{
                                putShip(size,box_position,rotate);
                            }
                        }
                        else{
                            if((box_position + size - 1)%10===0){
                                box_position = box_position-1 -(10-size);
                                putShip(size,box_position,rotate);
                            }
                            else{
                                putShip(size,box_position,rotate);
                            }
                        }
                    }

                    //IZQUIERDA

                    if(e.keyCode == 65 || e.keyCode == 37){
                        removeShip(size,box_position,rotate);
                        putShipsAtBoard(shipsAtBoard);
                        box_position -= 1;
                        if(rotate){
                            if(box_position < 0 || (box_position+1)%10===0){
                                box_position = box_position + 10;
                                putShip(size,box_position,rotate);
                            }
                            else{
                                putShip(size,box_position,rotate);
                            }
                        }
                        else{
                            if(box_position<0 || (box_position+1)%10===0 ){
                                box_position = box_position+1+(10-size);
                                putShip(size,box_position,rotate);
                            }
                            else{
                                putShip(size,box_position,rotate);
                            }
                        }
                    }

                    //ARRIBA

                    if(e.keyCode == 87 || e.keyCode == 38){
                        removeShip(size,box_position,rotate);
                        putShipsAtBoard(shipsAtBoard);
                        box_position -= 10;
                        if(rotate){
                            if(box_position < 0){
                                box_position = box_position + (110 - size*10)
                                putShip(size,box_position,rotate);
                            }
                            else{
                                putShip(size,box_position,rotate);
                            }
                        }
                        else{
                            if(box_position<0){
                                box_position = box_position+100;
                                putShip(size,box_position,rotate);
                            }
                            else{
                                putShip(size,box_position,rotate);
                            }
                        }
                    }

                    //ABAJO

                    if(e.keyCode == 83 || e.keyCode == 40){
                        removeShip(size,box_position,rotate);
                        putShipsAtBoard(shipsAtBoard);
                        box_position += 10;
                        if(rotate){
                            if( (box_position + (size-1)*10) >= 100){
                                box_position = box_position - (110 - size*10)
                                putShip(size,box_position,rotate);
                            }
                            else{
                                putShip(size,box_position,rotate);
                            }
                        }
                        else{
                            if(box_position+1>100){
                                box_position = box_position-100;
                                putShip(size,box_position,rotate);
                            }
                            else{
                                putShip(size,box_position,rotate);
                            }
                        }
                    }

                    //ROTAR

                    if(e.keyCode == 82){
                        removeShip(size,box_position,rotate);
                        putShipsAtBoard(shipsAtBoard);
                        box_position = 0;
                        rotate = !rotate;
                        putShip(size,box_position,rotate);
            
                    }
            }
                
                //Colocar
                if(e.keyCode == 13){
                    if(count<=4){
                        if(validPosition(ships[count].size,box_position,rotate,shipsAtBoard)){
                            shipObj = {shipSize:ships[count].size,position:box_position,r:rotate};
                            shipsAtBoard.push(shipObj);
                            count++
                            if(count<5){
                                box_position = 0;
                                size=ships[count].size;
                                if(rotate){rotate = !rotate;}
                                putShip(size,box_position,rotate);
                            }
                            else{
    
                            }
                        }
                        else{
                            console.log(`Posicion no valida`);
                        }
                    }
                    else{
                        console.log(`Ya no hay mas barcos`);
                    }
                }
        }