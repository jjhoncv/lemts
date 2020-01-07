export class IError extends Error {
    private code: any;
    private msg: any;

    constructor(...args) {
        super(...args);
        this.name = "IError";
        this.code = args[0].code;
        this.msg = args[0].msg
    }
}