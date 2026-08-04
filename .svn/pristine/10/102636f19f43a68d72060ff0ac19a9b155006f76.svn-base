<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%@page import="java.awt.image.BufferedImage"%>
<%@page import="java.io.File"%>
<%@page import="java.nio.Buffer"%>
<%@page import="java.util.Iterator"%>
<%@page import="javax.imageio.ImageIO"%>
<%@page import="javax.imageio.ImageReader"%>
<%@page import="javax.imageio.stream.ImageInputStream"%>

<%
	System.out.println("In rotateImages.jsp");
	String filename="";
	StringBuffer thisBuffer = new StringBuffer("");
	try
	{
		filename=request.getParameter("imagenames");
		String inputpath=getServletContext().getRealPath("/");
		inputpath+="/downloadpath_from_CHI/ClearingInward/Images/";
		System.out.println("\n\tApplication Context Path:"+inputpath+filename);
		File imgpath=new File(inputpath+filename);
		ImageInputStream iis=ImageIO.createImageInputStream(imgpath);
		Iterator <ImageReader> iterator=ImageIO.getImageReaders(iis);
		ImageReader reader=iterator.next();
		String format=reader.getFormatName();
				
		BufferedImage image=ImageIO.read(iis);
		int width=image.getWidth();
		int height=image.getHeight();
		
		BufferedImage rotated=new BufferedImage(width, height, image.getType());
		
		for(int y=0;y<height;y++){
			for(int x=0;x<width;x++){
				rotated.setRGB((width-1)-x, (height-1)-y, image.getRGB(x, y));
			}
		}
		ImageIO.write(rotated, format, imgpath);
		thisBuffer.append("SUCCESS");
	}		
	catch(Exception e)
	{//1
		System.out.println("Error occured......");
		System.out.println(""+e);
		thisBuffer.append("FAILED");
	}//1
	
%>

<%=thisBuffer.toString()%>