import TEventEmit from './Events/TEventEmit';

interface IFileList extends FileList{
    [index: number]: IFile;
}

interface IFile extends File{
    uploadedSize: number;
}

export default class FileListUpload extends TEventEmit {
    url: string;
    field: string;
    method: string = 'POST';
    uploading_files: IFileList;
    files_length: number;

    constructor(url: string, field: string, files: FileList) {
        super();
        this.url = url;
        this.field = field;
        this.uploading_files = <IFileList>files;
        this.files_length = this.uploading_files.length;
    }

    public upload(callback?: Function): void{
        if(callback != null){
            // Call the callback when upload is finished
            this.on('UploadComplete', callback, null, true);
        }

        let data: FormData = new FormData();

        for (let i: number = 0; i < this.files_length; ++i){
            data.append(this.field, this.uploading_files[i]);
        }

        let xhr: XMLHttpRequest = new XMLHttpRequest();

        xhr.open(this.method, this.url, true);

        // Set the initial uploadedSize
        xhr.addEventListener('loadstart', (e: Event): void => {
            for (let i: number = 0; i < this.files_length; ++i) {
                this.uploading_files[i].uploadedSize = 0;
            }
        });

        xhr.addEventListener('progress', (e: Event): void => {

        });
    }
}