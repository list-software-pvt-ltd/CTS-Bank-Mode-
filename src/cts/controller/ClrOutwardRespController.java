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
maxFileSize = 1024 * 1024 * 5 *5, 
maxRequestSize = 1024 * 1024 * 5 * 5)
public class ClrOutwardRespController extends HttpServlet {
	private static final long serialVersionUID = 1L;       
    
    public ClrOutwardRespController() {
        super();
        // TODO Auto-generated constructor stub
    }
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doPost(request, response);
	}	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
		 String filename="FAILED",path="",CTSTOKEN=null,fileName="";
		 try {			 
			 try
			 {
				   Connection cn=null;
				   cn=Configuration.getConnection();
				   path =Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI", cn);
				   path=path+"ResponseFiles/";
				  //System.out.println("In path=@@@@="+path);
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
					    	//System.out.println("fileName="+fileName);
					    	part.write(path + fileName);					    	
					    //	System.out.println("path=="+path+filename);								
					    }
					}
				  	CTSTOKEN = request.getParameter("CTSTOKEN");
				 	if(filename.length()>0)
				 	{ 
				 		RequestDispatcher RequetsDispatcherObj =request.getRequestDispatcher("cleOutward_resFile.jsp?retStr=SUCCESS&CTSTOKEN="+CTSTOKEN);
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
