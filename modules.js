import { createKey } from './encryptionKey.js';
import { encrypt } from './encryption.js';
import { decrypt } from './decryption.js';
import { loadFile, saveFile, changeName, toBuffer } from './fileManipulation.js';

export async function encryptFile(fileName) {
	if (fileName) {
		let file = loadFile(fileName);
		file = await encrypt(file);

		const newFileName = changeName(fileName, 'encrypted');
		saveFile(newFileName, toBuffer(file));
		console.log('New encrypted file created:', newFileName);
		return null;
	}
	console.log('Filename is missing.');
}

export async function decryptFile(encryptedFileName) {
	if (encryptedFileName) {
		let encryptedFile = loadFile(encryptedFileName);
		const decryptedFile = await decrypt(encryptedFile);

		const newFileName = changeName(encryptedFileName, 'decrypted');
		saveFile(newFileName, toBuffer(decryptedFile));
		console.log('New decrypted file created:', newFileName);
		return null;
	}
	console.log('Filename is missing.');
}

export async function createNewKey() {
	await createKey();
}
