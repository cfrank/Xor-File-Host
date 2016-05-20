import TEventEmit from './Events/TEventEmit';

interface IFileList extends FileList{
    [index: number]: IFile;
}

interface IFile extends File{
    uploadedSize: number;
}

export default class FileListUpload extends TEventEmit {
    uploading_files: IFileList;

    constructor(url: string, files: FileList) {
        super();
        this.uploading_files = <IFileList>files;
        this.handleFiles(url, this.uploading_files);
    }

    private handleFiles(url: string, files: IFileList): void {
        /* Set initial uploaded size prop */
        let files_length: number = files.length;
        for (let i: number = 0; i < files_length; ++i){
            files[i].uploadedSize = 1337;
        }
        console.log(files);
    }
}