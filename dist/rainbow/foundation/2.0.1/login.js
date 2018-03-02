
var currentUrl = parseURL(window.location.href);
var appObject = document.getElementById("app");
appObject.style.cssText="display:none";
AjaxUtil.call('./config.json',null,null).then(function(config) {

    replaceURL(config);

    AjaxUtil.call('./server.json',null,null).then(function(serverConfig) {
        for (var key in serverConfig) {
            config[key] = serverConfig[key];
        }
        sessionStorage.setItem("project_config", JSON.stringify(config));
        login(config);
    })


})




function replaceURL(config) {
    if (config["replace_url"]==false || currentUrl.host.indexOf("localhost") > -1 || currentUrl.host.indexOf("127.0.0.1") > -1) {
        return;
    }else{
        var host = currentUrl.host;
        var port = currentUrl.port;
        var index = currentUrl.source.indexOf("//");
        var http = currentUrl.source.substring(0, index);
        var url = null;
        if (port) {
            url = http + "//" + host + ":" + port
        } else {
            url = http + "//" + host
        }
        for (var key in config) {
            var temp_url = config[key];
            if (Object.prototype.toString.call(temp_url) === "[object String]" && temp_url.indexOf("http") == 0) {
                var replaceUrl = parseURL(temp_url);
                config[key] = url + replaceUrl.path
            }
        }
        config.callbackUrl = url + currentUrl.path
    }
}
function login(config) {
    if (config != null && config.login) {
        appObject.style.cssText="display:block";
        var code = currentUrl.params.code || sessionStorage.getItem(config.key+"_code");
        var callbackUrl = config.callback_url;
        var callbackUrlParam = "&redirect_uri=" + callbackUrl;
        var login_url = config.cas_url + config.authorize_url + callbackUrlParam;
        var accessToken_url = config.accessToken_url;
        var authorization = sessionStorage.getItem(config.key);
        var getTokenUrl = config.cas_url + accessToken_url;
        var param ={
            "client_id":"key",
            "grant_type":"authorization_code",
            "client_secret":"secret",
            "redirect_uri":callbackUrl,
            "code":code
        };
        if ( code == null && authorization == null){
            window.location.href = login_url
        } else if(authorization == null){

            AjaxUtil.call(getTokenUrl,param,{"contentType":"application/text"}).then(function(token) {
                sessionStorage.setItem(config.key,token);
                sessionStorage.setItem(config.key+"_code",code);
                window.location.href = callbackUrl;
            })

        }
    }else if(config&&config["tickets"]){
        appObject.style.cssText="display:block";
        var tickets = config["tickets"];
        var arr = Trim(unescape(tickets),'g').replace(/[&\|\\\*^%$#@\-{}\[\]]/g,"").split("!");
        var param = '{"'+arr[0]+'":"'+arr[1]+'","'+arr[2]+'":"'+arr[3]+'"}';
        var url = config["tickets_url"];
        AjaxUtil.call(url,JSON.parse(param),{"method":"POST"}).then(function(token) {
            if(token&&token["access_token"]){
                sessionStorage.setItem(config.key,'access_token='+token["access_token"]);
            }
        });
    }else{
        appObject.style.cssText="display:block";
    }
}

function Trim(str,is_global)
{
    var result;
    result = str.replace(/(^\s+)|(\s+$)/g,"");
    if(is_global.toLowerCase()=="g")
    {
        result = result.replace(/\s/g,"");
    }
    return result;
}

function logout(config) {
    if (config != null && config.login) {
        appObject.style.cssText="display:none";
        sessionStorage.removeItem(config.key);
        sessionStorage.removeItem(config.key+"_code");
        localStorage.removeItem(config.key);
        window.location.href = config.cas_url + "/logout?service=" + window.location.href
    }
}


function parseURL(url) {
    var a = document.createElement("a");
    a.href = url;
    return {
        source: url,
        protocol: a.protocol.replace(":", ""),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: (function() {
            var ret = {},
                seg = a.search.replace(/^\?/, "").split("&"),
                len = seg.length,
                i = 0,
                s;
            for (; i < len; i++) {
                if (!seg[i]) {
                    continue
                }
                s = seg[i].split("=");
                ret[s[0]] = s[1]
            }
            return ret
        })(),
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ""])[1],
        hash: a.hash.replace("#", ""),
        path: a.pathname.replace(/^([^\/])/, "/$1"),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ""])[1],
        segments: a.pathname.replace(/^\//, "").split("/")
    }
}
