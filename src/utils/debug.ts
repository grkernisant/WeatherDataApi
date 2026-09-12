export const cLog = (obj: any, title?: string) => {
    const logMesseage = `${title}\n${JSON.stringify(obj, null, 2)}` 
    console.log(logMesseage.trim())
}