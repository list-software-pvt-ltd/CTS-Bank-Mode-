package cts;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;
import java.security.PrivateKey;
import java.security.Signature;
import java.sql.Connection;
import java.util.ArrayList;

import javax.imageio.ImageIO;

public class ImageToByteConverter {
	String imageCompressionType;
	private ArrayList<Item> itemBeanAl;
	private PrivateKey privateKey;

	public ImageToByteConverter() {
	}

	public ArrayList<Item> getItemList() {
		return itemBeanAl;
	}

	public void setPrivateKey(PrivateKey privateKey) {
		this.privateKey = privateKey;
	}

	public void setItemList(ArrayList<Item> itemBeanAl) {
		this.itemBeanAl = itemBeanAl;
	}

	@SuppressWarnings("resource")
	public String convertImageToByte(String parentBranch, String branchFolder, String cibfFilepath,
			int fileSize, String CIBF_fileName, String fileNames[],Connection con) {// convertImage
		String isExistedImageStatus = " ";
		String ViewSideIndicator = "";
		ItemInformation _itemInfoBean = null;
		ImageBean _imageBean = null;
		MicrDataInformation _micrBean = null;
		Item itemBean = null;
		AddendATag _addendATagBean = null;

		ArrayList<ItemInformation> _itemInfoBeanAl = new ArrayList<ItemInformation>();
		ArrayList<ImageBean> _imageBeanAl = null;
		ArrayList<MicrDataInformation> _micrBeanAl = new ArrayList<MicrDataInformation>();
		ArrayList<AddendATag> _addendATagBeanAl = new ArrayList<AddendATag>();

		ByteArrayOutputStream baos = null;

		
		String reStr = "";
		String ViewFormat = "";
		byte[] imageBytes = null;
		byte[] dsaByte = null;

		//String path = pathForImgAndXML + CIBF_fileName;
		// System.out.println("path"+path);

		int noOffiles = fileNames.length;
		int noOfItems = 0;
		int imageCount = 0, imageCountCondition = 3;
		// int _offset=0;
		int _offset = fileSize;
		FileOutputStream cibf_fos = null;
		String tempFileName="";
		try {// try
			String ifsc = Configuration.getIFSCCode(branchFolder);
			 System.out.println("====in convertbytes===="+cibfFilepath+CIBF_fileName);
			cibf_fos = new FileOutputStream(cibfFilepath+CIBF_fileName, true);
			
			if (noOffiles % 3 == 0) {// 1
				noOfItems = noOffiles / 3;
				
				System.out.println("Before CreateMicrObjects:");
				MicrDataInformation[] mircInfo = Configuration.CreateMicrObjects(fileNames, branchFolder, privateKey,con);
				if (Configuration.signatureStatus.equals("SUCCESS")) {// 1.0
					if (mircInfo != null) {// 1.1
						imageCount = 0;
						for (int itemCount = 0; itemCount < noOfItems; itemCount++) {// 2
						String signatureLength = mircInfo[itemCount].getSignatureLength();
							//String brn = branchFolder;// branchFolder.substring(0,branchFolder.indexOf("/"));
							
							_itemInfoBean = new ItemInformation(
									mircInfo[itemCount].getItemSeqNumber(),
									mircInfo[itemCount].getChqNo(),
									mircInfo[itemCount].getClearingType(),
									mircInfo[itemCount].getOlbc(),
									mircInfo[itemCount].getBranchCode());
							mircInfo[itemCount]
									.setSignatureLength(signatureLength);
							_micrBean = mircInfo[itemCount];// new
							_addendATagBean = new AddendATag();
							_addendATagBean.setIFSC(ifsc);
							_imageBeanAl = new ArrayList<ImageBean>();
							String imageFilePath = cibfFilepath
									+ parentBranch
									+ "/ClearingOutward/Images/";
							Configuration.writeLog("\nimageFilePath="+imageFilePath);
							for (; imageCount < imageCountCondition; imageCount++)// now
							{// 3
								String imageFileName = fileNames[imageCount];
								tempFileName=imageFileName;
								File f = new File(imageFilePath + imageFileName);
								if (f.isFile()) {// 4
													// System.out.println("*************3.1***************");
									baos = new ByteArrayOutputStream(
											(int) f.length());
									// decide the view of file
									ViewSideIndicator = fileViewIndicator(imageFileName);
									if (!ViewSideIndicator
											.equalsIgnoreCase("FAIL#")) {// 5
									ViewFormat = imageFileName.substring(
												imageFileName.indexOf(".") + 1,
												imageFileName.length());
										// imageBytes=null;
										if (ViewFormat.equalsIgnoreCase("tif")) {// 6
											FileInputStream in = new FileInputStream(f);
											FileChannel ch = in.getChannel();
											ByteBuffer bu = ByteBuffer
													.allocate((int) ch.size());
											ch.read(bu);
											//ch.close();//DSP
											byte[] arr = bu.array();
											imageBytes = arr;
											imageCompressionType = "G4";
											ViewFormat = "TIFF";
										}// 6
										else 
										{// 6
											/*BufferedImage img = ImageIO
													.read(new File(
															imageFilePath,
															imageFileName));
											ImageIO.write(img, ViewFormat, baos);
											baos.flush();*/
											FileInputStream fis=new FileInputStream(f);
											byte bt[]=new byte[(int)f.length()];
											fis.read(bt);
											fis.close();
											imageBytes = bt;//baos.toByteArray();
											imageCompressionType = "JPEG";
											ViewFormat = "JFIF";
										}// 6
										if (privateKey == null)// &&
																// Configuration.getConfValByNm("CFG_SCANNER").equalsIgnoreCase("PANINI"))
										{
											throw new PrivateKeyNotFoundException(
													"Private Key Not Found for certificate.");
										}
										// if(Configuration.getConfValByNm("CFG_SCANNER").equalsIgnoreCase("PANINI"))
										{
											Signature dsa = Signature
													.getInstance("SHA256withRSA");
											// System.out.println("**** 6 **** ");
											dsa.initSign(privateKey);
											dsa.update(imageBytes);
											dsaByte = dsa.sign();
										}
										// else
										// dsaByte = imageBytes;
										// System.out.println("**** 7 **** ");
										// System.out.println("**** 9 **** ");
										int dsa_offset = _offset;

										int dsa_length = 0;
										// if(Configuration.getConfValByNm("CFG_SCANNER").equalsIgnoreCase("PANINI"))
										{
											dsa_length = dsaByte.length;
										}
										
										int imageBytes_offset = _offset
												+ dsa_length;// dsaByte.length;
										int imageBytes_length = imageBytes.length;
										_offset = _offset + dsa_length
												+ imageBytes.length;

										_imageBean = new ImageBean(
												imageFileName,
												CIBF_fileName,
												Integer.toString(imageBytes_offset),
												Integer.toString(imageBytes_length),
												Integer.toString(dsa_offset),
												Integer.toString(dsa_length),
												"SHA256withRSA", Integer
														.toString(2048),
												ViewSideIndicator, ViewFormat,
												imageCompressionType);
										_imageBeanAl.add(_imageBean);
										cibf_fos.write(dsaByte);
										cibf_fos.write(imageBytes);
										cibf_fos.flush();
										// System.out.println("**** 12 **** ");
									}// 5
									else {// 5
										System.out
												.println("\n\n\n\nFile Name reading exception");
										throw new PrivateKeyNotFoundException(
												"Private Key Not Found for certificate .");
									}// 5
								}// 4
								else {// 4
										// System.out.println("\n\n\n\n"+imageFileName+"Not a file");
									isExistedImageStatus = "NotExist$"+imageFileName+"$";
									break;
								}// 4
							}// 3 //end for(
								// ;imageCount<imageCountCondition;imageCount++)

							if (isExistedImageStatus
									.contains("NotExist")) {// 11
								reStr = "ImageFileNotFound$"+isExistedImageStatus.split("$")[1]+"!@!";
								System.out
										.println("\nOmkar Not Added in item bean");
								return reStr;
							}// 11
							else {// 11
								imageCountCondition += 3;//
								_micrBeanAl.add(_micrBean);
								_itemInfoBeanAl.add(_itemInfoBean);
								_addendATagBeanAl.add(_addendATagBean);
								itemBean = new Item(_itemInfoBeanAl,
										_micrBeanAl, _imageBeanAl,
										_addendATagBeanAl);
								reStr ="SUCCESS";
							}// 11
						}// 2
						cibf_fos.flush();
						cibf_fos.close();
						itemBeanAl.add(itemBean);
					}// 1.1
					else {// 1.1
						System.out
								.println("FAIL_EXCEPTION_IN_MicrDataInformation");
						// pathForImgAndXML="FAIL_EXCEPTION_IN_MicrDataInformation!@!";
					}// 1.1
				}// 1.0
				else {// 1.0
						System.out.println("\n\n\n\nFile Name reading exception");
						throw new PrivateKeyNotFoundException(
							"Private Key Not Found for certificate .");
						
				}// 1.0
			}// 1
		}// try
		catch (PrivateKeyNotFoundException e) {// catch
			System.out
					.println("\nPrivateKeyNotFoundException in ImageToByte:\n"
							+ e);
			e.printStackTrace();
			reStr = e.getMessage();
		}// catch
		catch (FileNotFoundException e) {// catch2
			System.out.println("\nFileNotFoundException in ImageToByte:\n" + e);
			e.printStackTrace();
			reStr = "FAIL$"+tempFileName+"$!@!";
		} catch (IOException e) {// catch2
			System.out.println("\nIOException in ImageToByte:\n" + e);
			e.printStackTrace();
			//reStr = "FAIL!@!";
			reStr = "FAIL$"+tempFileName+"$!@!";
		}// catch2
		catch (Exception e) 
		{// catch2
			System.out
					.println("\nException in ImageToByteConverter convertImageToByte():\n"
							+ e);
			e.printStackTrace();
			//reStr = "FAIL!@!";
			reStr = "FAIL$"+tempFileName+"$!@!";
		}// catch2
		finally {// catch2
			try {
				baos.close();
				cibf_fos.flush();
				cibf_fos.close();
			} catch (Exception e) {
			}
		}// catch2

		System.out.println("******* Exit from ImageToByteConverter ********::"
				+ reStr);
		return reStr;
	}// convertImage

