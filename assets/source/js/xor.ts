import Files from './Files';

export default class Xor
{
    private upload_trigger: HTMLElement = document.getElementById('js-upload-trigger');
    private upload_input: HTMLElement = document.getElementById('js-upload-input');

    constructor(){
        this.init_event_listeners();
    }

    /**
     * Start listening to elements for changes
     */
    private init_event_listeners():void {
        this.upload_trigger.addEventListener('click', () =>{
            this.open_upload_dialog();
        });

        this.upload_input.addEventListener('change', (event: Event) =>{
            this.on_file_upload(event);
        });
    }

    /**
     * Open the OS file upload dialog when the upload trigger is pressed
     */
    private open_upload_dialog():void {
        this.upload_input.click();
    }

    /**
     * React to a file being uploaded
     */
    private on_file_upload(event: Event): void{
        // Cast the event target to InputElement to recieve the files
        let eventTarget: HTMLInputElement = <HTMLInputElement>event.target;
        let files: FileList = eventTarget.files;
        
        // Show the files list
        this.show_file_list();

        new Files(files);
    }

    /**
     * Switch from the intro form content div to the file list content div
     */
    private show_file_list(): void{
        let intro_fc: HTMLElement = <HTMLElement>document.querySelector('.form-content.no-upload');
        let files_fc: HTMLElement = <HTMLElement>document.querySelector('.form-content.file-list');

        intro_fc.style.display = "none";
        files_fc.style.display = "block";

    }
}