import { encryptFile, decryptFile, createNewKey } from './modules.js';

async function selectModule(selectKey) {
	switch (selectKey) {
		case 'createKey':
			console.log('Creating new key.');
			await createNewKey();
			break;

		case 'encrypt': {
			console.log('Encrypting file.');
			const fileName = process.argv[3];
			console.log('fileName:', fileName);
			encryptFile(fileName);
			break;
		}

		case 'decrypt': {
			console.log('Decrypting file.');
			const fileName = process.argv[3];
			console.log('fileName:', fileName);
			decryptFile(fileName);
			break;
		}

		default:
			console.log('Unknown command.');
			break;
	}
}

const main = async () => {
	if (process.versions.node.split('.')[0] < 15) {
		console.log('Minimum node.js version 15.0.0 is required!');
		return null;
	}

	selectModule(process.argv[2]);
};

main();
