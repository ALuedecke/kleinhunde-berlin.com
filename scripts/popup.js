/*
 * Author:   A. Luedecke
 * Purpose:  Handle pop up windows
 * Created:  Oct/27/2016
 */

var pop      = null;
      
function popup(url, properties) {
    if (pop && !pop.closed) {
        pop.close();
    }

    pop = window.open(url, 'newwindow', properties + ', left=100, top=100');
    focus();
        
    return (pop) ? false : true;
}
