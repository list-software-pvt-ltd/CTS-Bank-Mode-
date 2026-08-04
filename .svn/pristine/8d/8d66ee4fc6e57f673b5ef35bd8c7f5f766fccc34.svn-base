package cts;
import java.security.*;
import java.security.spec.*;
import java.security.cert.*;
import java.security.cert.Certificate;
import java.io.*;
import java.util.*;

public class KeyDemo
{//KeyDemo

		public static void main(String...args)throws Exception
		{

		/*	String certificateChainFileName="client.cert";
			FileInputStream certificateStream =new FileInputStream(certificateChainFileName);
			CertificateFactory certificateFactory =CertificateFactory.getInstance("X.509");
			Certificate cert=certificateFactory.generateCertificate(certificateStream);
			certificateStream.close();*/

			String certificateChainFileName ="client.cert";
			String keyStoreFileName="client.jks";
			KeyStore keyStore = KeyStore.getInstance("jks");
			FileInputStream keyStoreInputStream =new FileInputStream(keyStoreFileName);
			keyStore.load(keyStoreInputStream, "pass123".toCharArray());
			keyStoreInputStream.close();
			PrivateKey key = (PrivateKey)keyStore.getKey("client","pass123".toCharArray());
			java.security.cert.Certificate cert = keyStore.getCertificate("client");

			/*PublicKey publicKey=cert.getPublicKey();
			System.out.println("publicKey:"+publicKey);
			if(publicKey instanceof PublicKey)
			{
					System.out.println("*********");
			}*/
/*
**** imageBytes: **** 8
**** signedBytes: **** 256
*/
			FileInputStream fins=new FileInputStream("mySignedData.txt");
				byte[] imageBytes=new byte[8];
				byte[] signedBytes=new byte[256];
				int offCnt=0;
				int charInt=0;
				int dsaCnt=0,imgCnt=0;
				while((charInt=fins.read())!=-1)
				{//1
						if(dsaCnt<8)
						{
								imageBytes[dsaCnt++]=(byte)charInt;
						}
						else if(dsaCnt<256)
						{
								signedBytes[dsaCnt++]=(byte)charInt;
						}
				}//1
					fins.close();

			System.out.println("*********");
			/*KeyPairGenerator keyGen = KeyPairGenerator.getInstance("RSA", "SunRsaSign");
			SecureRandom random = SecureRandom.getInstance("SHA1PRNG");
			keyGen.initialize(2048, random);
			KeyPair pair = keyGen.generateKeyPair();
			PrivateKey priv = pair.getPrivate();

			Signature dsa = Signature.getInstance("SHA256withRSA", "SunRsaSign");
			dsa.initVerify(publicKey);
			dsa.update(imageBytes);

			 if(dsa.verify(signedBytes))
			   {
						System.out.println("....... sign is verify  .....");
						System.out.println("imageBytes:::"+new String(imageBytes));
						System.out.println("signedBytes::"+new String(signedBytes));
				}
				else
				{
						System.out.println("....... not sign is verify  .....");
				}*/


		}//main

}//KeyDemo