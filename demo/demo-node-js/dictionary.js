const { createKey } = require('langutil');

module.exports = [
    createKey('ALICE', {
        'en': 'Alice',
        'zh-cn': '爱丽丝',
    }),
    createKey('HELLO_NAME', {
        'en': 'Hello, %p!',
        'zh-cn': '%p，你好！',
    }),
    createKey('HELLO_WORLD', {
        'en': 'Hello world',
        'zh-cn': '哈咯世界',
    })
];