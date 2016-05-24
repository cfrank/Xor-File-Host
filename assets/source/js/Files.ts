import SingleFile from './File';
import * as Upload from './FileUpload';
import BaseError from './Error';
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
        let upload: Upload.FileListUpload = new Upload.FileListUpload('server/upload404.php',
                                                        'files[]',
                                                        files);
        upload.upload();

        upload.on('progress', (event: ProgressEvent, files: Upload.IFileList): void => {
            for (let i: number = 0; i < files.length; ++i){
                let file_progress: HTMLElement = <HTMLElement>document.querySelectorAll('.file-progress')[i];
                file_progress.style.width = files[i].percent_uploaded + '%';
            }
        }, false);

        upload.on('load', (event: ProgressEvent): void =>{
            console.log(event);
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
    public get_length(): number{
        return this.files_length;
    }

    /*
     * Add a file to the page
     */
    private add_files_to_page(files: FileList): void{
        if(files.length < 100){
            for (let i: number = 0; i < files.length; ++i) {
                new SingleFile(files[i], i);
            }
        }
        else{
            throw new BaseError(`You are trying to upload too many files! (${files.length})`);
        }
    }

}