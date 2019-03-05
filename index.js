
var box =  document.getElementsByClassName("box");

function putShoot(Pbox){
    Pbox.appendChild(document.createElement("div"));
    Pbox.childNodes[0].className = "shoot";
}
function putShip(Pbox){
    Pbox.appendChild(document.createElement("div"));
    Pbox.childNodes[0].className = "ship";
}
putShip(box[0])
putShip(box[1])
putShip(box[2])
putShip(box[3])

for(let i = 0;i<box.length;i++){
    box[i].addEventListener("click",function(e){
        console.log(this)
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