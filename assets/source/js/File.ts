import {build_template} from './utils';
export default class SingleFile{
    constructor(file: File, index: number){
        // Add files to the page
        build_template(index, file);
    }
}