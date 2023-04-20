import sentinel from 'sentinel-js'

console.info("chatgpt-helper, content-script loaded.")

function handleCopyReload(target) {
    // console.debug("handleCopyReload with target: ", target)
    const previous = target.parentNode.parentNode.parentNode.parentNode.parentNode.previousSibling.firstChild.childNodes[1].firstChild
    // get it's text content, if it still contains div, then get its text content, so on and so forth
    const text = previous.firstChild.textContent
    // store the text in local storage, and clipboard
    localStorage.setItem('chatgpt-helper', text)
    navigator.clipboard.writeText(text)
    // reload the page
    window.location.reload()
}

function fillInPreviousText() {
    // check if the local storage has a key chatgpt-helper
    const text = localStorage.getItem('chatgpt-helper')
    console.log("fillInPreviousText", text)
    if (text) {
        // wait for one second before setting value of textarea
        setTimeout(() => {
            const textarea = document.querySelector('textarea')
            textarea.value = text
            localStorage.removeItem('chatgpt-helper')
        }, 3000)
    }
}

sentinel.on('.border-red-500.bg-red-500\\/10', (el) => {
    const button = document.querySelector('main form .btn-primary')

    const reloadButton = document.createElement('button')
    reloadButton.classList.add('btn', 'btn-primary', 'm-auto')
    reloadButton.id = 'copy-reload'
    reloadButton.innerText = 'Copy&Reload'

    reloadButton.addEventListener('click', () => {
        handleCopyReload(el)
    })

    // query if the button with id copy-reload exist
    const copyReloadButton = document.querySelector('#copy-reload')
    if (!copyReloadButton) {
        button.parentNode.insertBefore(reloadButton, button.nextSibling)
    }
})

sentinel.on('main textarea', () => {
    fillInPreviousText()
})


export { }