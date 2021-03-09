const getNode = (select, context = document) => context.querySelector(select);
const bodyEle = getNode('body');
bodyEle.style.height = '100vh';
bodyEle.addEventListener('click', (e) => {
    e.target.style.backgroundColor = "salmon";
})
