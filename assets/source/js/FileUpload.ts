import TEventEmit from './Events/TEventEmit';

export interface IFileList extends FileList{
    [index: number]: IFile;
    prev_uploaded: number;
}

export interface IFile extends File{
    percent_uploaded: number;
    uploadedSize: number;
}

export class FileListUpload extends TEventEmit {
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
            this.files.prev_uploaded = 0;
            for (let i: number = 0; i < this.files_length; ++i) {
                this.files[i].uploadedSize = 0;
            }
        });

        xhr.upload.addEventListener('progress', (e: ProgressEvent): void => {
            if(e.lengthComputable){
                let total_loaded: number = e.loaded;
                let loaded: number = total_loaded - this.files.prev_uploaded;
                for (let i: number = 0; i < this.files_length; ++i){
                    let new_size: number = this.files[i].uploadedSize + loaded;
                    this.files[i].uploadedSize = Math.min(new_size, this.files[i].size);
                    if(this.files[i].uploadedSize !== this.files[i].size){
                        let percent: number = (this.files[i].uploadedSize / this.files[i].size) * 100;
                        this.files[i].percent_uploaded = percent;
                    }
                    else if(this.files[i].uploadedSize === this.files[i].size
                            && this.files[i].percent_uploaded !== 100){
                        let percent: number = (this.files[i].uploadedSize / this.files[i].size) * 100;
                        this.files[i].percent_uploaded = percent;
                    }
                }
                this.files.prev_uploaded += loaded;
            }
            this.emit('progress', [e, this.files]);
        }, false);

        xhr.upload.addEventListener('loadstart', (e: ProgressEvent): void =>{
            this.emit('loadstart', [e]);
        }, false);

        xhr.upload.addEventListener('load', (e: ProgressEvent): void =>{
            console.log('finished');
            this.emit('load', [e]);
        }, false);

        xhr.send(data);
    }
}