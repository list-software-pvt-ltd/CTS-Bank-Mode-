<%@page import="org.apache.poi.util.SystemOutLogger"%>
<%@page import="java.sql.*"%>
<%@page import="java.util.*"%>
<%@page import="java.io.*"%>
<%@page import="cts.*" %>

<%
	String to_day=(new  java.util.Date()).toString().replaceAll("/","_").replace("+","_").replace(" ","_").replace(":","_");
	System.out.println("\n\t to_day is: "+to_day);
	String msg="";
	//if(!(to_day.indexOf("Fri")>-1 || to_day.indexOf("Tue")>-1))	
	{//outer-if
			try {
			Connection cn=Configuration.getConnection();
			String upload_path=Configuration.getConfValByNm("CFG_UPLOADPATH_TO_CHI",cn);
			String down_path=Configuration.getConfValByNm("CFG_downloadpath_from_CHI",cn);
			System.out.println("\n\t upload_path is: "+upload_path);
			System.out.println("\n\t down_path is: "+down_path);
			/*String sql_AllMax="select(select nvl(max(to_date(CLEARINGOUTWARD.CLO_DATE_DDMMYYYY,'ddmmyyyy')),
								to_date('01-JAN-2000','dd-MON-yyyy')) from CLEARINGOUTWARD) ,
 								(select nvl(max(to_date(CLEARINGINWARD.CLI_DDMMYYYY,'ddmmyyyy')),
           						 to_date('01-JAN-2000','dd-MON-yyyy'))from CLEARINGINWARD),
								(select nvl(max(to_date(RETURNINWARD.CREATIONDATE,'ddmmyyyy')),
							to_date('01-JAN-2000','dd-MON-yyyy'))from RETURNINWARD)from dual" ;*/
				String sql_AllMax="select ";
				sql_AllMax+="(select to_char(nvl(max(to_date(CLEARINGOUTWARD.CLO_DATE_DDMMYYYY,'ddmmyyyy')),to_date('01-JAN-2000','dd-MON-yyyy')),'ddmmyyyy') from CLEARINGOUTWARD),";
				sql_AllMax+="(select to_char(nvl(max(to_date(CLEARINGINWARD.CLI_DDMMYYYY,'ddmmyyyy')),to_date('01-JAN-2000','dd-MON-yyyy')),'ddmmyyyy')from CLEARINGINWARD),";
				sql_AllMax+="(select to_char(nvl(max(to_date(RETURNINWARD.RTI_CREATIONDATE,'ddmmyyyy')),to_date('01-JAN-2000','dd-MON-yyyy')),'ddmmyyyy')from RETURNINWARD)from dual";  				
								
				PreparedStatement ps_Insert=cn.prepareStatement("insert into BACKUPSTATUS values(?,?,?,?,?)");
				System.out.println("------------ inside getBackup.jsp -----------");
				String sqlGetFolder="select decode((to_char((greatest((select nvl(max(to_date(CLO_DATE_DDMMYYYY,'ddmmyyyy')),to_date('01-JAN-2000','dd-MON-yyyy')) from CLEARINGOUTWARD),(select nvl(max(to_date(CLI_DDMMYYYY,'ddmmyyyy')),to_date('01-JAN-2000','dd-MON-yyyy')) from CLEARINGINWARD),(select nvl(max(to_date(RTI_CREATIONDATE,'ddmmyyyy')),to_date('01-JAN-2000','dd-MON-yyyy')) from RETURNINWARD))),'ddmmyyyy')),(select to_char(to_date('01-JAN-2000','dd-MON-yyyy'),'ddmmyyyy')from dual),'NA',(to_char((greatest((select nvl(max(to_date(CLO_DATE_DDMMYYYY,'ddmmyyyy')),to_date('01-JAN-2000','dd-MON-yyyy')) from CLEARINGOUTWARD),(select nvl(max(to_date(CLI_DDMMYYYY,'ddmmyyyy')),to_date('01-JAN-2000','dd-MON-yyyy')) from CLEARINGINWARD),(select nvl(max(to_date(RTI_CREATIONDATE,'ddmmyyyy')),to_date('01-JAN-2000','dd-MON-yyyy')) from RETURNINWARD))),'ddmmyyyy')))maxdate from dual";
				int count=0;	
				Statement st=cn.createStatement();
				ResultSet rs_count=st.executeQuery("select count(*) from BACKUPSTATUS where isloginForADay='"+Configuration.getDDMMYYYY()+"'");
				if(rs_count.next())
				{//1
					count=rs_count.getInt(1);
				}//1
				rs_count.close();
				st.close();
				System.out.println("\n\tCount is:"+count);
				if(count==0)
				{//2
						String archivePath=Configuration.getConfValByNm("CFG_ARCUPLOADPATH_TO_CHI",cn);
						//System.out.println("----- 1 ---");
						Statement stmt=cn.createStatement();
						//System.out.println("----- 2 ---");
						String folderName="";
						//System.out.println("----- 3 ---");
						ResultSet rs_stmt=stmt.executeQuery(sqlGetFolder);
						//System.out.println("----- 4 ---");
						while(rs_stmt.next())
						{//1
							 folderName=rs_stmt.getString(1);
						}//1
						rs_stmt.close();
						
						//System.out.println("----- folderName ---"+folderName);
						//here in archive path we got datewise folders only..
						File archiveFiles=new File(archivePath);				
						//File[] allFiles=archiveFiles.listFiles();
						System.out.println("----- folderName ---:"+folderName);
						//for(File singleFile:allFiles)
																		 
						{//2
							if(!(folderName.equalsIgnoreCase("NA")))
							{
								try{
								//delete zip files---10/02/2024---------------								 
								File directory=null;
								File[] fList =null;
								directory = new File(upload_path);
								System.out.println("directory:" +directory);
								fList = directory.listFiles();
								System.out.println("fList:" +fList.length);									
								for (File file : fList) 
								{
									int pos = file.toString().lastIndexOf('.');
									String extention = file.toString().substring(pos+1, file.toString().length());
									if(extention.equals("zip")){
										System.out.println("file:" +file);	
										file.delete();
										System.out.println("upload_path files deleted...");	
									}									
								}
								//---download from CHI								
								String down_path_cleringInw=down_path+"ClearingInward/"; 
								directory = new File(down_path_cleringInw);
								System.out.println("directory:" +directory);
								fList = directory.listFiles();
								System.out.println("fList:" +fList.length);									
								for (File file : fList) 
								{
									int pos = file.toString().lastIndexOf('.');
									String extention = file.toString().substring(pos+1, file.toString().length());
									if(extention.equals("zip")){
										System.out.println("file:" +file);	
										file.delete();
										System.out.println("ClearingInward zip deleted...");	
									}									
								}//ClearingInward
								String down_path_oack=down_path+"Oack/"; 
								directory = new File(down_path_oack);
								System.out.println("directory:" +directory);
								fList = directory.listFiles();
								System.out.println("fList:" +fList.length);									
								for (File file : fList) 
								{
									int pos = file.toString().lastIndexOf('.');
									String extention = file.toString().substring(pos+1, file.toString().length());
									if(extention.equals("zip")){
										System.out.println("file:" +file);	
										file.delete();
										System.out.println("Oack zip deleted...");	
									}									
								}//Oack
								String down_path_retInw=down_path+"ReturnInward/"; 
								directory = new File(down_path_retInw);
								System.out.println("directory:" +directory);
								fList = directory.listFiles();
								System.out.println("fList:" +fList.length);									
								for (File file : fList) 
								{
									int pos = file.toString().lastIndexOf('.');
									String extention = file.toString().substring(pos+1, file.toString().length());
									if(extention.equals("zip")){
										System.out.println("file:" +file);	
										file.delete();
										System.out.println("ReturnInward zip deleted...");	
									}									
								}//ReturnInward
								}
								catch(NullPointerException e){
									System.out.println("/n Exception="+e);
									e.printStackTrace();
								}
								//------------------------------------
								System.out.println("---- Before going to  GetBackup-----");
									String retval=GetBackup.doBackup(folderName,cn);
									System.out.println("---- retval -----"+retval);
									 if(retval.split("~")[0].contains("SUCCESS"))
									 {
									   System.out.println("\n\tBackup is Taken");						 			
										String max_date_of_Clearingoutward="";
										String max_date_of_clearinginward="";
										String max_date_of_returninward=""; 
										ResultSet rs2=stmt.executeQuery(sql_AllMax);
										//System.out.println("---- 111 -----");
										while(rs2.next())
										{
											System.out.println("---- 222 -----");
											max_date_of_Clearingoutward=rs2.getString(1);
											max_date_of_clearinginward=rs2.getString(2);
											max_date_of_returninward=rs2.getString(3);
											System.out.println("\nmax_date_of_Clearingoutward:"+max_date_of_Clearingoutward);
											System.out.println("\nmax_date_of_clearinginward:"+max_date_of_clearinginward);
											System.out.println("\nmax_date_of_returninward:"+max_date_of_returninward);
										}
											
										//stmt.executeUpdate(sqlQuery);
										ps_Insert.setString(1,Configuration.getDDMMYYYY());
										ps_Insert.setString(2,folderName);
										ps_Insert.setString(3,max_date_of_Clearingoutward);
										ps_Insert.setString(4,max_date_of_clearinginward);
										ps_Insert.setString(5,max_date_of_returninward);
										if(ps_Insert.executeUpdate()>0)
											System.out.println("Record Inserted ");
										//stmt.close();	
										ps_Insert.close();
										//response.sendRedirect("../main.jsp");
										if(Integer.parseInt(retval.split("~")[1])>0)
											msg="#Backup For "+folderName+" is Taken Successfully.\nBut some files may not be deleted please check 'uploadpath_to_CHI' and  'downloadpath_from_CHI'.";
										else
											msg="#Backup For "+folderName+" is Taken Successfully.";
									 }	
									else 
									{
										
										  System.out.println("\n\tBackup is NOT Taken");	
										  msg="#Problem to Take Backup.Please Close any Open Folder or FTP";
										  if(!GetBackup.err_status.contains("SUCCESS"))
										  {
										  	msg="#"+GetBackup.err_status;
											System.out.println("\n\t Message:"+msg);
										  }
										//response.sendRedirect("../login.jsp?msg=Problem to Take Backup.");
									}
								
							//2.1	
						}//2
						}
						rs_stmt.close();
						stmt.close();
				}//2
				else
				{//2
					//if backup is already taken
					msg="#Backup is Already taken for a day.";
				}//2	
				System.out.println("----- 6 ---");
				System.out.println("----- 7 ---");	
				cn.close();
			}
			catch(Exception e)
			{//exception
				e.printStackTrace();
						System.out.println("\n\tException in GetBackup.doBackup()::>>>"+e);
			}//exception
		}//outer-if	
		/*else
		{
			msg="succuss";
		}*/	
			System.out.println("--- exit from getBackup.jsp------"+msg);
		
		
	
%>
<%=msg%>