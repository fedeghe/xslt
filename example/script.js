window.onload = function() {
    var target = document.getElementById('dstNode'),
        sources = {
            list: {
                xsl: 'xsl/list.xsl',
                xml: 'xml/list.xml'
            },
            article: {
                xsl: 'xsl/article.xsl',
                xml: 'xml/article.xml'
            }
        };

    function renderList(source, trg, params) {
        function listCback() {
            console.log('done: ', arguments)
        }
        Processor.initProcessor(source.xsl)
            .addParams(params instanceof Array ? params : [])
            .render(source.xml, trg, listCback);
    }

    // function renderArticle(source, trg, params) {
    //     params = params || []

    //     function articleCback() {
    //         console.log('done: ', arguments)
    //     }
    //     Processor.initProcessor(source.xsl)
    //         .addParams(params)
    //         .render(source.xml, target, articleCback, params);
    // }

    function render() {
        renderList(sources.list, target);
        // renderArticle(sources.article, target, ['idArticle', "1"])
    }
    render();
}