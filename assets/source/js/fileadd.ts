export default class FileAdd
{
    file: File; // The individual file being uploaded

    constructor(file: File, index: number){
        this.file = file;
        this.add_file_templ(index);
    }

    /*
     * Find the file template and either activate it, or duplicate it and
     * send it to a function which will populate it
     */
    private add_file_templ(index: number): void{
        let file_templates: NodeListOf<Element> = document.querySelectorAll('.file-template');
        let file_template: Element;
        // Check if we can use the existing file template
        if(index === 0){
            file_template = file_templates[0];
            file_template.classList.remove('not-active');
        }
        // If not duplicate the last file template
        else{
            let file_template_clone: Element = file_templates[index - 1];
            let file_list: Element = document.querySelector('.file-list');
            file_template = <Element>file_template_clone.cloneNode(true);
            file_list.appendChild(file_template);
        }
        this.populate_file_templ(file_template);
    }

    private populate_file_templ(file_template: Element): void{
        let file_name: string = this.file.name;
        let file_mime: string = this.file.type;
        let file_size: number = this.file.size;
        let file_ext: string = file_name.substr((~-file_name.lastIndexOf(".") >>> 0) + 2);
        let templ_file_logo: Element = file_template.querySelector('.file-logo');
        let templ_file_name: Element = file_template.querySelector('.file-name');
        let templ_file_size: Element = file_template.querySelector('.file-size');

        // Populate the file logo class
        let file_icon_class: string = this.get_file_icon(file_mime, file_ext);
        // XXX
        templ_file_logo.className = "file-logo file-info " + file_icon_class;
        // Populate the file name
        templ_file_name.innerHTML = this.sanatize_string(file_name);
        // Populate the file size
        templ_file_size.innerHTML = this.get_file_size(file_size);
    }

    private get_file_icon(file_mime: string, file_ext: string): string{
        let split_mime = file_mime.split('/');
        let top_level_name = split_mime[0];
        let sub_type_name = split_mime[1];
        console.log(file_mime);

        // XXX
        switch(top_level_name){
            case 'audio':
                return 'audio';
            case 'application':
                if (sub_type_name === 'zip'
                    || sub_type_name === 'gzip'){
                    return 'compressed';
                }
                else if(sub_type_name === 'pdf'){
                    return 'pdf';
                }
                else{
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

    private get_file_size(file_size: number): string{
        console.log(file_size);
        let units: Array<string> = ["B", "KB", "MB", "GB", "TB"];
        let e: number = (Math.log(file_size) / Math.log(1024)) >> 0;
        return (file_size / Math.pow(1024, e)).toFixed(2) + " " + units[e];
    }

    private sanatize_string(unsafe_string: string): string{
        return unsafe_string
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\"/g, '&quot;')
            .replace(/\'/g, '&#39;')
            .replace(/\//g, '&#x2F;')
    }
}