	public String convertImageToByte_HDFC(String branchFolder,
			String cibfFilepath, int fileSize, String CIBF_fileName,
			String fileNames[],Connection con) {// convertImage_HDFC
		String isExistedImageStatus = " ";
		System.out
				.println("*************Inside convertImageToByte_HDFC***************");
		System.out.println("*************branchFolder***************"
				+ branchFolder);
		System.out.println("*************cibfFilepath***************"
				+ cibfFilepath);
		System.out.println("*************fileSize***************" + fileSize);
		System.out.println("*************CIBF_fileName***************"
				+ CIBF_fileName);
		String imageFileNames = "";
		String ViewSideIndicator = "";
		ItemInformation _itemInfoBean = null;
		ImageBean _imageBean = null;
		MicrDataInformation _micrBean = null;
		Item itemBean = null;
		AddendATag _addendATagBean = null;

		ArrayList<ItemInformation> _itemInfoBeanAl = new ArrayList<ItemInformation>();
		ArrayList<ImageBean> _imageBeanAl = null;
		ArrayList<MicrDataInformation> _micrBeanAl = new ArrayList<MicrDataInformation>();
		ArrayList<AddendATag> _addendATagBeanAl = new ArrayList<AddendATag>();

		ByteArrayOutputStream baos = null;

		String imageFilePath = Configuration
				.getConfValByNm("CFG_uploadpath_to_CHI",con)
				+ branchFolder
				+ "/ClearingOutward/Images/";

		String pathForImgAndXML = Configuration
				.getConfValByNm("CFG_uploadpath_to_CHI",con)
				+ branchFolder
				+ "/ClearingOutward/";

		String ViewFormat = "";
		byte[] imageBytes = null;
		byte[] dsaByte = null;

		String path = pathForImgAndXML + CIBF_fileName;
		System.out.println("path" + path);

		int noOffiles = fileNames.length;
		int noOfItems = 0;
		int imageCount = 0, imageCountCondition = 3;
		// int _offset=0;
		int _offset = fileSize;
		// Display File Names
		String tempFileName="";
		FileOutputStream cibf_fos = null;
		try {// try 
			
			cibf_fos = new FileOutputStream(cibfFilepath+CIBF_fileName,true);//, true---DSP
			if (noOffiles % 3 == 0) {// 1
				noOfItems = noOffiles / 3;
				System.out.println("noOfItems:" + noOfItems);
				// System.out.println("noOfItems:"+noOfItems);
				MicrDataInformation[] mircInfo = Configuration
						.CreateMicrObjects(fileNames, branchFolder, privateKey,con);
				if (Configuration.signatureStatus.equals("SUCCESS")) {// 1.0
					if (mircInfo != null) {// 1.1
						imageCount = 0;
						for (int itemCount = 0; itemCount < noOfItems; itemCount++) {// 2
							System.out.println("itemCount::" + itemCount);
							// setSerialNumber

							String signatureLength = mircInfo[itemCount]
									.getSignatureLength();

							String brn = branchFolder;// branchFolder.substring(0,branchFolder.indexOf("/"));

							String ifsc = Configuration.getIFSCCode(brn);

							_itemInfoBean = new ItemInformation(
									mircInfo[itemCount].getItemSeqNumber(),
									mircInfo[itemCount].getChqNo(),
									mircInfo[itemCount].getClearingType(),
									mircInfo[itemCount].getOlbc(),
									mircInfo[itemCount].getBranchCode());
							// System.out.println("*************1.4***************");
							mircInfo[itemCount]
									.setSignatureLength(signatureLength);

							_micrBean = mircInfo[itemCount];// new
															// MicrDataInformation(ourBnkCode,chqNo,bankNo,tranNo,amount,accNo,signatureData,DepositorAcct,BOFDBusDate,BOFDRoutNo);
							// _micrBean.setSignatureLength(signatureLength);
							// System.out.println("*************1.6***************");
							_addendATagBean = new AddendATag();
							// System.out.println("*************1.7***************");
							_addendATagBean.setIFSC(ifsc);
							// System.out.println("*************1.8***************");
							_imageBeanAl = new ArrayList<ImageBean>();
							// System.out.println("*************2***************");
							// image loop
							for (; imageCount < imageCountCondition; imageCount++)// now
																					// this
																					// loop
																					// is
																					// not
																					// imp
							{// 3
								// System.out.println("*************3***************");
								// System.out.println("imageCount:::"+imageCount);
								String imageFileName = fileNames[imageCount];
								tempFileName=imageFileName;
								// System.out.println("imageFileName:::"+imageFileName);
								File f = new File(imageFilePath + imageFileName);
								if (f.isFile()) {// 4
													// System.out.println("*************3.1***************");
									baos = new ByteArrayOutputStream(
											(int) f.length());
									// decide the view of file
									ViewSideIndicator = fileViewIndicator_HDFC(imageFileName);

									if (!ViewSideIndicator
											.equalsIgnoreCase("FAIL#")) {// 5
										ViewFormat = imageFileName.substring(
												imageFileName.indexOf(".") + 1,
												imageFileName.length());
										// imageBytes=null;
										if (ViewFormat.equalsIgnoreCase("tif")) {// 6
											FileInputStream in = new FileInputStream(f);
											FileChannel ch = in.getChannel();
											ByteBuffer bu = ByteBuffer
													.allocate((int) ch.size());
											ch.read(bu);
											byte[] arr = bu.array();
											imageBytes = arr;
											imageCompressionType = "G4";
											ViewFormat = "TIFF";
										}// 6
										else {// 6
											BufferedImage img = ImageIO
													.read(new File(
															imageFilePath,
															imageFileName));

											ImageIO.write(img, ViewFormat, baos);

											baos.flush();

											imageBytes = baos.toByteArray();

											imageCompressionType = "JPEG";
											ViewFormat = "JFIF";
										}// 6

										if (privateKey == null) {
											throw new PrivateKeyNotFoundException(
													"Private Key Not Found for certificate.");
										}

										Signature dsa = Signature
												.getInstance("SHA1withRSA");
										// System.out.println("**** 6 **** ");
										dsa.initSign(privateKey);
										dsa.update(imageBytes);
										dsaByte = dsa.sign();
										// System.out.println("**** 7 **** ");

										// System.out.println("**** 9 **** ");
										int dsa_offset = _offset;
										int dsa_length = dsaByte.length;
										int imageBytes_offset = _offset;// +dsaByte.length;
										
										int imageBytes_length = imageBytes.length;
										System.out.println("**** 7 **** "+imageBytes_length);
										_offset = _offset + imageBytes.length;
										System.out.println("**** 8 **** "+_offset);
										// _offset=_offset+dsaByte.length+imageBytes.length;

										_imageBean = new ImageBean(
												imageFileName,
												CIBF_fileName,
												Integer.toString(imageBytes_offset),
												Integer.toString(imageBytes_length),
												Integer.toString(dsa_offset),
												Integer.toString(dsa_length),
												"SHA256withRSA", Integer
														.toString(2048),
												ViewSideIndicator, ViewFormat,
												imageCompressionType);
										_imageBeanAl.add(_imageBean);

										// cibf_fos.write(dsaByte);
										cibf_fos.write(imageBytes);
										System.out
												.print("******imageBytes******\n"
														+ imageBytes);
										// System.out.println("**** 12 **** ");
									}// 5
									else {// 5
										System.out
												.println("\n\n\n\nFile Name reading exception");
										throw new PrivateKeyNotFoundException(
												"Private Key Not Found for certificate .");
									}// 5
								}// 4
								else {// 4
									System.out.println("\n\n\n\n"
											+ imageFileName + "Not a file");
									isExistedImageStatus = "NotExist$"+imageFileName+"$";;
									break;
								}// 4
							}// 3 //end for(
								// ;imageCount<imageCountCondition;imageCount++)

							if (isExistedImageStatus
									.contains("NotExist")) {// 11
								pathForImgAndXML = "ImageFileNotFound$"+isExistedImageStatus.split("$")[1]+"!@!";
							
								System.out.println("\nOmkar Not Added in item bean");
								return pathForImgAndXML;
							}// 11
							else {// 11
								System.out.println("imageCountCondition:"
										+ imageCountCondition);
								imageCountCondition += 3;//
								System.out.println("imageCountCondition:"
										+ imageCountCondition);
								_micrBeanAl.add(_micrBean);
								_itemInfoBeanAl.add(_itemInfoBean);
								System.out.println("_itemInfoBean:"
										+ _itemInfoBean);
								_addendATagBeanAl.add(_addendATagBean);
								itemBean = new Item(_itemInfoBeanAl,
										_micrBeanAl, _imageBeanAl,
										_addendATagBeanAl);
							}// 11
						}// 2
						cibf_fos.flush();
						cibf_fos.close();
						System.out.println("itemBeanAl is added"
								+ itemBean.getItemInfoBeanAl());
						itemBeanAl.add(itemBean);
					}// 1.1
					else {// 1.1
						System.out
								.println("FAIL_EXCEPTION_IN_MicrDataInformation");
						// pathForImgAndXML="FAIL_EXCEPTION_IN_MicrDataInformation!@!";
					}// 1.1
				}// 1.0
				else {// 1.0
						// this else is for when fail to get private key for
						// micr string creation.
					System.out.println("\n\n\n\nFile Name reading exception");
					throw new PrivateKeyNotFoundException(
							"Private Key Not Found for certificate .");
				}// 1.0
			}// 1
			else {// 1
				System.out.println("selete proper cheque");
				// pathForImgAndXML="FAIL!@!";
			}// 1
				// END

		}// try
		catch (PrivateKeyNotFoundException e) {// catch
			System.out
					.println("\nPrivateKeyNotFoundException in ImageToByte:\n"
							+ e);
			e.printStackTrace();
			pathForImgAndXML = e.getMessage();
		}// catch
		catch (FileNotFoundException e) {// catch2
			System.out.println("\nFileNotFoundException in ImageToByte:\n" + e);
			e.printStackTrace();
			//pathForImgAndXML = "FAIL!@!";
			pathForImgAndXML = "FAIL$"+tempFileName+"$!@!";
		} catch (IOException e) {// catch2
			System.out.println("\nIOException in ImageToByte:\n" + e);
			e.printStackTrace();
			//pathForImgAndXML = "FAIL!@!";
			pathForImgAndXML = "FAIL$"+tempFileName+"$!@!";
		}// catch2
		catch (Exception e) {// catch2
			System.out
					.println("\nException in ImageToByteConverter convertImageToByte():\n"
							+ e);
			//pathForImgAndXML = "FAIL!@!";
			pathForImgAndXML = "FAIL$"+tempFileName+"$!@!";
		}// catch2
		finally {// catch2
			try {
				baos.close();
				cibf_fos.close();
			} catch (Exception e) 
			{
			}
		}// catch2
		System.out.println("******* Exit from ImageToByteConverter ********::"
				+ pathForImgAndXML);
		return pathForImgAndXML;
	}// convertImage_HDFC

