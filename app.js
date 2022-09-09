const grille = document.querySelector('.grille');
const affichage = document.querySelector('h3');

let alienPosit = [];
let vaisseauPosit = 229;
let allDiv = []
let score = 0;
let sens = true;  // true = droite false = gauche

function initialisation() {

    for (let posY = 0; posY < 20; posY++){
        let firstBox =document.createElement('div');
        firstBox.setAttribute('data-left', true);
        grille.appendChild(firstBox);

        for (let posX = 0; posX < 18; posX++){
            let box = document.createElement('div');
            grille.appendChild(box);
        }

        let lastBox =document.createElement('div');
        lastBox.setAttribute('data-right', true);
        grille.appendChild(lastBox);
    }

    for (let i=0; i < 52; i++){
        if(i === 12){
            i = 20;
            alienPosit.push(i);
        } else if(i === 32){
            i = 40;
            alienPosit.push(i);
        } else {
            alienPosit.push(i);
        }
    }
    console.log(alienPosit);
    allDiv = document.querySelectorAll('.grille div');

   alienPosit.forEach(posit =>{
        allDiv[posit].classList.add("alien");
    });

        allDiv[vaisseauPosit].classList.add("vaisseau");


}
initialisation();
setTimeout(lateralAlien, 200);

function moveVaisseau(e){

    allDiv[vaisseauPosit].classList.remove("vaisseau");
    if(e.keyCode === 37){
        if((vaisseauPosit - 1) > 219 ){
            vaisseauPosit -= 1;
        }
    }
    if (e.keyCode === 39){
        if ((vaisseauPosit + 1) < 240){
            vaisseauPosit += 1;
        }
    }
    allDiv[vaisseauPosit].classList.add("vaisseau");


    if(e.keyCode === 32){
        shoot();
    }
}
document.addEventListener('keydown', moveVaisseau);
let timeAlien = setInterval(moveAlien, 500); // mettre une variable que l'on pourra clear si un element a la classe alien et la classe vaisseau ou plus simple si un alien a une posit entre 220 et 239

let descendre = false;
let estDescendu = false;

//----------------------------Shoot-----------------------------
function shoot(){
    let shootPosit = vaisseauPosit;
    let isDead = false;
    allDiv[shootPosit].classList.add("shot");
    let timeShot = setInterval(()=> {
        allDiv[shootPosit].classList.remove("shot");
        shootPosit -= 20;
        for (let i=0; i<alienPosit.length; i++){
            if (alienPosit[i]=== shootPosit){
                allDiv[shootPosit].classList.remove("shot");
                allDiv[shootPosit].classList.add("boom");
                alienPosit = alienPosit.filter(posit => posit !== shootPosit);
                setTimeout(() => allDiv[shootPosit].classList.remove("boom"),150);
                allDiv[shootPosit].classList.remove("alien");
                score ++;
                affichage.innerText = `Score : ${score}`;
                isDead = true;
                clearInterval(timeShot);
            } else {
                if (!isDead){
                    allDiv[shootPosit].classList.add("shot");
                }
            }
        }
    }, 100);

    if (score === 36){
        clearInterval(timeAlien);
        clearInterval(timeShot);
        alert("Felicitation");
    }
}

//------------------------ Move Alien----------------------------
function moveAlien(){
if (estDescendu === false){
    for(let i=0; i < alienPosit.length; i++){
        if (allDiv[alienPosit[i]].dataset.left || allDiv[alienPosit[i]].dataset.right){
            console.log(allDiv[alienPosit[i]]);
            descendre = true; // on descend puis on change le sens
            i = 1000; //si on descend on sort de la boucle
        }
    }
}

    if (descendre === true){
        descendreAlien();
        sens = !sens
        descendre = false;
        estDescendu = true;
        for(let j=0; j < alienPosit.length; j++){
            if (alienPosit[j] > 219 && alienPosit[j] < 999){
                affichage.innerText = "G A M E  O V E R";
                clearInterval(timeAlien);
            }
        }
    } else {
        lateralAlien();
        estDescendu = false;
    }
}

function descendreAlien(){
    for(let i=0; i < alienPosit.length; i++){
        allDiv[alienPosit[i]].classList.remove("alien");
        alienPosit[i] += 20;
    }
    for(let i=0; i < alienPosit.length; i++){
        allDiv[alienPosit[i]].classList.add("alien");
    }
}

function lateralAlien(){
    if (sens === true){
        for(let i=0; i < alienPosit.length; i++){
            allDiv[alienPosit[i]].classList.remove("alien");
            alienPosit[i] += 1;
        }
        for(let i=0; i < alienPosit.length; i++){
            allDiv[alienPosit[i]].classList.add("alien");
        }
    }
    if (sens === false){
        for(let i=0; i < alienPosit.length; i++){
            allDiv[alienPosit[i]].classList.remove("alien");
            alienPosit[i] -= 1;
        }
        for(let i=0; i < alienPosit.length; i++){
            allDiv[alienPosit[i]].classList.add("alien");
        }
    }
}



// Rajouter des niveaux en accelerant la vitesse
// Mettre un bouton rejouer
// Trouver pourquoi il y a des erreurs sur le shot (trouver solution pour le retirer pour eviter que ça plante)
