package cts;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;
import java.security.PrivateKey;
import java.security.Signature;
import java.sql.Connection;
import java.util.ArrayList;

import javax.imageio.ImageIO;

import org.apache.commons.codec.binary.Base64;
public class XMLMerge
{//XMLMarge

		/*ArrayList<MItem> _mItem;
		ArrayList<MlItemsTag> _mItemsTagAl;
		ArrayList<MImageViewDetail> _mImageViewDetail;
		Iterator iterator;

		MItem _objMItem;
		MlItemsTag  _objMlItemsTag;
		MImageViewDetail _objMImageViewDetail;*/


			ItemInformation _itemInfoBean=null;
			ImageBean _imageBean=null;
			MicrDataInformation  _micrBean=null;
			Item itemBean=null;
			AddendATag _addendATagBean=null;
			static SingleItem _singleItem;
			ArrayList<ItemInformation> _itemInfoBeanAl=new ArrayList<ItemInformation>();
			ArrayList<ImageBean> _imageBeanAl=null;
			ArrayList<MicrDataInformation> _micrBeanAl=new ArrayList<MicrDataInformation>();
			ArrayList<Item> itemBeanAl=new ArrayList<Item>();
			ArrayList<AddendATag> _addendATagBeanAl=new ArrayList<AddendATag>();

		public XMLMerge()
		{}

	/*public static void main(String...args)
	{
			String[] imgArr=makeTempDir();
			System.out.println(imgArr.length);
				genImgXMLFile(imgArr);
	}*/
		// makeTemp method create 	a temp dir and keep all branch image file in it
		public static String[] makeTempDir()
		{//makeTemp
				String[] fileNames=null;
				String imgFile="";
				try
				{//1
					String path="D:/Apache6/Apache6/webapps/CTS/uploadpath_to_CHI/";
					new File(path+"tempImg").mkdirs();
					File f=new File(path);
						String[] allDir=f.list();
						for(String dir:allDir)
						{//2
								System.out.println("DIR:::"+dir);
								File _dir=new File(path+dir);
								//System.out.println("_dir:::"+_dir);
								if(_dir.isDirectory())
								{//3
										String newFilePath=path+dir+"/ClearingOutward/Images/";
										//create new File
										File branch=new File(newFilePath);
										//System.out.println("branch:::"+branch);
										String[] branchImgfiles=branch.list();
										/*if(branchImgfiles==null)
										{
											System.out.println("****** branchImgfiles is null******>>>");
											System.out.println("****** branchImgfiles is null******>>>");
										}
										else
										{
												System.out.println("****** branchImgfiles is NOT null******>>>");
												System.out.println("****** branchImgfiles is NOT null******>>>");
											}*/

										//System.out.println("****** 33 ******>>>");
										if(branchImgfiles==null)
										{//4
												break;
										}//4
										else
										{//4
													for(String imageFile:branchImgfiles)
														{//5
															//System.out.println("****** 44 *****");
																Thread.sleep(500);
																//System.out.println("imageFile:::"+imageFile);
																new File(newFilePath+imageFile).renameTo(new File(path+"tempImg/"+imageFile));
																imgFile=imgFile+imageFile+"#";
														}//5
										}//4
								}//3
						}//2
						fileNames=imgFile.split("#");
				}//1
				catch(Exception e)
				{//1
						e.printStackTrace();
						System.out.println("Exception e::"+e);
				}//1
				return fileNames;
		}//makeTemp

