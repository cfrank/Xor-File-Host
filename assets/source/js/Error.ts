class BaseError extends Error{
    constructor(message: string){
        super();
        this.message = message;
        let intro_fc: HTMLElement = <HTMLElement>document.querySelector('.form-content.no-upload');
        let files_fc: HTMLElement = <HTMLElement>document.querySelector('.form-content.file-list');


        intro_fc.style.display = "block";
        files_fc.style.display = "none";
    }
}

export class TooManyFilesException extends BaseError{
    constructor(message: string){
        super(message);
        console.log('hello');
        let msg_cont: HTMLElement = <HTMLElement>document.querySelector('.intro > p');
        msg_cont.classList.add('error');
        msg_cont.innerHTML = message;
    }
}