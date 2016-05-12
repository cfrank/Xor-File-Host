export default class FileAdd {
    constructor(file) {
        this.file_name = file.name;
        this.file_mime = file.type;
        this.file_size = file.size;
        this.add_file_page(this.file_name, this.file_mime, this.file_size);
    }
    add_file_page(file_name, file_mime, file_size) {
    }
}
