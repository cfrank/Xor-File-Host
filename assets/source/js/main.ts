/*
 * The entry point of the application
 * Calls the Xor class which actually does everything
*/

import Xor from './xor';

document.addEventListener('DOMContentLoaded', () => 
{
    new Xor();
});