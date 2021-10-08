import { encryptFile, decryptFile, createNewKey } from './modules.js';
import prompt from 'prompt';

async function selectModule(selectKey, password) {
	switch (selectKey) {
		case '-createKey':
			console.log('Creating new key.');
			await createNewKey();
			break;

		case 'e': {
			console.log('Encrypting file.');
			const fileName = process.argv[3];
			console.log('fileName:', fileName);
			encryptFile(fileName, password);
			break;
		}

		case 'd': {
			console.log('Decrypting file.');
			const fileName = process.argv[3];
			console.log('fileName:', fileName);
			decryptFile(fileName, password);
			break;
		}

		default:
			console.log('Unknown command.');
			break;
	}
}

const main = async (password) => {
	if (process.versions.node.split('.')[0] < 15) {
		console.log('Minimum node.js version 15.0.0 is required!');
		return null;
	}

	selectModule(process.argv[2], password);
};

const properties = [
	{
		name: 'password',
		hidden: true,
	},
];

function onErr(err) {
	console.log(err);
	return 1;
}

prompt.start();

prompt.get(properties, function (err, result) {
	if (err) {
		return onErr(err);
	}
	// console.log('  Password: ' + result.password);
	main(result.password);
});
