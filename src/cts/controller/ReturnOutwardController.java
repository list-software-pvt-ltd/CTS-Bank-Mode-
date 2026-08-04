package cts.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream.GetField;
import java.sql.Connection;
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
/**
 * Servlet implementation class PPSRespController
 */
@MultipartConfig(fileSizeThreshold = 1024 * 1024,
maxFileSize = 1024 * 1024 * 5 * 5, 
maxRequestSize = 1024 * 1024 * 5 * 5)
public class ReturnOutwardController extends HttpServlet {
	private static final long serialVersionUID = 1L;       
    
    public ReturnOutwardController() {
        super();
        // TODO Auto-generated constructor stub
    }
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doPost(request, response);
	}	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
		 String filename="FAILED",path="",CTSTOKEN=null,fileName="",retstr="";
		 try {
			 
			 try {
				   Connection cn=null;
				   cn=Configuration.getConnection();
				   retstr = request.getParameter("retstr");
				   if(retstr.equalsIgnoreCase("returnOutward"))
				   {
					   path =Configuration.getConfValByNm("CFG_UPLOADPATH_TO_CHI", cn);
					   path=path+"ReturnOutward/";
				   }
				   else if(retstr.equalsIgnoreCase("returnInward"))
				   {
					   path =Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI", cn);
					   path=path+"ReturnInward/";
				   }
				   else if(retstr.equalsIgnoreCase("returnOutward_res"))
				   {
					   path =Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI", cn);
					   path=path+"ResponseFiles/";
				   }
				   else if(retstr.equalsIgnoreCase("EXTENSION"))
				   {
					   path =Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI", cn);
					   path=path+"ExtensionFiles/";
				   }
				   else if(retstr.equalsIgnoreCase("Oack"))
				   {
					   path =Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI", cn);
					   path=path+"Oack/";
				   }
				   cn.close();
				 }			 
				 catch(Exception e)
				 {
						System.out.println("In fileoperation Exception"+e);
						e.printStackTrace();
				 }
				 for (Part part : request.getParts()) {
					    fileName = getFileName(part);
					   
					    if(fileName!=null)
					    {
					    	filename=fileName;
					    	part.write(path + fileName);										
					    }
					}
				  	CTSTOKEN = request.getParameter("CTSTOKEN");
				  	//System.out.println("CTSTOKEN="+CTSTOKEN+" &&& filename.length()=="+filename.length());
				  	System.out.println("@@@@filename="+filename+" ## length=="+filename.length()+ " #retstr="+retstr);
				  	if(filename.length()>0 && retstr.equalsIgnoreCase("returnOutward"))
				 	{ 
				  		RequestDispatcher RequetsDispatcherObj =request.getRequestDispatcher("return_outward.jsp?retString=SUCCESS&CTSTOKEN="+CTSTOKEN+"&filename="+filename);
					 	RequetsDispatcherObj.forward(request, response);
				 	}
				  	else if(filename.length()>0 && retstr.equalsIgnoreCase("returnInward"))
				 	{ 
				  		RequestDispatcher RequetsDispatcherObj =request.getRequestDispatcher("cleInward_resFile.jsp?retString=SUCCESS&CTSTOKEN="+CTSTOKEN);
					 	RequetsDispatcherObj.forward(request, response);
				 	}
				  	else if(filename.length()>0 && retstr.equalsIgnoreCase("returnOutward_res"))
				  	{
				  		RequestDispatcher RequetsDispatcherObj =request.getRequestDispatcher("retOutward_resFile.jsp?retString=SUCCESS&CTSTOKEN="+CTSTOKEN);
					 	RequetsDispatcherObj.forward(request, response);
				  	}
				  	else if(filename.length()>0 && retstr.equalsIgnoreCase("EXTENSION"))
					{
				  		RequestDispatcher RequetsDispatcherObj =request.getRequestDispatcher("extensionFile.jsp?retString=SUCCESS&CTSTOKEN="+CTSTOKEN);
					 	RequetsDispatcherObj.forward(request, response);
					}
				  	else if(filename.length()>0 && retstr.equalsIgnoreCase("Oack"))
					{
				  		RequestDispatcher RequetsDispatcherObj =request.getRequestDispatcher("oackConversion.jsp?retString=SUCCESS&CTSTOKEN="+CTSTOKEN);
					 	RequetsDispatcherObj.forward(request, response);
					}
			
		 }
		 catch(Exception e)
			{
				System.out.println("In General Exception"+e);
				e.printStackTrace();
			}
	}
	
	private String getFileName(Part part) {
		/*
		 * for (String content : part.getHeader("content-disposition").split(";")) { if
		 * (content.trim().startsWith("file_pick")) return
		 * content.substring(content.indexOf("=") + 2, content.length() - 1); }
		 */
	    return part.getSubmittedFileName();
	}

}
