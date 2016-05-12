export default class FileAdd {
    constructor(file, index) {
        this.file = file;
        this.add_file_templ(index);
    }
    /*
     * Find the file template and either activate it, or duplicate it and
     * send it to a function which will populate it
     */
    add_file_templ(index) {
        let file_templates = document.querySelectorAll('.file-template');
        let file_template;
        // Check if we can use the existing file template
        if (index === 0) {
            file_template = file_templates[0];
            file_template.classList.remove('not-active');
        }
        else {
            let file_template_clone = file_templates[index - 1];
            let file_list = document.querySelector('.file-list');
            file_template = file_template_clone.cloneNode(true);
            file_list.appendChild(file_template);
        }
        this.populate_file_templ(file_template);
    }
    populate_file_templ(file_template) {
        let file_name = this.file.name;
        let file_mime = this.file.type;
        let file_size = this.file.size;
        let file_ext = file_name.substr((~-file_name.lastIndexOf(".") >>> 0) + 2);
        let templ_file_logo = file_template.querySelector('.file-logo');
        let templ_file_name = file_template.querySelector('.file-name');
        let templ_file_size = file_template.querySelector('.file-size');
        // Populate the file logo class
        let file_icon_class = this.get_file_icon(file_mime, file_ext);
        // XXX
        templ_file_logo.className = "file-logo file-info " + file_icon_class;
        // Populate the file name
        templ_file_name.innerHTML = this.sanatize_string(file_name);
        // Populate the file size
        templ_file_size.innerHTML = this.get_file_size(file_size);
    }
    get_file_icon(file_mime, file_ext) {
        let split_mime = file_mime.split('/');
        let top_level_name = split_mime[0];
        let sub_type_name = split_mime[1];
        console.log(file_mime);
        // XXX
        switch (top_level_name) {
            case 'audio':
                return 'audio';
            case 'application':
                if (sub_type_name === 'zip'
                    || sub_type_name === 'gzip') {
                    return 'compressed';
                }
                else if (sub_type_name === 'pdf') {
                    return 'pdf';
                }
                else {
                    return 'misc';
                }
            case 'image':
                if (sub_type_name === 'vnd.adobe.photoshop')
                    return 'photoshop';
                return 'image';
            case 'video':
                return 'video';
            default:
                return 'misc';
        }
    }
    get_file_size(file_size) {
        console.log(file_size);
        let units = ["B", "KB", "MB", "GB", "TB"];
        let e = (Math.log(file_size) / Math.log(1024)) >> 0;
        return (file_size / Math.pow(1024, e)).toFixed(2) + " " + units[e];
    }
    sanatize_string(unsafe_string) {
        return unsafe_string
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\"/g, '&quot;')
            .replace(/\'/g, '&#39;')
            .replace(/\//g, '&#x2F;');
    }
}
