import FileAdd from './fileadd';
export default class Xor {
    constructor() {
        this.upload_trigger = document.getElementById('js-upload-trigger');
        this.upload_input = document.getElementById('js-upload-input');
        this.init_event_listeners();
    }
    /**
     * Start listening to elements for changes
     */
    init_event_listeners() {
        this.upload_trigger.addEventListener('click', () => {
            this.open_upload_dialog();
        });
        this.upload_input.addEventListener('change', (event) => {
            this.on_file_upload(event);
        });
    }
    /**
     * Open the OS file upload dialog when the upload trigger is pressed
     */
    open_upload_dialog() {
        this.upload_input.click();
    }
    /**
     * React to a file being uploaded
     */
    on_file_upload(event) {
        // Cast the event target to InputElement to recieve the files
        let eventTarget = event.target;
        this.files = eventTarget.files;
        // Show the files list
        this.show_file_list();
        for (let i = 0; i < this.files.length; ++i) {
            new FileAdd(this.files[i], i);
        }
    }
    /**
     * Switch from the intro form content div to the file list content div
     */
    show_file_list() {
        let intro_fc = document.querySelector('.form-content.no-upload');
        let files_fc = document.querySelector('.form-content.file-list');
        intro_fc.style.display = "none";
        files_fc.style.display = "block";
    }
}
