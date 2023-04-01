import CryptoJS from 'crypto-js'

// aes加密
export function aes() {}
aes.KEY = CryptoJS.enc.Utf8.parse('hs489fe897hh78hf')
aes.encrypt = function(word, key) {
  if (key) {
    key = CryptoJS.enc.Utf8.parse(key)
  } else {
    key = this.KEY
  }
  var srcs = CryptoJS.enc.Utf8.parse(word)
  var encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
  return encrypted.toString()
}
