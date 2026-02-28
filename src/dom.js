export default {
    append: function(parent, node) {
        if ("string" === typeof node) {
            parent.innerHTML = parent.innerHTML + node;
        } else {
            parent.appendChild(node);
        }
    }
}