		public static void genImgXMLFile(String[] imageFileNames,Connection con,PrivateKey privateKey)
		{//genImgFile
					
					System.out.println("********* inside  genImgXMLFile ************");
					System.out.println("imageFileNames count:"+imageFileNames.length);
					String path="D:/Apache6/Apache6/webapps/CTS/uploadpath_to_CHI/tempImg/";
					int noOfImages=imageFileNames.length;
					int noOfItems=0;
					int imageCount=0,imageCountCondition=3;
					byte[]imageBytes=null;
					byte[] dsaByte=null;
					String imageCompressionType="";
					int _offset=0;
				try
				{//try
							System.out.println("*********1 **************");
							FileOutputStream cibf_fos=new FileOutputStream(path,true);

							System.out.println("********* 2*************");
								if(noOfImages%3==0)
									{//1
											noOfItems=noOfImages/3;
											System.out.println("********* noOfItems************"+noOfItems);
											for(int items=0;items<noOfItems;items++)
											{//2
												//create new Item
														 _singleItem=new SingleItem();
														_singleItem.setCurrencyInd("");
														_singleItem.setIQAIgnoreInd("");
														_singleItem.setUserField("");
														_singleItem.setTruncatingRTNo("");
														_singleItem.setSpecialHandling("");
														_singleItem.setMICRRepairFlags("");
														_singleItem.setDocType("");
														_singleItem.setClearingType("");
														_singleItem.setNumOfImageViews("");
														_singleItem.setCycleNo("");
														_singleItem.setPresentmentDate("");
														_singleItem.setPresentingBankRoutNo("");
														_singleItem.setTransCode("");
														_singleItem.setSerialNo("");
														_singleItem.setAccountNo("");
														_singleItem.setAmount("");
														_singleItem.setPayorBankRoutNo("");
														_singleItem.setPayorBankRoutNo("");
														_singleItem.setItemSeqNo("");

														for(;imageCount>imageCountCondition;imageCount++)
														{//3

																String imageFileName=imageFileNames[imageCount];
																	File f=new File(path+imageFileName);
																	if(f.isFile())
																	  {//4
																			ByteArrayOutputStream baos=new ByteArrayOutputStream(1000);
																			/////
																					String ViewSideIndicator=fileViewIndicator(imageFileName);
																					//System.out.println("*****ViewSideIndicator"+ViewSideIndicator);
																					if(!ViewSideIndicator.equalsIgnoreCase("FAIL#"))
																					{//5
																							//System.out.println("***** 111 ***** ");

																							String ViewFormat=imageFileName.substring(imageFileName.indexOf(".")+1,imageFileName.length());
																							//imageBytes=null;
																							if(ViewFormat.equalsIgnoreCase("tif"))
																							{//6
																									FileInputStream in=new FileInputStream(f);
																									FileChannel ch=in.getChannel();
																									ByteBuffer bu=ByteBuffer.allocate((int)ch.size());
																									ch.read(bu);
																									//ch.close();//DSP
																									byte[] arr=bu.array();
																									imageBytes=Base64.encodeBase64(arr);
																									//System.out.println("**** omkar **"+arr);
																									imageCompressionType="G4";
																									ViewFormat="TIFF";
																									//System.out.println("***** 333 ***** ");
																							}//6
																							else
																							{//6
																										BufferedImage img=ImageIO.read(new File(path,imageFileName));
																										//System.out.println("***** img ***** "+img);
																										//System.out.println("***** ViewFormat ***** "+ViewFormat);
																										//System.out.println("***** baos ***** "+baos.toString());
																										ImageIO.write(img, ViewFormat, baos);
																										//System.out.println("**** 3 ***");
																										baos.flush();
																										//System.out.println("**** 4 ***");
																										imageBytes=Base64.encodeBase64(baos.toByteArray());
																										//System.out.println("**** 5 omkar ***");
																										imageCompressionType="JPEG";
																										ViewFormat="JPEG";
																										//PrivateKey privateKey=new CtsSecurity(con).getPrivateKey();
																										////System.out.println("**** 5 **** ");
																										Signature dsa = Signature.getInstance("SHA256withRSA", "SunRsaSign");
																										////System.out.println("**** 6 **** ");
																										dsa.initSign(privateKey);
																										////System.out.println("**** 7 **** ");
																										dsa.update(imageBytes, 0, imageBytes.length);
																										////System.out.println("**** 8 **** ");
																										dsaByte=dsa.sign();
																										////System.out.println("**** 9 **** ");
																										int dsa_offset=_offset;
																										int dsa_length=dsaByte.length;
																										int imageBytes_offset=_offset+dsaByte.length;
																										int imageBytes_length=imageBytes.length;
																										_offset=_offset+dsaByte.length+imageBytes.length;
																										//write digital sign and image byte to .img file
																										cibf_fos.write(dsaByte);
																										cibf_fos.write(imageBytes);

																							}//6
																					 }//5
																			/////
																	  }//4
														}//3
														imageCountCondition+=3;
											}//2
											cibf_fos.close();
									}//1
									else
									{//1
											System.out.println("wrong no of files");
									}//1
				}//try
				catch(Exception e)
				{//catch
					System.out.println("Exception e"+e);
				}//catch
		}//genImgFile

		public static String fileViewIndicator(String fileName)
				{//fileViewIndicator
						//System.out.println("*********** fileViewIndicator *********");
						String view="";
						//System.out.println("File Name:::"+fileName);
						try
						{
								//f00000.jpg,f0000G.tif,r0000.jpg
								String str=fileName;
								String str1=fileName.substring(fileName.lastIndexOf(".")-1,fileName.lastIndexOf("."));
								//System.out.println("str:::"+str);
								if(str.contains("f")&&str1.equalsIgnoreCase("G"))
								{
									//view="Front BW";
									view="Front Gray";
								}
								else if(str.contains("r"))
								{
									//view="Front Gray";
									view="Back BW";
								}
								else
								{
									view="Front BW";
								}
						}catch(Exception e)
						{
							//System.out.println("Exception in fileViewIndicator:::"+e);
							view="FAIL#";
						}
						//System.out.println("***********END  fileViewIndicator *********");
						return view;
		}//fileViewIndicator
}//XMLMarge