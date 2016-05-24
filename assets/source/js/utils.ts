/*
 * Re-uses or builds file template
 */
export function build_template(index: number, file: File): void{
    // The file template
    let file_template: NodeListOf<Element> = document.querySelectorAll('.file-template');

    // Determine whether or not to use the first template or to duplicate it
    if(index === 0){
        // This is the first file, re-use the present template
        add_file_template(file_template[index], file);
    }
    else{
        // We first need to duplicate the template before using it
        let file_template_cont: Element = document.querySelector('.file-list');
        let last_file_template: Element = file_template[index - 1];
        let new_file_template: Node = last_file_template.cloneNode(true);
        // Add the template to the page
        file_template_cont.appendChild(new_file_template);
        add_file_template(<Element>new_file_template, file);
    }
}

/*
 * Adds file to the template
 */
function add_file_template(template: Element, file: File): void{
    // Where to place file attributes
    let file_logo: Element = template.querySelector('.file-logo')
    let file_name: Element = template.querySelector('.file-name');
    let file_size: Element = template.querySelector('.file-size');
    let hidden_class_name: string = 'not-active';

    // Strip any file logo classes
    if (file_logo.classList[2]){
        file_logo.className = "file-logo file-info";        
    }

    // Display the file template
    template.classList.remove(hidden_class_name);

    // Start adding file info to the template
    file_logo.classList.add(get_file_logo(file.type));
    file_name.innerHTML = sanatize_string(file.name);
    file_size.innerHTML = get_human_file_size(file.size);
}

/*
 * Get icon class for the file_logo
 */
function get_file_logo(file_mime: string): string{
    let split_mime:Array<string> = file_mime.split('/');
    let mime_top_level: string = split_mime[0];
    let mime_sub_type: string = split_mime[1];
    let return_types: Array<string> = ['audio', 'image', 'text', 'video'];

    /* If the first level of the mime type is generic just return it */
    for (let i: number = 0; i < return_types.length; ++i){
        if (return_types[i] === mime_top_level){
            return mime_top_level;
        }
    }

    if(mime_top_level === 'application'){
        switch(mime_sub_type){
            case 'x-7z-compressed':
            case 'zip':
                return 'compressed';
            case 'postscript':
                return 'illustrator';
            case 'msword':
            case 'vnd.oasis.opendocument.text':
            case 'rtf':
            case 'vnd.wordperfect':
            case 'vnd.ms-works':
            case 'vnd.oasis.opendocument.text':
            case 'vnd.oasis.opendocument.text-template':
                return 'text';
            case 'vnd.ms-powerpoint':
            case 'vnd.oasis.opendocument.presentation':
            case 'vnd.oasis.opendocument.presentation-template':
                return 'ppt';
            case 'vnd.ms-excel':
            case 'vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            case 'vnd.oasis.opendocument.spreadsheet':
            case 'vnd.oasis.opendocument.spreadsheet-template':
            case 'vnd.sun.xml.calc':
                return 'xl';
            default:
                return 'misc';

        }
    }
    return 'misc';
}

/*
 * Turns a file size in bytes into a human readable string 
 */
export function get_human_file_size(file_size: number): string{
    let units: Array<string> = ["B", "KB", "MB", "GB", "TB"];
    let e: number = (Math.log(file_size) / Math.log(1024)) >> 0;
    return (file_size / Math.pow(1024, e)).toFixed(2) + " " + units[e];
}

/*
 * Helper function to sanatize a string for use in innerHTML
 */
function sanatize_string(input: string): string{
    return input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\"/g, '&quot;')
        .replace(/\'/g, '&#39;')
        .replace(/\//g, '&#x2F;')
}