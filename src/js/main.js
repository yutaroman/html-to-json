import storingRecursivelyNode from './Lib/storingRecursivelyNode';

window.addEventListener('DOMContentLoaded', () => {
    let root = {
        head: storingRecursivelyNode(document.head),
        body: storingRecursivelyNode(document.body),
    }

    // JSON に変換
    let convertJson = JSON.stringify(root);

    // 確認の為、console に出力
    console.log(convertJson);
}, false);
