package cts;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.security.KeyStore;
import java.security.PrivateKey;
import java.security.Provider;
import java.security.PublicKey;
import java.security.cert.X509Certificate;
import java.sql.Connection;
import java.util.Enumeration;
public class  CtsSecurity
{
	/*
	For ref it's corresponding program is :TestCrypt32.java
		location:E:\Get Cert\Get Cert*/

	private static PrivateKey privateKey;
	private static PublicKey publicKey;
	private static Provider certProvider;
	private String alias;
	private static String password;
	private static String keyStoreFilePath;
	private static String keyStoreFile;//i.e .jks file
 	private static KeyStore keystore;
	private static X509Certificate oPublicCertificate ;
	Connection con;
 	public CtsSecurity(Connection c)
 	{
			//this.alias="SANJEEV VINAYAK KULKARNI";//Configuration.getConfValByNm("CFG_KEYSTOREALIAS");
			this.alias=Configuration.getConfValByNm("CFG_KEYSTOREALIAS",c);
			alias=alias.toUpperCase();
			//In gawalior uppercase not allowed
			Configuration.writeLog("\n\nalias====="+alias+"---------");	
			con=c;
	}

	/*public static void main(String...args)
	{
		Connection con=Configuration.getConnection();
		PrivateKey p=new CtsSecurity(con).getPrivateKey();
		if(p!=null)
			System.out.println("we got private key");
		else
		System.out.println("we loss private key");


		Provider provider=new CtsSecurity(con).getCertProvider();
		if(provider!=null)
			System.out.println("we got provider");
		else
			System.out.println("we loss provider");
	}*/
	public  PrivateKey getPrivateKey(String keyPath)
	{//1
				try
				{//1
					//System.out.println("\n\nalias====="+alias+"---------"+keyPath);
					Configuration.writeLog("\n\nIn getPrivateKey alias====="+alias+"---------");
					if(!alias.equalsIgnoreCase("LIST"))
					{
						Configuration.writeLog("In OLD LOGIC");
						keystore=loadKeyStore();
						//System.out.println("\n\nafter keystore====="+keystore);
						if(keystore!=null)
						{
							//privateKey=(PrivateKey)keystore.getKey(alias,password.toCharArray());
							//System.out.println("\n inside====="+keystore);
								for (Enumeration oEnum = keystore.aliases();oEnum.hasMoreElements();)
								{//2
									String sAlias = (String)oEnum.nextElement();
									System.out.println("\n\n sAlias="+sAlias+"="+alias+"=alias");
									if(sAlias.equalsIgnoreCase(alias))
									{//3
										oPublicCertificate = (X509Certificate) keystore.getCertificate(alias);
										//System.out.println("\n\n oPublicCertificate====="+oPublicCertificate);
										privateKey =(PrivateKey)keystore.getKey(alias,null);
										System.out.println("\n\n privateKey====="+privateKey);
									}//3
								}//2
						}
					}
					else
					{
						String pass = "changeit";
						Configuration.writeLog("In NEW LOGIC##########");
						Configuration.writeLog("\n--------------------"+new File(".").getCanonicalPath());
						
						File file = new File(keyPath+"listca.pfx");
						InputStream stream = new FileInputStream(file);
						KeyStore store = KeyStore.getInstance("PKCS12");
						System.out.println("Default Keystore is "
								+ KeyStore.getDefaultType());

						store.load(stream, pass.toCharArray());
						privateKey = (PrivateKey) store.getKey(
								"{d2660f5e-7281-407a-a1b2-75f08ac9d01e}",
								pass.toCharArray());
						Configuration.writeLog("Found Key");
						//privateKey=AnotherTest.getPrivateKeyFromPFX(keyPath);
					}
				}//1
				catch(Exception e)
				{//1
					Configuration.writeLog("Found Key==="+e);
						System.out.println("Exception CtsSecurity. getPrivateKey()"+e);
				}//1
				return privateKey;
	}//1

	public X509Certificate getCertificate()
	{
		return oPublicCertificate;
	}
	public  Provider getCertProvider()
	{//2
			try
			{//1
						keystore=loadKeyStore();
						if(keystore!=null)
						{//1--1
							for (Enumeration oEnum = keystore.aliases();oEnum.hasMoreElements();)
							{//2
									String sAlias = (String)oEnum.nextElement();
									if(sAlias.equalsIgnoreCase(alias))
									{//3
											certProvider = keystore.getProvider();
									}//3
							}//2
					}//1--1
			}//1
			catch(Exception e)
			{//1
				System.out.println("Exception CtsSecurity. getCertProvider()"+e);
			}//1
			return certProvider;
	}//2

		private static KeyStore loadKeyStore()
		{//3
				try
				{//3
				/*
					Information:
					The SunMSCAPI Provider:
								The SunMSCAPI provider itself does not contain cryptographic functionality,
								it is simply a conduit between the Java environment and the native cryptographic services on Windows.

								The following algorithms are available in the SunMSCAPI provider:

								Engine													Algorithm Name(s)
								Cipher													RSA RSA/ECB/PKCS1Padding only
								KeyPairGenerator								RSA
								KeyStore												1] Windows-MY
																								The keystore type that identifies the native Microsoft Windows MY keystore.
																								It contains the user's personal certificates and associated private keys.

																							2]Windows-ROOT
																								The keystore type that identifies the native Microsoft Windows ROOT keystore.
																								It contains the certificates of Root certificate authorities and other self-signed trusted certificates.

								SecureRandom									Windows-PRNG
																							The name of the native pseudo-random number generation (PRNG) algorithm.

								Signature											MD2withRSA
																							MD5withRSA
																							SHA1withRSA

																			*///String type, String provider
					 keystore = KeyStore.getInstance("Windows-MY", "SunMSCAPI");
					 //System.out.println("KeyStore.getDefaultType()==="+KeyStore.getDefaultType());
		//000000			 keystore = KeyStore.getInstance("Windows-MY");//Gwalior 
					 //System.out.println("keystore@@="+keystore);
					 //KeyStore ks = KeyStore.getInstance("JKS");
					 //KeyStore ks = KeyStore.getInstance("JCEKS");
					 keystore.load(null,null);
				}//3
				catch(Exception e)
				{//3
					System.out.println("Exception CtsSecurity. loadKeyStore()"+e);
				}//3
				return keystore;
		}//3
}//end  CtsSecurity