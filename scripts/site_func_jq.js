/*
 * Author:   A. Luedecke
 * Purpose:  Web site functionality
 * Created:  Oct/21/2015
 * --------------------------------------------------------------
 * Update:   Feb/24/2016 - function loadIframeFromUrl()
 *                         - iFrame navigation        A. Luedecke
 * --------------------------------------------------------------
 * Update:   Mar/10/2016 - jQuery support             A. Luedecke
 * --------------------------------------------------------------
 * Update:   Aug/12/2016 - function loadResFrameFromUrl()
 *                         function setResFrameSrc(url)
 *                         - display dog show results A. Luedecke
 * --------------------------------------------------------------
 * Update:   Oct/07/2016 - function setObjectClass()  A. Luedecke
 * --------------------------------------------------------------
 * Update:   Jul/24/2017 - function loadIframeFromUrl()
 *                         - load vkbreedflyer.html   A. Luedecke
 * --------------------------------------------------------------
 * Update:   Nov/07/2017 - function loadResFrameFromUrl()
 *                         - dog show results 2017    A. Luedecke
 */
var curr_imgID = 'imgHOME';
var curr_page = 'HOME';
var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        }
       ,BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        }
       ,iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        }
       ,Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        }
       ,Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        }
       ,any: function() {
            return (
              isMobile.Android() || isMobile.BlackBerry() ||
              isMobile.iOS() || isMobile.Opera() || isMobile.Windows()
            );
        }
    };

$(document).ready(function() {
    $('#tbl_menu td').attr('class', 'menu');
    $('#tbl_menu td a img').attr('class', 'photo');
    /*
    $('#img_log').on('click', function() {
        window.open('show_log.html', '_blank');
    });
    */
    $('#img_fun').on('click', function() {
        window.open(
            'res/beach_fun.gif'
            , 'newwindow'
            , 'left=100, top=100, width=457, height=234');
    });
});

function getImage(imgID, url) {
    $('#' + imgID).attr('src', url);
}

function getCurrentPage() {
    return curr_page;
}

function loadIframeFromUrl() {
    var param = '';
    
    if (window.location.search != '') {
        param = window.location.search.slice(1);
        
        switch (param) {
            case 'breedatt.html':
                setCurrentPage('ZW', 'imgZW');
                setCurrentImage('imgZW', 'ZW', 'res/btn_zw');
                break;
            case 'breeders.html':
                setCurrentPage('HZ', 'imgHZ');
                setCurrentImage('imgHZ', 'HZ', 'res/btn_hz');
                break;
            case 'breeds.html':
                setCurrentPage('HR', 'imgHR');
                setCurrentImage('imgHR', 'HR', 'res/btn_hr');
                break;
            case 'group.html':
                setCurrentPage('LG', 'imgLG');
                setCurrentImage('imgLG', 'LG', 'res/btn_lg');
                break;
            case 'news.html':
                setCurrentPage('NEWS', 'imgNEWS');
                setCurrentImage('imgNEWS', 'NEWS', 'res/btn_news');
                break;
            case 'pictures.html':
                setCurrentPage('PIC', 'imgPIC');
                setCurrentImage('imgPIC', 'PIC', 'res/btn_pic');
                break;
            case 'puppies.html':
                setCurrentPage('PUP', 'imgPUP');
                setCurrentImage('imgPUP', 'PUP', 'res/btn_pup');
                break;
            case 'vkbreedflyer.html':
                setCurrentPage('VKF', 'imgVKF');
                setCurrentImage('imgVKF', 'VKF', 'res/btn_vkflyer');
                break;
            case 'shows.html':
                setCurrentPage('AUS', 'imgAUS');
                setCurrentImage('imgAUS', 'AUS', 'res/btn_aus');
                break;
            case 'success.html':
                setCurrentPage('SUCC', 'imgSUCC');
                setCurrentImage('imgSUCC', 'SUCC', 'res/btn_suc');
                break;
            default:
              param = '';
        }
        if (param != '' && $('#ifc').attr('src') != param) {
             $('#ifc').attr('src', param);
        }
    }
    return param;
}

function loadResFrameFromUrl() {
    var param;
    var url = '';
    
    if (window.location.search != '') {
        param = window.location.search.slice(1);

        switch (param) {
            case '20150926':
                url = 'https://macshot.de/vk-bb2/ergebnisse.php?d=26.09.15';
                break;
            case '20150927':
                url = 'https://macshot.de/vk-bb3/ergebnisse.php?d=27.09.15';
                break;
            case '20160924':
                url = 'https://macshot.de/vk-bb2/ergebnisse.php?d=24.09.16';
                break;
            case '20160925':
                url = 'https://macshot.de/vk-bb3/ergebnisse.php?d=25.09.16';
                break;
            case '20170916':
                url = 'https://macshot.de/vk-bb2/ergebnisse.php?d=16.09.17';
                break;
            case '20170917':
                url = 'https://macshot.de/vk-bb3/ergebnisse.php?d=17.09.17';
                break;
            default:
                url = '';
        }
    }
    if (url != '') {
         $('#ifr').attr('src', url);
         $('.nav-tabs a[href="#' + param + '"]').tab('show');
    }
    return url;
}

function resetAhead() {
    $('#ahead').attr('href', 'links.html');
    $('#ahead').attr('target', 'if_content');
    $('#ahead').html('Impressum / Links');
}

function resizeIframe(iframe, scr) {
    iframe.height = '';

    if (scr == 1) {
        iframe.height = screen.height + 'px';
    } else {
        iframe.height = iframe.contentWindow.document.body.scrollHeight + 'px';
    }
}

function setAhref(ahref) {
    var imgID = 'none';

    if (ahref.innerText == 'Startseite') {
        ahref.href = 'index.html';
        ahref.target = '';
    } else {
        ahref.href = 'links.html';
        ahref.target = 'if_content';
        ahref.innerText = 'Startseite';
        setCurrentPage('LINKS', imgID);
    }
}

function setCurrentImage(imgID, page, url_part) {
    if (page == curr_page) {
        $('#' + imgID).attr('src', url_part + '_mov.png');
    } else {
        $('#' + imgID).attr('src', url_part + '_up.png');
    }
}


function setCurrentPage(page, imgID) {
    var img_src;
    var old_imgID = curr_imgID;

    curr_page = page;
    
    if (imgID != 'none') {
        curr_imgID = imgID;
    }

    if (old_imgID != imgID) {
        img_src = $('#' + old_imgID).attr('src').replace('mov', 'up');
        $('#' + old_imgID).attr('src', img_src);
    }

    if (page != 'LINKS') {
        resetAhead();
    } 
}

function setIdxFrameSrc(url) {
    if (loadIframeFromUrl() == '') {
        $('#ifc').attr('src', url);
    }
}

function setIframeSrc(ifID, url) {
  if ($('#' + ifID).attr('src') != url) {
      $('#' + ifID).attr('src', url);
  }
}

function setImageClass(imgID, cls) {
    $('#' + imgID).attr('class', cls);
}

function setObjectClass(objID, cls) {
    $('#' + objID).attr('class', cls);
}

function setResFrameSrc(url) {
    if (loadResFrameFromUrl() == '' &&  $('#ifr').attr('src') != url) {
        $('#ifr').attr('src', url);
    }
}