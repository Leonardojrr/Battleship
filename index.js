var box =  document.getElementsByClassName("box");
var ships = [{name:"Carrier",size:5},{name:"Battleship",size:4},{name:"Cruiser",size:3},{name:"Submarine",size:3},{name:"Destroyer",size:2}]

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


        var rotate=false;
        var choosing=true;
        var box_position=0;
        var size = ships[0].size;
        var count = 1;
       
        putShip(size,box_position,rotate);

        onkeydown = e => {
            //DERECHA

            if(e.keyCode == 68 || e.keyCode == 39){
                removeShip(size,box_position,rotate);
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
                box_position = 0;
                rotate = !rotate;
                putShip(size,box_position,rotate);
    
            }

            //Colocar
            if(e.keyCode == 13){
                if(count<5){
                    box_position = 0;
                    size=ships[count].size;
                    if(rotate){
                        rotate = !rotate;
                    }
                    putShip(size,box_position,rotate);
                    count++
                }
                else{
                    console.log(`Ya no hay mas barcos`);
                }
            }
        }