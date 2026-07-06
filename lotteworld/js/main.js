const li1 = document.querySelector('.main .con2 ul li:first-child');
const li2 = document.querySelector('.main .con2 ul li:last-child');
const str1 = document.querySelector('.main .con2 ul li:first-child strong');
const str2 = document.querySelector('.main .con2 ul li:last-child strong');
const con2 = document.querySelector('.main .con2');

li1.addEventListener('mouseenter', function () {
    con2.style.backgroundImage = `url(./images/mainCon1Bg_t1_img.jpg)`;
    // alert('test1');
    str1.textContent = `현대 미술관`;
});
li2.addEventListener('mouseenter', function () {
    con2.style.backgroundImage = `url(./images/mainCon1Bg_t2_img.jpg)`;
    // alert('test2');
    str2.textContent = `롯데 미술관`;
});
