/*
 * Author:   A. Luedecke
 * Purpose:  Web site functionality
 * Created:  Oct/21/2015
 * -----------------------------------------------------
 * Update:   Feb/24/2016 - function loadIframeFromUrl()
 *                         iFrame navigation A. Luedecke
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

function getImage(imgID, url) {
    document.getElementById(imgID).setAttribute('src', url);
}

function getCurrentPage() {
    return curr_page;
}

function loadIframeFromUrl() {
    var param;
    
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
        if (param != '') {
            document.getElementById('ifc').setAttribute('src', param);
        }
    }
    return param;
}

function resetAhead() {
    var ahref = document.getElementById('ahead');

    ahref.href = 'links.html';
    ahref.target = 'if_content';
    ahref.innerText = 'Links / Impressum';
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
        document.getElementById(imgID).setAttribute('src', url_part + '_mov.png');
    } else {
        document.getElementById(imgID).setAttribute('src', url_part + '_up.png');
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
        img_src = document.getElementById(old_imgID).getAttribute('src').replace('mov', 'up');
        document.getElementById(old_imgID).setAttribute('src', img_src);
    }

    if (page != 'LINKS') {
        resetAhead();
    } 
}

function setIframeSrc(url) {
    if (loadIframeFromUrl() == '') {
        document.getElementById('ifc').setAttribute('src', url);
    }
}

function setImageClass(imgID, cls) {
    document.getElementById(imgID).setAttribute('class', cls);
}
