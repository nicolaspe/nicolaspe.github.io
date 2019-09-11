let header;
let timekeep;
let color;

const c1 = [ 78,  49, 102];
const c2 = [237, 100, 207];
const c3 = [ 21, 192, 255];

window.addEventListener('load', init);

function init(){
    header = document.querySelectorAll("header")[0];
    timekeep = 0;
    color = [0, 0, 0];

    header.style.color = getColor(c1);

    setInterval(update, 30);
}


function update(){
    // update the timekeep
    timekeep += 0.02;

    // with a sine function we see if we go from c1 to c2 or c3
    let t = Math.sin(timekeep);
    let c;
    if ( t>0 ) { c = c2; }
    else { c = c3; }

    // now we interpolate between both values
    t = Math.abs(t);
    for (let i = 0; i < color.length; i++) {
        color[i] = lerp(c1[i], c[i], t);
    }

    // and change the color of the text
    header.style.color = getColor(color);
}


// === UTILITY FUNCTIONS
function getColor(c){
    return "rgb(" + c[0] + "," + c[1] + "," + c[2] + ")";
}
function lerp(x0, x1, t){
    return x0*(1-t) + x1*t;
}