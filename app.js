const tasks = [
    { id: 1, dinos: 1, chrome: 1, winingPos: ['justify-content: flex-end;'], textreaHeight: '24px' }
];

(function (arrayOfTasks) {
    const objOfTasks = arrayOfTasks.reduce((acc, task) => {
        acc[task.id] = task
        return acc
    }, {})

    // Default Settings
    let lvl = 1
    let flexValue = ''

    // UI Elements
    const background = document.querySelector('.background')
    const webstep = document.querySelector('.webstep')
    const code = document.querySelector('#code')

    // Events 
    init()
    code.addEventListener('input', onChangeHandler)


    function init () {
        renderTask()
        changeTextreaHeight()
    }

    function renderTask () {
        const dinoFragment = document.createDocumentFragment()
        const chromeFragment = document.createDocumentFragment()
        for (let i = 0; i < objOfTasks[lvl].dinos; i++) {
            const dino = createElementWithClass('div', 'dino', '1')
            const chrome = createElementWithClass('div', 'chrome', '4')
            dinoFragment.append(dino)
            chromeFragment.append(chrome)
        }

        webstep.appendChild(dinoFragment)
        background.appendChild(chromeFragment)
    }

    function createElementWithClass (element, className, img) {
        const userElement = document.createElement(element)
        const image = document.createElement('img')
        image.setAttribute('src', `images/${img}.png`)
        
        userElement.classList.add(className)
        userElement.appendChild(image)

        if (className === 'chrome') {
            const currentTask = Object.values(objOfTasks).filter(task => task.id === lvl)[0]
            currentTask.winingPos.forEach(w => background.setAttribute('style', w))
        }

        return userElement
    }

    function changeTextreaHeight () {
        code.style.height = objOfTasks[lvl].textreaHeight
    }

    function onChangeHandler (e) {
        flexValue += e.data

        if (flexValue === '') {
            const a = webstep.getAttribute('style')
            console.log(a);
        }
        
        if (flexValue.includes('null')) {
            flexValue = flexValue.replace('null', '')
            flexValue = flexValue.slice(0, -1);
        }

        webstep.setAttribute('style', flexValue.trim())
    }

})(tasks)