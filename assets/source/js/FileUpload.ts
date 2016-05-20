import TEventEmit from './Events/TEventEmit';

export default class FileUpload extends TEventEmit {
    constructor(string: string, files: FileList){
        super();
        console.log(files);
    }

    public test(): void{
        console.log('emit');
        this.emit('UploadStart', ['hello']);
    }
}