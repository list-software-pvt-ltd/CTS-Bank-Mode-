package cts;
import java.io.*;
import java.awt.image.*;

import javax.imageio.*;

//import org.apache.commons.codec.binary.*;

import java.security.Provider;
import java.security.spec.*;
import java.security.cert.*;
import java.security.*;
import java.sql.Connection;
import java.sql.SQLException;
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
	//	private ImageBean imageBean;
		private ArrayList<ItemInformation> itemBean;
		private String DigitalSignatureMethod;
		private int SecurityKeySize;
		private String CIBF_FileName;
		private String  ViewSideIndicator;
		private String  ViewFormat;

			//int charInt=0;
								//int dsaCnt=0,imgCnt=0;
	//public ByteToImageConverter(ArrayList<ImageBean>  _imageBean,ArrayList<ItemInformation>_itemBean ,String CIBF_FileName)
	//public ByteToImageConverter(ArrayList<ImageBean>  _imageBean,String CIBF_FileName)
	//public ByteToImageConverter(ImageBean  _imageBean,String CIBF_FileName)
	FileInputStream fins;//=new FileInputStream(BPIBF_fileName);
	String BPIBF_fileName;
	File fileImages;
	String _filename;
	//public ByteToImageConverter(FileInputStream fin)
	public ByteToImageConverter()
	{
	    	//System.out.println("ConvertByteToImage...... Constructor");
			//imageBean=_imageBean;
			//System.out.println("imageBean size:"+imageBean.size());

			//this.CIBF_FileName=CIBF_FileName;
			//itemBean=_itemBean;
				//System.out.println("itemBean size:"+itemBean.size());

				Connection con=Configuration.getConnection();
				//BPIBF_fileName=Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI")+"/ClearingInward/"+CIBF_FileName;
				fileImages=new File(Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI",con)+"ClearingInward/Images");
				fileImages.mkdirs();
				_filename=Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI",con)+"/ClearingInward/Images/";
				try {
					con.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				//fins=fin;
				//System.out.println("ConvertByteToImage...... Constructor exit");
	}//SimpleConvertImage
	
	//public StringBuffer getImage()
    public StringBuffer getImage(ImageBean _objBean,FileInputStream fins)
    {
    	Configuration.writeLog(" getImage=");
		StringBuffer retVal=new StringBuffer(" ");
    	ByteArrayOutputStream baos=null;;
    	BufferedOutputStream in=null;
		int counter=0;
		String fileNameList="";
		String serialNumber="";
		String imageFileName="";
    	try
    	{//try

				System.gc();
				//Thread.sleep(5000);
				int len=0;
				//Read the .img file

				//this loop for get item
				int tempLength=0;
				//FileInputStream fins=new FileInputStream(BPIBF_fileName);
				//for(ItemInformation itmBean:itemBean)
				{//1setSerialNumber
						//serialNumber=itmBean.getSerialNumber();
						//System.out.println("serialNumber:::"+serialNumber);
						int jj=1;
						//this loop for get image information
						//for(ImageBean _objBean:imageBean)
						{//2
							//System.out.println("\n in loop=>>"+jj);
							//Configuration.writeLog(" 11111111="+_objBean.getImageDataOffset());
							//Configuration.writeLog(" 2222222222="+_objBean.getImageDataLength());
							//Configuration.writeLog(" 3333333333="+_objBean.getDigitalSignatureDataOffset());
							//Configuration.writeLog(" 44444444444="+_objBean.getDigitalSignatureLength());
							this.base64String_offset=Integer.parseInt(_objBean.getImageDataOffset());
							
							this.base64String_length=Integer.parseInt(_objBean.getImageDataLength());
							
							this.dsa_offset=Integer.parseInt(_objBean.getDigitalSignatureDataOffset());
							
							this.dsa_length=Integer.parseInt(_objBean.getDigitalSignatureLength());
							

							this.SecurityKeySize=Integer.parseInt(_objBean.getSecurityKeySize());
							//Configuration.writeLog(" 55555555555=");
							this.DigitalSignatureMethod=_objBean.getDigitalSignatureMethod();
							//Configuration.writeLog(" 666666666666=");
							this.ViewSideIndicator=_objBean.getViewSideIndicator();
							//Configuration.writeLog(" 7777777777=");
							this.ViewFormat=_objBean.getViewFormat();
							imageFileName=_objBean.getImageFile();
							//System.out.println(" imageFileName="+imageFileName);
							//Configuration.writeLog(" imageFileName="+imageFileName);
							// image Data
							//System.out.println("base64String_offset:::"+base64String_offset);
							//System.out.println("base64String_length:::"+base64String_length);
							//System.out.println("dsa_offset:::"+dsa_offset);
							//System.out.println("dsa_length:::"+dsa_length);

							//System.out.println("fileName:::"+len);
							//System.out.println("SecurityKeySize:::"+SecurityKeySize);
							//System.out.println("DigitalSignatureMethod:::"+DigitalSignatureMethod);
							//System.out.println("ViewSideIndicator:::"+ViewSideIndicator);
							//System.out.println("ViewFormat:::"+ViewFormat);


								/*System.out.println("\nimage:"+jj+" conversion START");
								System.out.println("temLength:"+tempLength);
								System.out.println("base64String_offset:"+base64String_offset);
								System.out.println("base64String_length:"+base64String_length);
								System.out.println("dsa_length:"+dsa_length);
								System.out.println("dsa_offset:"+dsa_offset);
								System.out.println(" image:"+jj+" conversion END");*/

								//fins=fin;
								tempLength=base64String_offset;
								byte[] _dsaByte=new byte[dsa_length];
								byte[] _imageByte=new byte[base64String_length];
								if(base64String_offset>0)
								{
									byte[] temp=new byte[tempLength];
									//FileInputStream fins=new FileInputStream(BPIBF_fileName); true
									fins.read(temp,0,temp.length);
								}
								fins.read(_imageByte,0,base64String_length);
								fins.read(_dsaByte,0,dsa_length);

								/*if(dsa_offset>0)
								{
									fins.read(temp);

								}*/

								/*int offCnt=base64String_offset; //true
								int charInt=0;
								int dsaCnt=0,imgCnt=0;
								while((charInt=fins.read())!=-1)
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
								}//1
								//System.out.println("base64String_offset:"+tempLength);
								tempLength=base64String_offset+base64String_length+dsa_length;
								//System.out.println("tempLength:"+tempLength);
								System.out.println(jj+" image is Created");
								jj++;*/

								/* ** old
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
									 //System.out.print(" abhi ");
								}//1 -- */
								//System.out.println("\n\n imgCnt "+imgCnt);
								//System.out.println("\n\n dsaCnt "+dsaCnt);
								//fins.close();
								//fins=null;

								//CtsSecurity1  _objCtsSecurity=new CtsSecurity1();
								//Provider provider=_objCtsSecurity.getCertProvider();
								//X509Certificate oPublicCertificate=_objCtsSecurity.getCertificate();
								//Signature dsa = Signature.getInstance("SHA256withRSA", "SunRsaSign");old
								//Signature verifier = Signature.getInstance("SHA1withRSA", provider);
								//verifier.initVerify(oPublicCertificate);
								//verifier.update(_imageByte);
								//System.out.println("\n\n **** 1 ****");

									//new File(_filename).mkdirs();
									in=new BufferedOutputStream(new FileOutputStream(_filename+imageFileName));
									//System.out.println("----- 2 -------");
									//byte[] ar=Base64.decodeBase64(_imageByte);
								//	System.out.println("----- 3 -------");
										in.write(_imageByte);
								//	System.out.println("----- 4 -------");
										in.close();

									//for(int k=0;k<_imageByte.length;k++)
									/*for(int k=0;k<ar.length;k++)
									{
											//in.write((int)_imageByte[k]);
											in.write((int)ar[k]);
									}*/
								//	counter++;
								in.close();
								in.flush();
								in=null;
								_dsaByte=null;
								_imageByte=null;
								//System.out.println("\n\n **** 3 ****");
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
									in.close();*/

									//fileNameList=fileNameList+imageFileName+"!Q!";
									//System.out.println("** fileNameList"+fileNameList);
									  counter++;
							   }
							  /*else
							  {
								 System.out.println("sign NOT  verify.....");
								 retVal="FAIL!@!";
							  }*/
							  _objBean=null;
						}//for 2
						//itmBean=null;
						System.gc();
				}//for 1

				if(counter>0)
				{
					//retVal="SUCCESS!@!"+fileNameList;
					//retVal.append("SUCCESS!@!"+fileNameList);
					retVal.append("SUCCESS!@!");
				}
			//System.out.println("**** Exit from ByteToImageConverter retVal:::"+retVal);
			//fins.close();
		}//try
		catch(FileNotFoundException e)
		{//catch
			System.out.println("\nFileNotFoundException in getImage:"+e+"\n");
			Configuration.writeLog("\nFileNotFoundException in getImage:"+e+"\n");
			//retVal="FAIL1!@!";
			retVal.append("FAIL1!@!");
		}//catch
		catch(IOException e)
		{//catch
			System.out.println("\nIOException in getImage:"+e+"\n");
			Configuration.writeLog("\nIOException in getImage:"+e+"\n");
			//retVal="FAIL2!@!";
			retVal.append("FAIL2!@!");
		}//catch
		catch(Exception e)
		{//catch
			e.printStackTrace();
			System.out.println("\nException in getImage:"+e+"\n");
			Configuration.writeLog("\nException in getImage:"+e+"\n");
			//retVal="FAIL3!@!";
			retVal.append("FAIL3!@!");
		}//catch
		finally
		{
		  try{
				baos.close();
				in.close();
				fins.close();
			}catch(Exception e){}
		}

		//System.out.println("return value from ByteToImageConvert::"+retVal);
		return retVal;
    }//end getImage

    public static String getFileName(String serialNumber,String ViewSideIndicator,String ViewFormat)
    {//getFileName

    		//System.out.println("***** inside getFileName *****");
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
}//end SimpleConvertImage