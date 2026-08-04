package cts.controller;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream.GetField;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;

import org.apache.commons.fileupload.*;
import org.apache.commons.fileupload.disk.*;
import org.apache.commons.fileupload.servlet.*;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.output.*;
import org.json.JSONObject;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import cts.Configuration;
import jakarta.servlet.*;
import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Part;

import java.util.zip.ZipEntry;
import java.util.zip.ZipException;
import java.util.zip.ZipOutputStream;
import java.util.zip.ZipFile;
import java.util.zip.ZipInputStream;


/**
 * Servlet implementation class PPSRespController
 */

//@MultipartConfig(maxFileSize = 1024*1024*5)

@MultipartConfig(fileSizeThreshold = 1024 * 1024 * 5,
maxFileSize = 1024 * 1024 * 5 * 5 *5 * 5, 
maxRequestSize = 1024 * 1024 * 5 * 5 * 5)

public class OutwardClearing_Upload extends HttpServlet {
	private static final long serialVersionUID = 1L;       
    
    public OutwardClearing_Upload() {
        super();
    }
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doPost(request, response);
	}	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
		 String filename="FAILED",path="",CTSTOKEN=null,fileName="",branch_code="";
			ArrayList<String> fileList = new ArrayList();
		 try 
		 {			 
			 try
			 {
			//	 System.out.println("------Testing CTS SAM-------");
				 branch_code=request.getParameter("session_branch_code");
				   Connection cn=null;
				   cn=Configuration.getConnection();
				   path =Configuration.getConfValByNm("CFG_UPLOADPATH_TO_CHI", cn);
				   String directoryPath=path+branch_code;//+"/ClearingOutward/";
				   File directory = new File(directoryPath);	
				   if (!directory.exists() )
				   { 
			        boolean directoryCreated = directory.mkdir(); 
			     //   System.out.println("Boolean : "+directoryCreated);
			        if (directoryCreated) { 
			            System.out.println("Directory created successfully at: " + directoryPath); 
			        } else { 
			            System.out.println("Failed to create directory. It may already exist at: " + directoryPath); 
			        } 
				   }
				   path=directoryPath+"/ClearingOutward/"; 
				   File directory1 = new File(path);
				   if (!directory1.exists() )
				   { 
			        boolean directoryCreated = directory1.mkdir(); 
			      //  System.out.println("Boolean : "+directoryCreated);
			        if (directoryCreated) { 
			            System.out.println("Directory created successfully at: " + directoryPath); 
			        } else { 
			            System.out.println("Failed to create directory. It may already exist at: " + directoryPath); 
			        } 
				   }
				 //  System.out.println("---path---"+path);
				//   System.out.println("@@@Testing CTS SAM");
				   cn.close();
				 }			 
				 catch(Exception e)
				 {
						System.out.println("In fileoperation Exception"+e);
						e.printStackTrace();
				 }
				 for (Part part : request.getParts())
				 {
					 fileName = getFileName(part);					   
					 if(fileName!=null)
					 {
					  filename=fileName;
					
					  part.write(path + filename);	
					  String path_filename=path+filename;
					 
					  if(filename.indexOf(".zip")>-1) 
					  {
						String fileZip = path_filename;				  
						path_filename= path_filename.substring(0, path_filename.lastIndexOf("."));
						
						File destDir = new File(path);
					    try (ZipFile file = new ZipFile(fileZip))
					    {
					      Enumeration<? extends ZipEntry> zipEntries = file.entries();
					      while (zipEntries.hasMoreElements())
					      {
					        ZipEntry zipEntry = zipEntries.nextElement();
					        File newFile = new File(destDir,zipEntry.getName());
					        newFile.getParentFile().mkdirs();
					        if (!zipEntry.isDirectory())
					        {
					          try (FileOutputStream outputStream = new FileOutputStream(newFile))
					          {
					            BufferedInputStream inputStream = new BufferedInputStream(file.getInputStream(zipEntry));
					            while (inputStream.available() > 0)
					            {
					              outputStream.write(inputStream.read());
					            }
					            inputStream.close();
					          }
					        }
					      }
					    }
					 }
					//-----------------------------			
					  }//end if
					}
				  	CTSTOKEN = request.getParameter("CTSTOKEN");		
				  	System.out.println("filename.length()"+filename.length());
					if(filename.length()>0)
					{
						  if(filename.indexOf(".zip")>-1) 
						  {
							 
							  ZipFile zFile = new ZipFile(path + filename);
							  zFile.close();								
							  File file = new File(path + filename);
							  boolean deleted = file.delete();
						
						  }
						  
					 RequestDispatcher RequetsDispatcherObj=request.getRequestDispatcher("outward_clearing.jsp?retStr=SUCCESS&msg=FIRSTTIME&CTSTOKEN="+CTSTOKEN);
					 RequetsDispatcherObj.forward(request, response);
					}				 	
		 }
		 catch(Exception e)
		 {
			 System.out.println("In General Exception"+e);
			 e.printStackTrace();
		 }
	}	
	
	private String getFileName(Part part) 
	{	
	    return part.getSubmittedFileName();
	}

}
