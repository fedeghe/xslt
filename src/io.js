export default {
    /**
     * That function is here OVERSIMPLIFIED
     * @param  {string} uri     the requested resource
     * @param  {literal} options options for the request
     * @return {undefined} undefined
     */
    ajax: function(uri, options) {
        var xhr = this.getXHR(),
            method = (options && options.method) || 'POST',
            cback = options && options.cback,
            // skipped all others cbacks
            sync = options && options.sync,
            data = (options && options.data) || false,
            type = (options && options.type) || 'text/html',
            targetType = type === 'xml' ? 'responseXML' : 'responseText',
            timeout = options && options.timeout || 3000,
            complete = false,
            res;

        xhr.onreadystatechange = function() {
            var tmp;
            if (xhr.readyState === "complete" || (xhr.readyState === 4 && xhr.status === 200)) {
                if (cback) {
                    res = xhr[targetType];
                    (function() { cback(res); })(res);
                }
            }
            //
            // here I ignore mid cases {loading : 3,received : 2}
            // 
            else if (xhr.readyState === 1) {
                switch (method) {
                    case 'POST':
                        try {
                            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                            xhr.send(data || true);

                        } catch (e1) {}
                        break;
                    case 'GET':
                        try {
                            tmp = { xml: 'text/xml', html: 'text/html', json: 'application/json' }[type] || 'text/html';
                            xhr.setRequestHeader("Accept", tmp + "; charset=utf-8");
                            xhr.send(null);
                        } catch (e2) {}
                        break;
                    default:
                        throw new Error('That silly lib can only handle GET & POST requests.');
                        break;
                }

            }
            return true;
        };

        //open request
        xhr.open(method, (method === 'GET') ? (uri + ((data) ? '?' + data : "")) : uri, sync);

        //thread abortion
        window.setTimeout(function() {
            if (!complete) {
                complete = true;
                xhr.abort();
            }
        }, timeout);

        try {
            return (targetType === 'responseXML') ? xhr[targetType].childNodes[0] : xhr[targetType];
        } catch (e3) {}
        return true;
    },

    getXML: function(uri, cback) {
        this.ajax(uri, {
            method: 'GET',
            sync: false,
            type: 'xml',
            cback: cback || function() {}
        });
    },
    getXHR: function() {
        var xhr,
            IEfuckIds = ['Msxml2.XMLHTTP', 'Msxml3.XMLHTTP', 'Microsoft.XMLHTTP'],
            len = IEfuckIds.length,
            i = 0;

        try {
            xhr = new XMLHttpRequest();
        } catch (e1) {
            for (null; i < len; i += 1) {
                try {
                    xhr = new ActiveXObject(IEfuckIds[i]);
                } catch (e2) { continue; }
            }
            if (!xhr) {
                throw new Error('No way to initialize XHR');
            }
        }
        return xhr;
    }
};