	public static String fileViewIndicator(String fileName) {// fileViewIndicator
																// System.out.println("*********** fileViewIndicator *********");
		String view = "";
		// System.out.println("File Name:::"+fileName);
		try {
			// f00000.jpg,f0000G.tif,r0000.jpg
			String str = fileName;
			String str1 = fileName.substring(fileName.lastIndexOf(".") - 1,
					fileName.lastIndexOf("."));
			// System.out.println("str:::"+str);
			if (str.contains("F") && str1.equalsIgnoreCase("G")) {
				// view="Front BW";
				view = "Front Gray";
			} else if (str.contains("R")) {
				// view="Front Gray";
				view = "Back BW";
			} else {
				view = "Front BW";
			}
		} catch (Exception e) {
			// System.out.println("Exception in fileViewIndicator:::"+e);
			view = "FAIL#";
		}
		// System.out.println("***********END  fileViewIndicator *********");
		return view;
	}// fileViewIndicator

	public static String fileViewIndicator_HDFC(String fileName) {// fileViewIndicator_HDFC
																	// System.out.println("*********** fileViewIndicator_HDFC *********");
		String view = "";

		try {
			// f00000.jpg,f0000G.tif,r0000.jpg
			String str = fileName;
			String str1 = fileName.substring(fileName.lastIndexOf(".") - 1,
					fileName.lastIndexOf("."));
			// System.out.println("str:::"+str);
			if (str.contains("F") && str1.equalsIgnoreCase("G")) {
				// view="Front BW";
				view = "G";
			} else if (str.contains("R")) {
				// view="Front Gray";
				view = "B";
			} else {
				view = "F";
			}
		} catch (Exception e) {
			// System.out.println("Exception in fileViewIndicator_HDFC:::"+e);
			view = "FAIL#";
		}
		// System.out.println("***********END  fileViewIndicator_HDFC *********");
		return view;
	}// fileViewIndicator_HDFC

