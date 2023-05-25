

const login = () => {
    document.querySelector('.login').style.opacity = '0';
    document.querySelector('.login').style.display = 'block';
    setTimeout(() => {
        document.querySelector('.login').style.opacity = '1';
    }, 200)
}

const abrirmenu = () => {
    const menu = document.querySelector('.container-menu');

    if (menu.style.width == '59px') {
        menu.style.width = '228px'
    } else {
        menu.style.width = '59px'

    }

}


const vtrmenor = document.querySelector('.div-vtr');
const vtrmaior = document.querySelector('.div-vtrm');
const pmmaior = document.querySelector('.div-pm');
const pmenor = document.querySelector('.div-pmm');
const armamaior = document.querySelector('.div-arma');
const armamenor = document.querySelector('.div-armam');


armamaior.addEventListener('click', (e) => {
    if (armamaior.classList.length == 1) {
        armamaior.classList.add('selected');
        armamenor.classList.add('selected');


        vtrmenor.classList.remove('selected');
        vtrmaior.classList.remove('selected');
        pmmaior.classList.remove('selected');
        pmenor.classList.remove('selected');
    }
})

armamenor.addEventListener('click', (e) => {
    if (armamaior.classList.length == 1) {
        armamaior.classList.add('selected');
        armamenor.classList.add('selected');


        vtrmenor.classList.remove('selected');
        vtrmaior.classList.remove('selected');
        pmmaior.classList.remove('selected');
        pmenor.classList.remove('selected');
    }
})

vtrmenor.addEventListener('click', (e) => {
    if (vtrmenor.classList.length == 1) {
        vtrmenor.classList.add('selected');
        vtrmaior.classList.add('selected');


        armamaior.classList.remove('selected');
        armamenor.classList.remove('selected');
        pmmaior.classList.remove('selected');
        pmenor.classList.remove('selected');
    }
})

vtrmaior.addEventListener('click', (e) => {
    if (vtrmaior.classList.length == 1) {
        vtrmenor.classList.add('selected');
        vtrmaior.classList.add('selected');


        armamaior.classList.remove('selected');
        armamenor.classList.remove('selected');
        pmmaior.classList.remove('selected');
        pmenor.classList.remove('selected');
    }
})

pmmaior.addEventListener('click', (e) => {
    if (pmmaior.classList.length == 1) {
        pmmaior.classList.add('selected');
        pmenor.classList.add('selected');


        armamaior.classList.remove('selected');
        armamenor.classList.remove('selected');
        vtrmenor.classList.remove('selected');
        vtrmaior.classList.remove('selected');
    }
})

pmenor.addEventListener('click', (e) => {
    if (pmenor.classList.length == 1) {
        pmmaior.classList.add('selected');
        pmenor.classList.add('selected');


        armamaior.classList.remove('selected');
        armamenor.classList.remove('selected');
        vtrmenor.classList.remove('selected');
        vtrmaior.classList.remove('selected');
    }
})






