import SingleFile from './File';
import * as Upload from './FileUpload';
import BaseError from './Error';
import {get_human_file_size} from './utils';
import * as Settings from './Settings';

/*
 * Takes a list of files being uploaded
 */
export default class Files
{
    files: FileList;
    files_length: number;

    constructor(files: FileList){
        this.files = files;
        this.files_length = files.length;

        try{
            this.add_files_to_page(files);
        }
        catch(e){
            return;
        }

        // Start uploading the file
        let upload: Upload.FileListUpload = new Upload.FileListUpload('server/upload.php',
                                                        'files[]',
                                                        files);
        upload.upload();

        upload.on('progress', (event: ProgressEvent, files: Upload.IFileList): void => {
            for (let i: number = 0; i < files.length; ++i){
                let file_progress: HTMLElement = <HTMLElement>document.querySelectorAll('.file-progress')[i];
                let percent_uploaded: number = files[i].percent_uploaded;
                file_progress.style.width = percent_uploaded + '%';
                if(percent_uploaded === 100){
                    file_progress.style.backgroundColor = 'rgb(235, 254, 217)';
                }
            }
        }, false);

        upload.on('UploadComplete', (event: ProgressEvent): void => {
            console.log(event);
        }, true);

        upload.on('Complete', (event: ProgressEvent, response: string): void =>{
            let json_response: Object = JSON.parse(response);
            let url:string = null;
            if(json_response['success'] === true){
                url = json_response['url'];
                this.show_url(url);
            }
            else{
                throw new BaseError(`Error: ${json_response['description']}`);
            }
        }, true);
    }

    /*
     * Returns the fileList
     */
    public get(): FileList{
        return this.files;
    }

    /*
     * Returns the number of files in the list
     */
    public get_size(files: FileList): number{
        let size: number = 0;
        for (let i: number = 0; i < files.length; ++i){
            size += files[i].size;
        }
        return size;
    }

    /*
     * Add a file to the page
     */
    private add_files_to_page(files: FileList): void{
        if(files.length > Settings.FILE_LENGTH_LIMIT){
            throw new BaseError(`You are trying to upload too many files! (${files.length})`);
        }
        else if(this.get_size(files) > Settings.FILE_SIZE_LIMIT){
            let size: string = get_human_file_size(this.get_size(files));
            throw new BaseError(`Your file(s) are too large! (${size})`);
        }
        else if(this.get_size(files) <= 0){
            throw new BaseError("You are trying to upload an empty file!");
        }
        else{
            for (let i: number = 0; i < files.length; ++i) {
                new SingleFile(files[i], i);
            }
        }
    }

    /*
     * Show the url of the album or file to the page
     */
    private show_url(url: string): void{
        let intro_fc: HTMLElement = <HTMLElement>document.querySelector('.form-content.no-upload');
        let files_fc: HTMLElement = <HTMLElement>document.querySelector('.form-content.file-list');
        let title: HTMLElement = <HTMLElement>document.querySelector('.title > p');
        let link_elem: HTMLElement = document.createElement('a');

        /* Show the intro form container */
        intro_fc.style.display = 'block';
        intro_fc.style.minHeight = 'unset';
        files_fc.style.display = 'none';
        /* Update the title */
        title.innerHTML = 'Your link';
        /* Create the link */
        link_elem.setAttribute('href', url);
        link_elem.setAttribute('target', '_blank');
        link_elem.classList.add('url');
        link_elem.innerHTML = url;
        /* Clear out intro container and add link to it */
        intro_fc.innerHTML = "";
        intro_fc.appendChild(link_elem);
    }
}