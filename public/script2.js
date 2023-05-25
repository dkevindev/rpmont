

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





