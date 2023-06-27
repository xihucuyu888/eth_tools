const ethUtil = require('ethereumjs-util');

// 你的私钥（用于签名）
const privateKey = Buffer.from('PRIVATE_KEY', 'hex');

// 要签名的消息
const message = 'Hello, Ethereum! 证明地址是我的';

// 获取私钥对应的地址
const address = ethUtil.privateToAddress(privateKey);
const addressHex = address.toString('hex');

console.log('Address:', '0x' + addressHex);

// 生成消息的哈希值
const messageBuffer = Buffer.from(message, 'utf-8')
//const prefixBuffer = Buffer.from('\x19Ethereum Signed Message:\n' + messageBuffer.length)
const prefixedMessage = ethUtil.hashPersonalMessage(messageBuffer);
const rawMessage = ethUtil.keccak256(messageBuffer);

// 使用私钥对消息进行签名
const signaturePrefixed = ethUtil.ecsign(prefixedMessage, privateKey);
const signatureRaw = ethUtil.ecsign(rawMessage, privateKey);

// 将签名数据转换为十六进制字符串
const signatureHexPrefixed = ethUtil.toRpcSig(signaturePrefixed.v, signaturePrefixed.r, signaturePrefixed.s);
const signatureHexRaw= ethUtil.toRpcSig(signatureRaw.v, signatureRaw.r, signatureRaw.s);

console.log('Message:', message);
//console.log('Prefixed Message Hash:', prefixedMessage.toString('hex'));
//console.log('Raw Message Hash:', rawMessage.toString('hex'));
console.log('signaturePrefixed:', signatureHexPrefixed);
console.log('signatureRaw:', signatureHexRaw);
