package cts;
public class NoFilesAtUploadPathException extends RuntimeException
{
	public NoFilesAtUploadPathException(String msg)
	{
			super(msg);
	}
}