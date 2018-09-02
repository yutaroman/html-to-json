export default function storingRecursivelyNode(node) {
    // node を再帰的に格納
    let __node = {
        tagName: '',
        text: '',
        attributes: [],
        children: [],
    }

    // タグ、テキスト、属性を __node に格納
    if (node.tagName) {
        __node.tagName = node.tagName
    }
    if (node.childNodes.length === 1) {
        __node.text = node.childNodes[0].textContent;
    }
    if (typeof node.attributes !== 'undefined' && node.attributes.length > 0) {
        for (let i = 0; i < node.attributes.length; i++) {
            let attr = {
                name: node.attributes[i].name,
                value: node.attributes[i].value,
            }
            __node.attributes.push(attr);
        }
    }

    // node の children を __node に格納
    if (typeof node.children !== 'undefined' && node.children.length > 0) {
        for (let i = 0; i < node.children.length; i++) {
            let child = storingRecursivelyNode(node.children[i]);

            // 再帰的に取得
            __node.children.push(child);
        }
    }

    return __node;
};
