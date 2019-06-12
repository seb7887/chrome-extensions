// tslint:disable-next-line no-string-based-set-timeout
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export default delay;
