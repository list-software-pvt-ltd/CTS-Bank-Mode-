package cts;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.PrivateKey;

import org.apache.commons.codec.binary.Base64;

class AnotherTest {
	public static PrivateKey getPrivateKeyFromPFX(String keyPath) {
		String pass = "changeit";
		try {
			Configuration.writeLog("\n--------------------"+new File(".").getCanonicalPath());
			File file = new File(keyPath+"listca.pfx");
			InputStream stream = new FileInputStream(file);
			KeyStore store = KeyStore.getInstance("PKCS12");
			System.out.println("Default Keystore is "
					+ KeyStore.getDefaultType());

			store.load(stream, pass.toCharArray());
			PrivateKey key = (PrivateKey) store.getKey(
					"{d2660f5e-7281-407a-a1b2-75f08ac9d01e}",
					pass.toCharArray());
			Configuration.writeLog("Found Key");
			return key;
			/*System.out.println("Success");
			String encodedKey = new String(
					new Base64().encode(key.getEncoded()));
			System.out.println("key ? " + encodedKey);*/
		} catch (KeyStoreException kse) {
			System.err.println("Error getting the key");
			Configuration.writeLog("Not Found Key"+kse);
			return null;
		} catch (Exception e) {
			System.err.println("Error opening the key file");
			Configuration.writeLog("Not Found Key"+e);
			e.printStackTrace();
			return null;
		}
	}
}
