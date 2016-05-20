import SingleFile from './File';
import FileListUpload from './FileUpload';
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

        for (let i: number = 0; i < this.files_length; ++i){
            this.add_file(files[i], i);
        }

        // Start uploading the file
        let upload: FileListUpload = new FileListUpload('server/upload.php', files);
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
    private add_file(file: File, index: number): void{
        new SingleFile(file, index);
    }

}