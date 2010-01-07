// ==UserScript==
// @name           Detinyfy link redirector
// @namespace      http://github.com/bodo/userscripts
// @description    Redirects all short urls to detinyfy.de
// @include        *
// ==/UserScript==
(function(){
    var services = new Array("tinyurl.com", "twiturl.de", "is.gd", "bit.ly", "twurl.nl", "ff.im", 
                             "snipr.com", "arm.in", "dc8p.tv", "poll.fm", "cli.gs", "minu.ws", "budURL.com",
                             "eweri.com", "hex.io", "idek.net", "lin.cr", "POPrl.com", "snipurl.com",
                             "snurl.com", "sn.im", "twurl.cc", "urlborg.com", "zi.ma", "eb.cx", "elfurl.com",
                             "shorl.com", "url.fm", "shurl.org", "ur1.ca", "ping.fm", "tr.im", "xrl.us", 
                             "twurl.nl", "url.ie", "poprl.com", "6url.com", "yep.it", "ln-s.net", "piurl.com",
                             "urlkiss.com", "icanhaz.com", "minilien.com", "tinylink.com", "urlcut.com",
                             "doiop.com", "tighturl.com", "2tu.us", "myurl.in", "memurl.com", "xn--hgi.ws",
                             "xn--ogi.ws","xn--vgi.ws","xn--egi.ws","xn--9gi.ws","xn-5hgi.ws","xn--1ci.ws",
                             "xn--odi.ws","xn--rei.ws","xn--cgw.ws", "ow.ly", "redir.ec", "urlzen.com", "mhtweet.com",
                             "twitpwr.com", "spdlink.de", "rly.cc", "u.nu", "icio.us", "trim.li/nk", "digs.by",
                             "url4.eu", "j.mp");
    
    var regExpQM = new RegExp("^http://(fastix.org/go|chilp.it/)\\?(\\w)*$");
    var regExp = new RegExp("^http://(www.)?(" + services.join("|") + ")/(\\w|-|#|%)+$", "i");
    var facebRegExp = new RegExp("^http://www.facebook.com/l.php.*");
    
    function checkTinyUrl(url) {
      return (regExp.test(url) || (regExpQM.test(url))) && !url.match(".*\\.(php|html)$")
    }

    function checkFacebook(url) {
      return facebRegExp.test(url);
    }
    
    function getPartOfUrl(url, name) {
        name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
        var regexS = "[\\?&]"+name+"=([^&#]*)";
        var regex = new RegExp( regexS );
        var results = regex.exec( url );
        if( results == null )
          return "";
        else
          return results[1];
    }

    function getFaceBookUri(url) {
        return unescape(getPartOfUrl(url, "u"));
    }
    
    allLinks = document.getElementsByTagName('a');
    for (var i = 0; i < allLinks.length; i++) {
        link = allLinks[i];
        if (checkTinyUrl(link.href)){
            link.href = "http://detinyfy.de/load_url?url="+escape(link.href);
        } else if (checkFacebook(link.href)) {
            url = getFaceBookUri(link.href);
            if (checkTinyUrl(url)) {
                link.href = "http://detinyfy.de/load_url?url="+escape(url);
            }
        }
    }
})();