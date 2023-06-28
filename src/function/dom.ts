export function prevent(cb?: () => void) {
    if (!cb)
        return undefined
    return (e: {preventDefault: () => void}) => {
        e.preventDefault()
        cb()
    }
}
