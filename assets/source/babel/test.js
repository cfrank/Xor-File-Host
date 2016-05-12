/*
 * The entry point of the application
 * Calls the Xor class which actually does everything
*/
import './xor';
document.addEventListener('DOMContentLoaded', () => {
    let xor = new Xor("Chris Frank", 21);
    xor.print();
    console.log('hello');
});
