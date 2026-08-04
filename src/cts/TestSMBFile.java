package cts;
import jcifs.smb.*;
public class TestSMBFile
{
	public static void check()
	{
		try
		{
			jcifs.Config.registerSmbURLHandler();
			NtlmPasswordAuthentication auth = new NtlmPasswordAuthentication("mydomain","om", "om");
			SmbFile file=new SmbFile("smb://172.100.30.54/E/From_NPCI/",auth);
			System.out.println(file.list().length);
		}
		catch(Exception e)
		{
			System.out.println(e+"");
		}
	}
}