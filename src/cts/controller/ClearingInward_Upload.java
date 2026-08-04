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
import cts.dao.PPSDao;
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

public class ClearingInward_Upload extends HttpServlet {
	private static final long serialVersionUID = 1L;       
    
    public ClearingInward_Upload() {
        super();
    }
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doPost(request, response);
	}	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
		 String filename="FAILED",path="",CTSTOKEN=null,fileName="",CFG_VENDOR_ID="";
			ArrayList<String> fileList = new ArrayList();
		 try 
		 {			 
			 try
			 {
				// System.out.println("---Testing CTS----");
				   Connection cn=null;
				   cn=Configuration.getConnection();
				   path =Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI", cn);
				   CFG_VENDOR_ID=Configuration.getConfValByNm("CFG_VENDOR_ID",cn);
				   System.out.println("---CFG_VENDOR_ID----"+CFG_VENDOR_ID);
				   path=path+"ClearingInward/"; 
				 //  System.out.println("Testing CTS");
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
					 System.out.println("fileName="+fileName);
					 System.out.println("\n path="+path);
					  part.write(path + filename);	
					  String path_filename=path+filename;	
					  System.out.println("\n path_filename="+path_filename);
					  if(filename.indexOf(".zip")>-1) 
					  {
						String fileZip = path_filename;			
						 System.out.println("\n fileZip="+fileZip);
						path_filename= path_filename.substring(0, path_filename.lastIndexOf("."));
					   // File destDir = new File(path);
						File destDir;
						System.out.println("CFG_VENDOR_ID="+CFG_VENDOR_ID);
						System.out.println("path_filename="+path_filename);
						System.out.println("path="+path);
					    if(CFG_VENDOR_ID.equalsIgnoreCase("IDBISUB")) 
					    {
					    	  destDir = new File(path);//_filename
					    }
					    else
					    {
					    	  destDir = new File(path);
					    }
					    System.out.println("destDir="+destDir);
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
					    System.out.println("Done");
					 }
					//-----------------------------			
					  }//end if
					}
				  	CTSTOKEN = request.getParameter("CTSTOKEN");		
				  	System.out.println("filename.length()"+filename.length());
					if(filename.length()>0)
					{
					 RequestDispatcher RequetsDispatcherObj=request.getRequestDispatcher("inward_clearing.jsp?retStr=SUCCESS&Flag=T&CTSTOKEN="+CTSTOKEN);
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
