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
                file_progress.style.width = files[i].percent_uploaded + '%';
            }
        }, false);

        upload.on('UploadComplete', (event: ProgressEvent): void => {
            console.log(event);
        }, true);

        upload.on('Complete', (event: ProgressEvent, response: string): void =>{
            console.log(response);
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
}