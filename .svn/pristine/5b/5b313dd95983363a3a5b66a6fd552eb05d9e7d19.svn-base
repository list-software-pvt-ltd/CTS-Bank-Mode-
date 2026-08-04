<%@ page contentType="text/html; charset=iso-8859-1" language="java" import="java.sql.*" errorPage="" %>
<%@page import="java.util.*"%>
<%@page import="java.io.*"%>
<%@page import="cts.*"%>



<%
			StringBuffer thisBuffer;		
			String imageFilePath;
			System.out.println("------ in fetch_imageName.jsp --------");
			int noOfCheque=0;
			long totalAmount=0;
			String requestData=request.getParameter("chqDtl"); 	
			System.out.println("------ requestData:>>"+requestData);			
			//154425_416211001:Avinash Tukaram
			String[] param=requestData.split("_");
			String chqNo=param[0];
			System.out.println("chqNo:>>"+chqNo);		
			String[] sortCodeAndPayeeName=param[1].split(":");	
			String sortCode=sortCodeAndPayeeName[0];
			System.out.println("sortCode:>>"+sortCode);
			String payeeName=sortCodeAndPayeeName[1];
			System.out.println("payeeName:>>"+payeeName);
								
			thisBuffer=new StringBuffer();
			
			String session_branch_code = (String) session.getAttribute("session_branch_code");
			System.out.println("session_branch_code="+session_branch_code);
					
			String res=null;
			String msg="";	
			int i=0;
			Connection con=Configuration.getConnection();
			String query="";
			try
			{
				imageFilePath=Configuration.getConfValByNm("CFG_UPLOADPATH_TO_CHI",con)+session_branch_code+"/ClearingOutward/Images/";
				int count=0;
				File f=new File(imageFilePath);
				File[] fileList=f.listFiles();
				for(File singleImage:fileList)
				{//1
					String fileName= singleImage.getName();
					if(fileName.indexOf(chqNo)==1 || fileName.indexOf(sortCode)==7)
					{//2
						count++;
						String imageFileName=singleImage.getName();
						System.out.println("\n\t imageFileName:"+imageFileName);
						String imgName="";
						/*if(imageFileName.contains("G"))
						{
							imgName=imageFileName.substring(1,30);
						}
						else
						{
							imgName=imageFileName.substring(1,imageFileName.lastIndexOf("."));
						}*/
						
						if((imageFileName.toUpperCase().contains("F")||imageFileName.toUpperCase().contains("R")) && imageFileName.toUpperCase().contains("G"))		
						{//1
								imgName=imageFileName.substring(1,28);
						}//1
						else
						{//1
								imgName=imageFileName.substring(1,imageFileName.lastIndexOf("."));
						}//1										
						if(!thisBuffer.toString().contains(imgName))
						{
							thisBuffer.append(imgName+"#");
						}	
					}//2
				}//1
				if(count==0)
				{//1
					thisBuffer.append("NOCHEQUEIMAGE$");			
				}//1
			}
			catch(Exception e)
			{
				System.out.println("Exception in fetch_imageName.jsp ::::>>>"+e);	
				thisBuffer.append("NOCHEQUE#NOCHEQUE$");	
			}
			finally
			{
				con.close();
			}
	System.out.println("----- exit from fetch_imageName.jsp::::>>>"+thisBuffer);					
%>
<%=thisBuffer.toString()%>