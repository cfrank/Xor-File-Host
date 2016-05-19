import EventEmit from './Events/Events';

export default class FileUpload extends EventEmit {
    constructor(string: string, files: FileList){
        super();
        console.log(files);
    }

    public test(): void{
        console.log('emit');
        this.emit('UploadStart', ['hello']);
    }
}