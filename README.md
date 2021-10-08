# AES - file encryption

### Requirements:

```
nodejs 15.0.0 or above
npm 7.0.2 or above
```

### Install:

```
git clone https://github.com/rajamarko/learning-encryption-aes.git
cd learning-encryption-aes

npm install
```

### Encrypt:

```
npm start e [filename.ex]
```

A new encrypted file will be created, in the same directory as the original file. '-encrypted' will be added before the file extension (filename-encrypted.ex). <br />
Absolute path can be provided for filename.

### Decrypt

```
npm start d [filename-encrypted.ex]
```

A new encrypted file will be created, in the same directory as the original file. '-decrypted' will be added before the file extension (filename-decrypted.ex). <br />
Absolute path can be provided for filename.

### Create new key

```
npm start -createKey
```

A new encryption key will be created. Also if a key is missing, it will be created on the next file encryption.

### Description

On every encryption, a new initialization vector (iv) file is created, and the same initialization vector must be used for decrypting the file.
