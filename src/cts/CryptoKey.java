package cts;

import java.security.Key;
import java.util.Base64;
import java.util.Base64.Decoder;
import java.util.Random;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

public class CryptoKey {

	
	public static String newdecrypt(String data) {
		String originalString = "";
		try {
			
			String key = "8765432187654321";
			String iv = "8765432187654321";
			
			Decoder decoder = Base64.getDecoder();
			byte[] encrypted1 = decoder.decode(data);

			Cipher cipher = Cipher.getInstance("AES/CBC/NoPadding");
			SecretKeySpec keyspec = new SecretKeySpec(key.getBytes(), "AES");
			IvParameterSpec ivspec = new IvParameterSpec(iv.getBytes());

			cipher.init(Cipher.DECRYPT_MODE, keyspec, ivspec);

			byte[] original = cipher.doFinal(encrypted1);
			originalString = new String(original);
			
		} catch (Exception e) {
			e.printStackTrace();
			originalString = "NA";
		}
		return originalString.trim();
	}
	
	public static String rantoken()
	{
		String newwpass="";
	
		try {
			String SALTCHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz";
		    StringBuilder salt = new StringBuilder();
		    Random rnd = new Random();
		    while (salt.length() < 20) { // length of the random string.
		        int index = (int) (rnd.nextFloat() * SALTCHARS.length());
		        salt.append(SALTCHARS.charAt(index));
		    }
		    newwpass = salt.toString();
		}
		catch(Exception e)
		{
			e.printStackTrace();
			newwpass="";
		}
		    
		return newwpass;
	}
}
