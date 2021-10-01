import crypto from 'crypto';
import { loadKey } from './encryptionKey.js';
import { createIv } from './encryptionIv.js';

export async function encrypt(data) {
	const key = await loadKey();
	const iv = createIv();

	const cipherText = await crypto.webcrypto.subtle.encrypt(
		{
			name: 'AES-GCM',
			iv,
		},
		key,
		data
	);

	return cipherText;
}
