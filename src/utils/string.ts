export const maskString = (str: string, mask: string = 'X'): string => {
    const l = str.length
    if (str.length < 12) return mask.repeat(l)

    const start = str.substring(0, 2)
    const end = str.substring(l < 16 ? l-2 : l-4)
    const mid = mask.repeat(l - start.length - end.length)

    return `${start}${mid}${end}`
}