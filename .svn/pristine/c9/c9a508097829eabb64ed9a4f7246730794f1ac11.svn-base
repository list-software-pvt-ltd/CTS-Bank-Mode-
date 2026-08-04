package cts;
import java.security.*;
import java.security.spec.*;
import java.security.cert.*;
import java.security.cert.Certificate;
import java.io.*;
import java.util.*;
public class Sec2
{
	public static void main(String...args)throws Exception
	{
		try {
		    // Load the keystore in the user's home directory
		    File file = new File("clientcert.jks");
		    FileInputStream is = new FileInputStream(file);
		    KeyStore keystore = KeyStore.getInstance("jks");
		    String password = "123456";
		    keystore.load(is, password.toCharArray());
 			PublicKey publicKey=null;
 			PrivateKey privateKey=null;
		    // List the aliases
		    Enumeration enum1 = keystore.aliases();
		    for (; enum1.hasMoreElements(); )
		    {
		        String alias = (String)enum1.nextElement();
				System.out.println("alias::"+alias);

		        // Does alias refer to a private key?
		        boolean b = keystore.isKeyEntry(alias);
				//System.out.println("Does alias refer to a private key::"+b);
				privateKey=(PrivateKey)keystore.getKey(alias,password.toCharArray());
		        // Does alias refer to a trusted certificate?
		        b = keystore.isCertificateEntry(alias);
		        System.out.println("Does alias refer to a trusted certificate::"+b);

		        java.security.cert.Certificate cert = keystore.getCertificate(alias);
		         publicKey=cert.getPublicKey();
							//System.out.println("publicKey:"+publicKey);
				if(publicKey instanceof PublicKey)
				{
						System.out.println("*********");
				}

		    }

			FileInputStream fins=new FileInputStream("mySignedData.txt");
							byte[] imageBytes1=new byte[8];
							byte[] signedBytes1=new byte[256];
							int offCnt=0;
							int charInt=0;
							int dsaCnt=0,imgCnt=0;
							while((charInt=fins.read())!=-1)
							{//1
									if(dsaCnt<8)
									{
											imageBytes1[dsaCnt++]=(byte)charInt;
									}
									else if(dsaCnt>=8)
									{
											signedBytes1[imgCnt++]=(byte)charInt;

									}
							}//1

					fins.close();
					System.out.println("\n\n");
					System.out.println("imageBytes:::"+new String(imageBytes1));
					System.out.println("signedBytes::"+new String(signedBytes1));
					System.out.println("\n\n");
				//now create signature and verify the data
					Signature dsa1 = Signature.getInstance("SHA256withRSA", "SunRsaSign");
					dsa1.initVerify(publicKey);
					dsa1.update(imageBytes1);

							 if(dsa1.verify(signedBytes1))
							   {
										System.out.println("....... sign is verify  .....");
										System.out.println("imageBytes:::"+new String(imageBytes1));
										System.out.println("signedBytes::"+new String(signedBytes1));
								}
								else
								{
										System.out.println("....... not sign is verify  .....");
								}

			is.close();
		} catch (java.security.cert.CertificateException e) {
		} catch (NoSuchAlgorithmException e) {
		} catch (FileNotFoundException e) {
		    // Keystore does not exist
		} catch (KeyStoreException e) {
		} catch (IOException e) {
		}

	}
}