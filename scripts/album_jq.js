/*
 * Author:   A. Luedecke
 * Purpose:  Album site functionality
 * Created:  Sep/13/2016
 */

var curr_idx = 0;
var picture  = new Array();
var pop      = null;
      
function handle_click(img_id) {
    curr_idx = parseInt(img_id);
    
    $('#myModal').css('display', 'block');
    
    if (picture.length > img_id) {
        $('#imgModal').attr('src', picture[img_id]);
    } else {
        $('#imgModal').attr('src', $('#' + img_id).attr('src'));
    }
    
    $('#caption').html(
        "<b>" + $('#' + img_id).attr('alt') + "</b>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;[" + (curr_idx + 1) + "/" + picture.length + "]"
    );
}

function handle_next() {
    if (picture.length > 0) {
        if (curr_idx < picture.length - 1) {
            curr_idx += 1;
        } else {
            curr_idx = 0;
        }
    
        $('#imgModal').attr('src', picture[curr_idx]);
        $('#caption').html(
            "<b>" + $('#' + curr_idx).attr('alt') + "</b>" +
            "&nbsp;&nbsp;&nbsp;&nbsp;[" + (curr_idx + 1) + "/" + picture.length + "]"
        );
    }
}

function handle_prev() {
    if (picture.length > 0) {
        if (curr_idx > 0) {
            curr_idx -= 1;
        } else {
            curr_idx = picture.length - 1;
        }
    
        $('#imgModal').attr('src', picture[curr_idx]);
        $('#caption').html(
            "<b>" + $('#' + curr_idx).attr('alt') + "</b>" +
            "&nbsp;&nbsp;&nbsp;&nbsp;[" + (curr_idx + 1) + "/" + picture.length + "]"
        );        
    }
}

function popdown() {
    if (pop && !pop.closed) {
        pop.close();
    }
}

function popup(img_id) {
    pop = window.open(
              $('#' + img_id).attr('src')
              ,'newwindow'
              ,'left=100, top=100, width=1024, height=768'
          );
    
    return (pop) ? false : true;
}

function set_picture(idx, path) {
    picture[idx] = path;
}
