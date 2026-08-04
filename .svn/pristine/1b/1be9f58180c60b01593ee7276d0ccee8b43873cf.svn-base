package cts;
public class listwrap
{
	public static native String signdata(String str);

	static
	{

	   	System.loadLibrary("ListDll");
		System.out.println("Dll is Loaded");
	}

	public static void main(String...args)
	{
		System.out.println("*********In java:\n\n"+listwrap.signdata("ListDll"));
	}
}