	/*public String convertImageToByteWriteCXF(String branchFolder, String cibfFilepath,
			int fileSize, String CIBF_fileName, String... fileNames) {// convertImage
		String isExistedImageStatus = " ";
		String ViewSideIndicator = "";
		ItemInformation _itemInfoBean = null;
		ImageBean _imageBean = null;
		MicrDataInformation _micrBean = null;
		Item itemBean = null;
		AddendATag _addendATagBean = null;

		ArrayList<ItemInformation> _itemInfoBeanAl = new ArrayList<ItemInformation>();
		ArrayList<ImageBean> _imageBeanAl = null;
		ArrayList<MicrDataInformation> _micrBeanAl = new ArrayList<MicrDataInformation>();
		ArrayList<AddendATag> _addendATagBeanAl = new ArrayList<AddendATag>();

		ByteArrayOutputStream baos = null;

		String imageFilePath = Configuration
				.getConfValByNm("CFG_uploadpath_to_CHI")
				+ branchFolder
				+ "/ClearingOutward/Images/";
		String pathForImgAndXML = Configuration
				.getConfValByNm("CFG_uploadpath_to_CHI")
				+ branchFolder
				+ "/ClearingOutward/";
		String ViewFormat = "";
		byte[] imageBytes = null;
		byte[] dsaByte = null;

		//String path = pathForImgAndXML + CIBF_fileName;
		// System.out.println("path"+path);

		int noOffiles = fileNames.length;
		int noOfItems = 0;
		int imageCount = 0, imageCountCondition = 3;
		// int _offset=0;
		int _offset = fileSize;
		FileOutputStream cibf_fos = null;
		try {// try

			cibf_fos = new FileOutputStream(cibfFilepath, true);
			if (noOffiles % 3 == 0) {// 1
				noOfItems = noOffiles / 3;
				// System.out.println("noOfItems:"+noOfItems);
				// System.out.println("noOfItems:"+noOfItems);
				MicrDataInformation[] mircInfo = Configuration
						.CreateMicrObjects(fileNames, branchFolder, privateKey);
				if (Configuration.signatureStatus.equals("SUCCESS")) {// 1.0
					if (mircInfo != null) {// 1.1
						imageCount = 0;
						for (int itemCount = 0; itemCount < noOfItems; itemCount++) {// 2
						String signatureLength = mircInfo[itemCount]
									.getSignatureLength();
							String brn = branchFolder;// branchFolder.substring(0,branchFolder.indexOf("/"));
							String ifsc = Configuration.getIFSCCode(brn);
							_itemInfoBean = new ItemInformation(
									mircInfo[itemCount].getItemSeqNumber(),
									mircInfo[itemCount].getChqNo(),
									mircInfo[itemCount].getClearingType(),
									mircInfo[itemCount].getOlbc());
							mircInfo[itemCount]
									.setSignatureLength(signatureLength);
							_micrBean = mircInfo[itemCount];// new
							_addendATagBean = new AddendATag();
							_addendATagBean.setIFSC(ifsc);
							_imageBeanAl = new ArrayList<ImageBean>();
							for (; imageCount < imageCountCondition; imageCount++)// now
							{// 3
								String imageFileName = fileNames[imageCount];
								File f = new File(imageFilePath + imageFileName);
								if (f.isFile()) {// 4
													// System.out.println("*************3.1***************");
									baos = new ByteArrayOutputStream(
											(int) f.length());
									// decide the view of file
									ViewSideIndicator = fileViewIndicator(imageFileName);
									if (!ViewSideIndicator
											.equalsIgnoreCase("FAIL#")) {// 5
									ViewFormat = imageFileName.substring(
												imageFileName.indexOf(".") + 1,
												imageFileName.length());
										// imageBytes=null;
										if (ViewFormat.equalsIgnoreCase("tif")) {// 6
											FileInputStream in = new FileInputStream(f);
											FileChannel ch = in.getChannel();
											ByteBuffer bu = ByteBuffer
													.allocate((int) ch.size());
											ch.read(bu);
											byte[] arr = bu.array();
											imageBytes = arr;
											imageCompressionType = "G4";
											ViewFormat = "TIFF";
										}// 6
										else 
										{// 6
											BufferedImage img = ImageIO
													.read(new File(
															imageFilePath,
															imageFileName));
											ImageIO.write(img, ViewFormat, baos);
											baos.flush();
											imageBytes = baos.toByteArray();
											imageCompressionType = "JPEG";
											ViewFormat = "JFIF";
										}// 6
										if (privateKey == null)// &&
																// Configuration.getConfValByNm("CFG_SCANNER").equalsIgnoreCase("PANINI"))
										{
											throw new PrivateKeyNotFoundException(
													"Private Key Not Found for certificate.");
										}
										// if(Configuration.getConfValByNm("CFG_SCANNER").equalsIgnoreCase("PANINI"))
										{
											Signature dsa = Signature
													.getInstance("SHA256withRSA");
											// System.out.println("**** 6 **** ");
											dsa.initSign(privateKey);
											dsa.update(imageBytes);
											dsaByte = dsa.sign();
										}
										// else
										// dsaByte = imageBytes;
										// System.out.println("**** 7 **** ");

										// System.out.println("**** 9 **** ");
										int dsa_offset = _offset;

										int dsa_length = 0;
										// if(Configuration.getConfValByNm("CFG_SCANNER").equalsIgnoreCase("PANINI"))
										{
											dsa_length = dsaByte.length;
										}
										
										int imageBytes_offset = _offset
												+ dsa_length;// dsaByte.length;
										int imageBytes_length = imageBytes.length;
										_offset = _offset + dsa_length
												+ imageBytes.length;

										_imageBean = new ImageBean(
												imageFileName,
												CIBF_fileName,
												Integer.toString(imageBytes_offset),
												Integer.toString(imageBytes_length),
												Integer.toString(dsa_offset),
												Integer.toString(dsa_length),
												"SHA256withRSA", Integer
														.toString(2048),
												ViewSideIndicator, ViewFormat,
												imageCompressionType);
										_imageBeanAl.add(_imageBean);
										cibf_fos.write(dsaByte);
										cibf_fos.write(imageBytes);
										// System.out.println("**** 12 **** ");
									}// 5
									else {// 5
										System.out
												.println("\n\n\n\nFile Name reading exception");
										throw new PrivateKeyNotFoundException(
												"Private Key Not Found for certificate .");
									}// 5
								}// 4
								else {// 4
										// System.out.println("\n\n\n\n"+imageFileName+"Not a file");
									isExistedImageStatus = "NotExist";
									break;
								}// 4
							}// 3 //end for(
								// ;imageCount<imageCountCondition;imageCount++)

							if (isExistedImageStatus
									.equalsIgnoreCase("NotExist")) {// 11
								pathForImgAndXML = "ImageFileNotFound!@!";
								System.out
										.println("\nOmkar Not Added in item bean");
							}// 11
							else {// 11
								imageCountCondition += 3;//
								_micrBeanAl.add(_micrBean);
								_itemInfoBeanAl.add(_itemInfoBean);
								_addendATagBeanAl.add(_addendATagBean);
								itemBean = new Item(_itemInfoBeanAl,
										_micrBeanAl, _imageBeanAl,
										_addendATagBeanAl);
							}// 11
						}// 2
						cibf_fos.close();
						itemBeanAl.add(itemBean);
					}// 1.1
					else {// 1.1
						System.out
								.println("FAIL_EXCEPTION_IN_MicrDataInformation");
						// pathForImgAndXML="FAIL_EXCEPTION_IN_MicrDataInformation!@!";
					}// 1.1
				}// 1.0
				else {// 1.0
						System.out.println("\n\n\n\nFile Name reading exception");
						throw new PrivateKeyNotFoundException(
							"Private Key Not Found for certificate .");
				}// 1.0
			}// 1
		}// try
		catch (PrivateKeyNotFoundException e) {// catch
			System.out
					.println("\nPrivateKeyNotFoundException in ImageToByte:\n"
							+ e);
			e.printStackTrace();
			pathForImgAndXML = e.getMessage();
		}// catch
		catch (FileNotFoundException e) {// catch2
			System.out.println("\nFileNotFoundException in ImageToByte:\n" + e);
			e.printStackTrace();
			pathForImgAndXML = "FAIL!@!";
		} catch (IOException e) {// catch2
			System.out.println("\nIOException in ImageToByte:\n" + e);
			e.printStackTrace();
			pathForImgAndXML = "FAIL!@!";
		}// catch2
		catch (Exception e) {// catch2
			System.out
					.println("\nException in ImageToByteConverter convertImageToByte():\n"
							+ e);
			pathForImgAndXML = "FAIL!@!";
		}// catch2
		finally {// catch2
			try {
				baos.close();
				cibf_fos.close();
			} catch (Exception e) {
			}
		}// catch2

		System.out.println("******* Exit from ImageToByteConverter ********::"
				+ pathForImgAndXML);
		return pathForImgAndXML;
	}// convertImage
*/
}// end ImageToByteConverter