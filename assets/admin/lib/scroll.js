export const scrollTo = (offset, callback) => {
    const fixedOffset = offset.toFixed();
    const onScroll = function () {
        if (window.pageYOffset.toFixed() === fixedOffset) {
            window.removeEventListener('scroll', onScroll)
            if (typeof callback === 'function') {
                callback();
            }
        }
    }

    window.addEventListener('scroll', onScroll)
    onScroll()
    window.scrollTo({
        top: offset,
        behavior: 'smooth'
    })
}
