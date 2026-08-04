/*package cts;
import java.io.*;
import java.awt.image.*;
import javax.imageio.*;
import org.apache.commons.codec.binary.*;
import java.security.Provider;
import java.security.spec.*;
import java.security.cert.*;
import java.security.*;
import java.util.*;
import java.nio.*;
import java.nio.channels.*;
public class ByteToImageConverter
{
		private int dsa_offset;
		private int dsa_length;
		private int base64String_offset;
		private int base64String_length;
		private String fileName;
		private ArrayList<ImageBean> imageBean;
		private ArrayList<ItemInformation> itemBean;
		private String DigitalSignatureMethod;
		private int SecurityKeySize;
		private String CIBF_FileName;
		private String  ViewSideIndicator;
		private String  ViewFormat;


	public ByteToImageConverter(ArrayList<ImageBean>  _imageBean,ArrayList<ItemInformation>_itemBean ,String CIBF_FileName)
	{
	    	System.out.println("ConvertByteToImage...... Constructor");
			imageBean=_imageBean;
			System.out.println("imageBean size:"+imageBean.size());
			this.CIBF_FileName=CIBF_FileName;
			itemBean=_itemBean;
	}//SimpleConvertImage

    public String getImage()
    {
		String retVal=" ";
    	ByteArrayOutputStream baos=null;;
    	BufferedOutputStream in=null;
		int counter=0;
		String fileNameList="";
		String serialNumber="";
		String imageFileName="";
    	try
    	{//try
				int len=0;

				//this loop for get item
				for(ItemInformation itmBean:itemBean)
				{//1setSerialNumber
						serialNumber=itmBean.getSerialNumber();
						System.out.println("serialNumber:::"+serialNumber);

						//this loop for get image information
						for(ImageBean _objBean:imageBean)
						{//2
							this.dsa_offset=Integer.parseInt(_objBean.getDigitalSignatureDataOffset());
							this.dsa_length=Integer.parseInt(_objBean.getDigitalSignatureLength());
							this.base64String_offset=Integer.parseInt(_objBean.getImageDataOffset());
							this.base64String_length=Integer.parseInt(_objBean.getImageDataLength());
							this.SecurityKeySize=Integer.parseInt(_objBean.getSecurityKeySize());
							this.DigitalSignatureMethod=_objBean.getDigitalSignatureMethod();
							this.ViewSideIndicator=_objBean.getViewSideIndicator();
							this.ViewFormat=_objBean.getViewFormat();
							imageFileName=_objBean.getImageFile();

							// image Data
							System.out.println("dsa_offset:::"+dsa_offset);
							System.out.println("dsa_length:::"+dsa_length);
							System.out.println("base64String_offset:::"+base64String_offset);
							System.out.println("base64String_length:::"+base64String_length);
							//System.out.println("fileName:::"+len);
							System.out.println("SecurityKeySize:::"+SecurityKeySize);
							System.out.println("DigitalSignatureMethod:::"+DigitalSignatureMethod);
							System.out.println("ViewSideIndicator:::"+ViewSideIndicator);
							System.out.println("ViewFormat:::"+ViewFormat);

							//String imageFileName=getFileName(serialNumber,ViewSideIndicator,ViewFormat);

							//byte[] keyBytes=new byte[SecurityKeySize];
							//read the keybytes from file
							//FileInputStream _key=new FileInputStream("D:/Apache6/Apache6/webapps/CTS/WEB-INF/classes/cts/PubKeyStoreFile.txt");
							//_key.read(keyBytes);
							//_key.close();
							//create a keyfactory - use whichever algorithm and provider
							//KeyFactory kf = KeyFactory.getInstance("RSA", "SunRsaSign");

							//Create PublicKey from byte array
							//for private keys use PKCS8EncodedKeySpec;
							//for public keys use X509EncodedKeySpec
							//X509EncodedKeySpec ks = new X509EncodedKeySpec(keyBytes);
							//PublicKey pk = kf.generatePublic(ks);
							//PublicKey publicKey=new CtsSecurity().getPublicKey(); old


							//byte[] keyBytes1=new byte[SecurityKeySize];
							//FileInputStream _key1=new FileInputStream("D:/Apache6/Apache6/webapps/CTS/WEB-INF/classes/cts/PvtKeyStoreFile.txt");
							//_key1.read(keyBytes1);
							//_key1.close();
							//KeyFactory kf1 = KeyFactory.getInstance("RSA", "SunRsaSign");

							//for private keys use PKCS8EncodedKeySpec;
							//for public keys use X509EncodedKeySpec
							//PKCS8EncodedKeySpec ks1 = new PKCS8EncodedKeySpec(keyBytes1);
							//PrivateKey pk1 = kf1.generatePrivate(ks1);

							byte[] _dsaByte=new byte[dsa_length];
							byte[] _imageByte=new byte[base64String_length];

							//Read the .img file
								String BPIBF_fileName=Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI")+"/ClearingInward/"+CIBF_FileName;
								FileInputStream fins=new FileInputStream(BPIBF_fileName);

								//int offCnt=0;
								//int charInt=0;
								//int dsaCnt=0,imgCnt=0;

								/*while((charInt=fins.read())!=-1)
								{//1

									  if(offCnt>=dsa_offset&&offCnt<base64String_offset)
									  {//2
											_dsaByte[dsaCnt++]=(byte)charInt;
									  }//2
									  else if(offCnt>=base64String_offset&&offCnt<(base64String_offset+base64String_length))
									  {//2
										_imageByte[imgCnt++]=(byte)charInt;
									  }//2
									  else if(offCnt>(base64String_offset+base64String_length))
									   break;
									  offCnt++;
								}//1/

							if(dsa_offset<base64String_offset)
								{
										offCnt=dsa_offset;
										dsaCnt=0;imgCnt=0;
								  }
								  else
								  {
										offCnt=base64String_offset;
								 }


								while((charInt=fins.read())!=-1)
								{//1

									if(dsa_offset<base64String_offset)
									{
										//System.out.println("\n\n in if ");
										  if(offCnt>=dsa_offset&&offCnt<base64String_offset)
										  {//2
												_dsaByte[dsaCnt++]=(byte)charInt;
										  }//2
										  else if(offCnt>=base64String_offset&&offCnt<(base64String_offset+base64String_length))
										  {//2
											_imageByte[imgCnt++]=(byte)charInt;
										  }//2
										  else if(offCnt>(base64String_offset+base64String_length))
										   break;
								  }
								  else
								  {
									  //System.out.println("\n\n in else ");
									 if(offCnt>=base64String_offset && offCnt<dsa_offset)
									  {//2
											_imageByte[imgCnt++]=(byte)charInt;
									  }//2
									  else  if(offCnt>=dsa_offset&&offCnt<(dsa_offset+dsa_length))
									  {//2
									  _dsaByte[dsaCnt++]=(byte)charInt;

									  }//2
									  else if(offCnt>(dsa_offset+dsa_length))
										   break;
									 }
									 offCnt++;
								}//1
								System.out.println("\n\n imgCnt "+imgCnt);
								System.out.println("\n\n dsaCnt "+dsaCnt);
								fins.close();

								//CtsSecurity1  _objCtsSecurity=new CtsSecurity1();
								//Provider provider=_objCtsSecurity.getCertProvider();
								//X509Certificate oPublicCertificate=_objCtsSecurity.getCertificate();
								//Signature dsa = Signature.getInstance("SHA256withRSA", "SunRsaSign");old
								//Signature verifier = Signature.getInstance("SHA1withRSA", provider);
								//verifier.initVerify(oPublicCertificate);
								//verifier.update(_imageByte);
								System.out.println("\n\n **** 1 ****");
								String _filename=Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI")+"/ClearingInward/Images/";
								//new File(_filename).mkdirs();
								in=new BufferedOutputStream(new FileOutputStream(_filename+imageFileName));
								System.out.println("----- 2 -------");
								//	byte[] ar=Base64.decodeBase64(_imageByte);
								//	System.out.println("----- 3 -------");
								//	in.write(_imageByte);
								//	System.out.println("----- 4 -------");
								//	in.close();

									for(int k=0;k<_imageByte.length;k++)
									{
											in.write((int)_imageByte[k]);
									}
								//	counter++;
								in.close();
								System.out.println("\n\n **** 3 ****");
							// if(verifier.verify(_dsaByte))
							   {
									//System.out.println("....... sign is verify  .....");
									//System.out.println("----- 1 -------");
									/*String _filename=Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI")+"/ClearingInward/Images/";
									new File(_filename).mkdirs();
									in=new BufferedOutputStream(new FileOutputStream(_filename+imageFileName));
									System.out.println("----- 2 -------");
									byte[] ar=Base64.decodeBase64(_imageByte);
									System.out.println("----- 3 -------");
									in.write(ar);
									System.out.println("----- 4 -------");
									in.close();
									fileNameList=fileNameList+imageFileName+"!Q!";
									//System.out.println("** fileNameList"+fileNameList);
									  counter++;
							   }
							  /*else
							  {
								 System.out.println("sign NOT  verify.....");
								 retVal="FAIL!@!";
							  }
						}//for 2
				}//for 1

				if(counter>0)
				{
					retVal="SUCCESS!@!"+fileNameList;
				}
			System.out.println("**** Exit from ByteToImageConverter retVal:::"+retVal);
		}//try
		catch(FileNotFoundException e)
		{//catch
			System.out.println("\nFileNotFoundException in getImage:"+e+"\n");
			retVal="FAIL1!@!";
		}//catch
		catch(IOException e)
		{//catch
			System.out.println("\nIOException in getImage:"+e+"\n");
			retVal="FAIL2!@!";
		}//catch
		catch(Exception e)
		{//catch
			System.out.println("\nException in getImage:"+e+"\n");
			retVal="FAIL3!@!";
		}//catch
		finally
		{
		  try{
				baos.close();
				in.close();
			}catch(Exception e){}
		}

			System.out.println("return value from ByteToImageConvert::"+retVal);
		return retVal;
    }//end getImage

    public static String getFileName(String serialNumber,String ViewSideIndicator,String ViewFormat)
    {//getFileName

    		System.out.println("***** inside getFileName *****");
    		//System.out.println("serialNumber::"+serialNumber);
    		//System.out.println("ViewSideIndicator::"+ViewSideIndicator);
    		//System.out.println("ViewFormat::"+ViewFormat);
    		String strPrefix="",imgFileName="";
    		//Front BW,Back BW,Front Gray
    		if(ViewSideIndicator.equalsIgnoreCase("Front BW"))
    		{
					strPrefix="f";
			}
			else if(ViewSideIndicator.equalsIgnoreCase("Back BW"))
			{
					strPrefix="r";
			}
			else if(ViewSideIndicator.equalsIgnoreCase("Front Gray"))
			{
					strPrefix="g";
			}

			if(strPrefix.equals("g"))
			{
					imgFileName="f"+serialNumber+strPrefix+"."+ViewFormat;
			}
			else
			{
					imgFileName=strPrefix+serialNumber+"."+ViewFormat;
			}
			//System.out.println("strPrefix :::::"+strPrefix);
			//System.out.println("imgFileName:::"+imgFileName);
		return imgFileName;
	}//getFileName
}//end SimpleConvertImage*/