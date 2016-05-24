export default class BaseError extends Error{
    constructor(message: string){
        super();
        this.message = message;
        let intro_fc: HTMLElement = <HTMLElement>document.querySelector('.form-content.no-upload');
        let files_fc: HTMLElement = <HTMLElement>document.querySelector('.form-content.file-list');
        let element: HTMLElement = <HTMLElement>document.querySelector('.intro > p');

        intro_fc.style.display = "block";
        files_fc.style.display = "none";
        element.innerHTML = message;
        element.classList.add('error');
    }
}