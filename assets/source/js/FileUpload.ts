import TEventEmit from './Events/TEventEmit';

interface IFileList extends FileList{
    [index: number]: IFile;
    current: IFile;
}

interface IFile extends File{
    percentUploaded: number;
    uploadedSize: number;
}

export default class FileListUpload extends TEventEmit {
    url: string;
    field: string;
    method: string = 'POST';
    files: IFileList;
    files_length: number;

    constructor(url: string, field: string, files: FileList) {
        super();
        this.url = url;
        this.field = field;
        this.files = <IFileList>files;
        this.files_length = this.files.length;
    }

    public upload(callback?: Function): void{
        if(callback != null){
            /* Call the callback when upload is finished */
            this.on('UploadComplete', callback, null, true);
        }

        let data: FormData = new FormData();

        for (let i: number = 0; i < this.files_length; ++i){
            data.append(this.field, this.files[i]);
        }

        let xhr: XMLHttpRequest = new XMLHttpRequest();

        xhr.open(this.method, this.url, true);

        /* Set the initial uploadedSize */
        xhr.addEventListener('loadstart', (e: ProgressEvent): void => {
            for (let i: number = 0; i < this.files_length; ++i) {
                this.files[i].uploadedSize = 0;
            }
        });

        xhr.addEventListener('progress', (e: ProgressEvent): void => {
            if(e.lengthComputable){
                let loaded: number = e.loaded;
                /* 
                    From here we will give an estimate for each file on its
                    progress
                */
                for (let i: number = 0; i < this.files_length; ++i) {
                    let file_size: number = this.files[i].size;
                    let difference: number = file_size - loaded;
                    if(difference >= 0 && i === 0){
                        this.files[i].uploadedSize = difference;
                    }
                    else if(difference >= 0 && i > 0){
                        if (this.files[i - 1].uploadedSize === this.files[i - 1].size){
                            break;
                        }
                        else{
                            this.files[i].uploadedSize = difference;
                        }
                    }
                    else{
                        /*
                            There is an overflow of size which needs to be sent
                            to the next file.
                        */
                        difference = Math.abs(difference);
                        let leftover: number = file_size - this.files[i].uploadedSize;
                        this.files[i].uploadedSize = file_size;
                        this.files[i + 1].uploadedSize = difference - leftover;
                    }
                }
            }
            this.emit('progress', [e, this.files]);
        });
    }
}