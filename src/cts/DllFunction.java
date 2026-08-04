package cts;
public class DllFunction
{
	static native double compute(int m, long n);
	
	static 
	{
		//System.setProperty("java.library.path", "D:/Apache6/Apache6/webapps/CTS/WEB-INF/classes/cts/DllFunction.dll");
		System.out.println("dll is loaded.......111");
		System.loadLibrary("DllFunction");
		str=Double.toString(compute(10,20l));	
		System.out.println("dll is loaded.......222");
	}
	static String str;
	public void callMe()
	{
		System.out.println("str:>>>>"+str);
	}
	
	/*public static void main(String...args)
	{
		new DllFunction().callMe();
	}*/
}