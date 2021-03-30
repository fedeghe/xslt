import IO from './io';
import DOM from './dom';

var damnIE = document.all && !(navigator.userAgent.match(/opera/i)),
    processor;

function getProc(xslPath) {
    var p = false,
        damnIE_xsldoc, damnIE_xslt;

    if (damnIE) {
        damnIE_xsldoc = new ActiveXObject("Msxml2.FreeThreadedDOMDocument.3.0");
        damnIE_xslt = new ActiveXObject("Msxml2.XSLTemplate.3.0");
        damnIE_xsldoc.async = false;
        damnIE_xsldoc.load(xslPath);
        damnIE_xslt.stylesheet = damnIE_xsldoc;
        p = damnIE_xslt.createProcessor();

    } else {
        // Chrome, Mozilla, Firefox, Opera, etc.
        p = new XSLTProcessor();
        IO.getXML(xslPath, function(xDoc) {
            p.importStylesheet(xDoc);
        });
    }

    return {
        addParams: function(par) {
            var i = 0,
                l = par.length;
            for (null; i + 1 < l; i += 2) {
                if (damnIE) {
                    p.addParameter(par[i], par[i + 1]);
                } else {
                    p.setParameter(null, par[i], par[i + 1]);
                }
            }
        },
        process: function(xmlDoc) {
            if (damnIE) {
                p.input = xmlDoc;
                p.transform();
                return p.output;
            } else {
                return p.transformToFragment(xmlDoc, document);
            }
        }
    };

}

function render(xmlUrl, dstNode, cb) {
    var xml = false,
        xsl = false,
        out;
    IO.getXML(xmlUrl, function(xmlDoc) {
        xml = xmlDoc;
        out = processor.process(xml);
        DOM.append(dstNode, out);
        cb && typeof cb === 'function' && cb(out);
    });
}

export default {
    initProcessor: function(xslPath) {
        processor = null;
        processor = getProc(xslPath);
        return this;
    },
    addParams: function(p) {
        processor.addParams(p);
        return this;
    },
    render: render
};