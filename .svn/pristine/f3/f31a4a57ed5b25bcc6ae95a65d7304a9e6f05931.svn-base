package cts;



import java.io.File;


public class RenameMicrFile
{
	public static void main(String args[])
	{
		try
		{
		String filepath="E:/Apache6/webapps/CTS/uploadpath_to_CHI/2/";
		File img=new File(filepath+"/Images/");
		String fileNames[]=img.list();
		for(int i=0;i<fileNames.length;i++)
		{
			String fname = fileNames[i];
			if(fname.endsWith("110417.jpg") || fname.endsWith("110417G.jpg") || fname.endsWith("110417.tif") || fname.endsWith("110417G.tif"))
			{
				String tempfname=fname.replace("110417", "120417");
				System.out.println("Renamed File=="+tempfname);
				boolean b=new File(img.toString()+"/"+fname).renameTo(new File(img.toString()+"/"+tempfname));
				System.out.println(b?"File renamed --"+fname:"Unable to Rename=="+fname);
			}
		}
		img=new File(filepath+"/MICRWaveforms/");
		fileNames=null;
		fileNames=img.list();
		for(int i=0;i<fileNames.length;i++)
		{
			String fname = fileNames[i];
			if(fname.endsWith("110417.txt"))
			{
				String tempfname=fname.replace("110417", "120417");
				System.out.println("Renamed File=="+tempfname);
				boolean b=new File(img.toString()+"/"+fname).renameTo(new File(img.toString()+"/"+tempfname));
				System.out.println(b?"File renamed --"+fname:"Unable to Rename=="+fname);
			}
		}
	}
	catch(Exception e)
	{
		e.printStackTrace();
	}
	}

}
