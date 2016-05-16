export default class FileUpload
{
    be_file: string;
    files: FileList;

    constructor(be_file: string, files: FileList){
        this.be_file = be_file;
        this.files = files;
    }
}