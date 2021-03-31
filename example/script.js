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
        Processor.initProcessor(source.xsl)
            .addParams(params instanceof Array ? params : [])
            .render(source.xml, trg, listCback);
    }

    function showItemDetails(e) {
        var li = e.target.closest('li');
        if (!li) return
        var id = li.getAttribute('id'),
            nId = id.split('-')[1],
            others = [].slice.call(li.parentNode.children, 0);

        others.forEach(function(child) {
            if (child.id !== id) {
                child.parentNode.removeChild(child)
            }
        })
        renderArticle(sources.article, li, ['idArticle', nId])

        function kdown(e) {
            if (e.keyCode === 27) {
                window.removeEventListener('keydown', kdown);
                render(true)
            }
        }
        window.addEventListener('keydown', kdown);
        var list = document.getElementById('list');
        list.removeEventListener('click', showItemDetails);
    }

    function listCback() {
        var list = document.getElementById('list');
        list.addEventListener('click', showItemDetails);
    }

    function renderArticle(source, trg, params) {
        params = params || []

        function articleCback() {
            console.log('done: ', arguments)
        }
        Processor.initProcessor(source.xsl)
            .addParams(params)
            .render(source.xml, trg, articleCback, params);
    }

    function render(clear) {
        if (clear) target.innerHTML = ''
        renderList(sources.list, target);
    }
    render();
}