package cts;
import java.io.File;
import java.io.IOException;
import java.sql.Connection;

import org.apache.commons.io.FileUtils;

public class GetBackup
{
		public static String err_status="SUCCESS";

		public static String doBackup(String folder,Connection con)
		{//1
				String flg="ERROR";
				int count=0;
				String srcPathUpload=Configuration.getConfValByNm("CFG_uploadpath_to_CHI",con);
				System.out.println("111"+srcPathUpload);
				String srcPathUpload1= srcPathUpload.toString().replace("\\", "/");
				srcPathUpload=srcPathUpload.substring(0,srcPathUpload1.lastIndexOf("/"));
				String srcPathDownload=Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI",con);
				System.out.println("222"+srcPathDownload);
				String srcPathDownload1= srcPathDownload.toString().replace("\\", "/");
				srcPathDownload=srcPathDownload.substring(0,srcPathDownload1.lastIndexOf("/"));
				String desPath=Configuration.getConfValByNm("CFG_ARCUPLOADPATH_TO_CHI",con)+folder;
				File srcFolder=null;
				File desFolder=null;
				try
				{
							//move uploadpath files for archive ........
							System.out.println("\n\tsrcPathUpload:"+srcPathUpload);
							srcFolder = new File(srcPathUpload);
							System.out.println("\n\tdesPath:"+desPath);
							desFolder=new File(desPath+"/uploadpath_to_CHI");
							desFolder.mkdirs();
							{
								//FileUtils.moveDirectory(srcFolder,desFolder);
								
								File list[]=srcFolder.listFiles();
								for (int k=0;k<list.length;k++)
								{
									if(list[k].isFile())//indexOf(".")>-1 && !list[k].toLowerCase().contains("autorun"))
									{
										//System.out.println("****Emtech File"+list[k].getName());
										try {
										FileUtils.moveFile(new File(srcFolder+"/"+list[k].getName()),new File(desFolder+"/"+list[k].getName()));
										}
										catch(IOException e)
										{
											e.printStackTrace();
											
											try
											{//inner try
												System.out.println("\n\tIOException in GetBackup.doBackup()::>>>"+e);
												//String to_day=(new  java.util.Date()).toString().replaceAll("/","_").replace("+","_").replace(" ","_").replace(":","_");
												if(e.getMessage().contains("Destination") && e.getMessage().contains("already exists"))
												{
													System.out.println("\n\tdesPath:"+desPath);
													desFolder=new File(desPath+"/uploadpath_to_CHI");
													System.out.println("\n\tsrcPathUpload:"+srcPathUpload);
													srcFolder = new File(srcPathUpload);
													System.out.println("\n\tdesPath:"+desPath);
													try {
													FileUtils.moveDirectory(srcFolder,desFolder);
													}
													catch(Exception ex)
													{
														ex.printStackTrace();
														System.out.println("\n\tException in GetBackup.doBackup() moveDirectory()::>>>"+ex);
														flg="ERROR";
													}
													new File(srcPathUpload).mkdirs();
													///////////////////////
													System.out.println("\n\tsrcPathDownload:"+srcPathDownload);
													srcFolder = new File(srcPathDownload);
													System.out.println("\n\tdesPath:"+desPath);
													desFolder=new File(desPath+"/downloadpath_from_CHI");
													try {
													FileUtils.moveDirectory(srcFolder,desFolder);
													}
													catch(Exception ex)
													{
														ex.printStackTrace();
														System.out.println("\n\tException in GetBackup.doBackup() moveDirectory()::>>>"+ex);
														flg="ERROR";
													}
													new File(srcPathDownload).mkdirs();

													
													 System.out.println("----- inside database backup -----");
													 DatabaseBackup.runCommand(folder);
													 Thread.sleep(10000);
													System.out.println("----- inside database backup exit -----");
														makeDirStructure(srcPathDownload,srcPathUpload);
														flg="SUCCESS";
												}//if-exception
												else {
													count++;
												}
												
										    }//inner try
										    catch(Exception ie){}
										}
									}
									else
									{
										try {
											//System.out.println("@@@@@Emtech File"+list[k].getName());
										FileUtils.moveDirectory(new File(srcFolder+"/"+list[k].getName()),new File(desFolder+"/"+list[k].getName()));
										}
										catch(IOException e)
										{
											e.printStackTrace();
											try
											{//inner try
												System.out.println("\n\tIOException in GetBackup.doBackup()::>>>"+e);
												//String to_day=(new  java.util.Date()).toString().replaceAll("/","_").replace("+","_").replace(" ","_").replace(":","_");
												
												if(e.getMessage().contains("Destination") && e.getMessage().contains("already exists"))
												{
													System.out.println("\n\tdesPath:"+desPath);
													desFolder=new File(desPath+"/uploadpath_to_CHI");
													System.out.println("\n\tsrcPathUpload:"+srcPathUpload);
													srcFolder = new File(srcPathUpload);

													try {
													FileUtils.moveDirectory(srcFolder,desFolder);
													}
													catch(Exception ex)
													{
														ex.printStackTrace();
														System.out.println("\n\tException in GetBackup.doBackup() moveDirectory()::>>>"+ex);
														flg="ERROR";
													}
													new File(srcPathUpload).mkdirs();
													///////////////////////
													System.out.println("\n\tsrcPathDownload:"+srcPathDownload);
													srcFolder = new File(srcPathDownload);
													System.out.println("\n\tdesPath:"+desPath);
													desFolder=new File(desPath+"/downloadpath_from_CHI");
													try {
													FileUtils.moveDirectory(srcFolder,desFolder);
													}
													catch(Exception ex)
													{
														ex.printStackTrace();
														System.out.println("\n\tException in GetBackup.doBackup() moveDirectory()::>>>"+ex);
														flg="ERROR";
													}
													new File(srcPathDownload).mkdirs();

													//take db dump
													 System.out.println("----- inside database backup -----");
													 DatabaseBackup.runCommand(folder);
													 Thread.sleep(10000);
													System.out.println("----- inside database backup exit -----");
														makeDirStructure(srcPathDownload,srcPathUpload);
														flg="SUCCESS";
												}//if-exception
												else {
													count++;
												}
												
										    }//inner try
										    catch(Exception ie){}
										}
									}
								}
							}
							new File(srcPathUpload).mkdirs();
							
							
							///////////////////////
							
							
							System.out.println("\n\tsrcPathDownload:"+srcPathDownload);
							srcFolder = new File(srcPathDownload);
							System.out.println("\n\tdesPath:"+desPath);
							desFolder=new File(desPath+"/downloadpath_from_CHI/");
							
							{
								
								File list[]=srcFolder.listFiles();
								for (int k=0;k<list.length;k++)
								{
									if(list[k].isFile())//indexOf(".")>-1 && !list[k].toLowerCase().contains("autorun"))
									{
										try {
										FileUtils.moveFile(new File(srcFolder+"/"+list[k].getName()),new File(desFolder+"/"+list[k].getName()));
										}
										catch(IOException e)
										{
											e.printStackTrace();
											try
											{//inner try
												System.out.println("\n\tIOException in GetBackup.doBackup()::>>>"+e);
												//String to_day=(new  java.util.Date()).toString().replaceAll("/","_").replace("+","_").replace(" ","_").replace(":","_");
												if(e.getMessage().contains("Destination") && e.getMessage().contains("already exists"))
												{//if-exception
													//desPath=desPath+"_"+new  java.util.Date().getTime()+"_"+System.currentTimeMillis();
													System.out.println("\n\tdesPath:"+desPath);
													desFolder=new File(desPath+"/uploadpath_to_CHI");
													//err_status="Backup Is already Taken";
													//move uploadpath files for archive ........
													System.out.println("\n\tsrcPathUpload:"+srcPathUpload);
													srcFolder = new File(srcPathUpload);
													//System.out.println("\n\tdesPath:"+desPath);
													//desFolder=new File(desPath+"/uploadpath_to_CHI");
													try {
													FileUtils.moveDirectory(srcFolder,desFolder);
													}
													catch(Exception ex)
													{
														ex.printStackTrace();
														System.out.println("\n\tException in GetBackup.doBackup() moveDirectory()::>>>"+ex);
														flg="ERROR";
													}
													new File(srcPathUpload).mkdirs();
													///////////////////////
													System.out.println("\n\tsrcPathDownload:"+srcPathDownload);
													srcFolder = new File(srcPathDownload);
													System.out.println("\n\tdesPath:"+desPath);
													desFolder=new File(desPath+"/downloadpath_from_CHI");
													try {
													FileUtils.moveDirectory(srcFolder,desFolder);
													}
													catch(Exception ex)
													{
														ex.printStackTrace();
														System.out.println("\n\tException in GetBackup.doBackup() moveDirectory()::>>>"+ex);
														flg="ERROR";
													}
													new File(srcPathDownload).mkdirs();

													//take db dump
													 System.out.println("----- inside database backup -----");
													 DatabaseBackup.runCommand(folder);
													 Thread.sleep(10000);
													System.out.println("----- inside database backup exit -----");
														makeDirStructure(srcPathDownload,srcPathUpload);
														flg="SUCCESS";
												}//if-exception
												else {
													count++;
												}
												/*
												 * else { System.out.println("----- inside else catch-----");
												 * FileUtils.copyFile(new File(srcFolder+"/"+list[k].getName()),new
												 * File(desFolder+"/"+list[k].getName())); FileUtils.forceDelete(new
												 * File(srcFolder+"/"+list[k].getName())); }
												 */
										    }//inner try
										    catch(Exception ie){}
										}
									}
									else	
									{
										try {
											FileUtils.moveDirectory(new File(srcFolder+"/"+list[k].getName()),new File(desFolder+"/"+list[k].getName()));
										}
										catch(IOException e)
										{
											e.printStackTrace();
											
											try
											{//inner try
											
												System.out.println("\n\tIOException in GetBackup.doBackup()::>>>"+e);
												//String to_day=(new  java.util.Date()).toString().replaceAll("/","_").replace("+","_").replace(" ","_").replace(":","_");
												if(e.getMessage().contains("Destination") && e.getMessage().contains("already exists"))
												{//if-exception
													//desPath=desPath+"_"+new  java.util.Date().getTime()+"_"+System.currentTimeMillis();
													System.out.println("\n\tdesPath:"+desPath);
													desFolder=new File(desPath+"/uploadpath_to_CHI");
													//err_status="Backup Is already Taken";
													//move uploadpath files for archive ........
													System.out.println("\n\tsrcPathUpload:"+srcPathUpload);
													srcFolder = new File(srcPathUpload);
													//System.out.println("\n\tdesPath:"+desPath);
													//desFolder=new File(desPath+"/uploadpath_to_CHI");
													try {
													FileUtils.moveDirectory(srcFolder,desFolder);
													}
													catch(Exception ex)
													{
														ex.printStackTrace();
														System.out.println("\n\tException in GetBackup.doBackup() moveDirectory()::>>>"+ex);
														flg="ERROR";
													}
													new File(srcPathUpload).mkdirs();
													///////////////////////
													System.out.println("\n\tsrcPathDownload:"+srcPathDownload);
													srcFolder = new File(srcPathDownload);
													System.out.println("\n\tdesPath:"+desPath);
													desFolder=new File(desPath+"/downloadpath_from_CHI");
													try {
													FileUtils.moveDirectory(srcFolder,desFolder);
													}
													catch(Exception ex)
													{
														ex.printStackTrace();
														System.out.println("\n\tException in GetBackup.doBackup() moveDirectory()::>>>"+ex);
														flg="ERROR";
													}
													new File(srcPathDownload).mkdirs();

													//take db dump
													 System.out.println("----- inside database backup -----");
													 DatabaseBackup.runCommand(folder);
													 Thread.sleep(10000);
													System.out.println("----- inside database backup exit -----");
														makeDirStructure(srcPathDownload,srcPathUpload);
														flg="SUCCESS";
												}//if-exception
												else {
													count++;
												}
												
										    }//inner try
										    catch(Exception ie){}
										}
									}
								}
							}
							new File(srcPathDownload).mkdirs();

							//take db dump
							 System.out.println("----- inside database backup -----");
							 DatabaseBackup.runCommand(folder);
							 Thread.sleep(10000);
		 					System.out.println("----- inside database backup exit -----");

		 					makeDirStructure(srcPathDownload,srcPathUpload);
							flg="SUCCESS";
				}				
				catch(Exception e)
				{//exception
					e.printStackTrace();
							System.out.println("\n\tException in GetBackup.doBackup()::>>>"+e);
							flg="ERROR";
				}//exception
				System.out.println("\n\t---- exit from --- doBackup"+flg);
				return flg+"~"+count;
				
		}//1

		public static void makeDirStructure(String CFG_downloadpath_from_CHI,String CFG_uploadpath_to_CHI)
		{//2
				try
				{
					//this function for create dir structure after taking backup ofr previous day ..
					//NOTE: we not make dir for clearing outward b'coz at time of clearing outward we make dir structure for that branch
						new File(CFG_downloadpath_from_CHI+"/ClearingInward/").mkdirs();
						new File(CFG_downloadpath_from_CHI+"/ReturnInward/").mkdirs();;
						new File(CFG_downloadpath_from_CHI+"/ResponseFiles/").mkdirs();;
						new File(CFG_downloadpath_from_CHI+"/Oack/").mkdirs();;
						new File(CFG_downloadpath_from_CHI+"/ExtensionFiles/").mkdirs();;
						new File(CFG_uploadpath_to_CHI+"/ReturnOutward/").mkdirs();;;
				}catch(Exception e)
				{
						System.out.println("\n\tException in GetBakup.makeDirStructure():"+e);
				}
		}//2
}//GetBackup