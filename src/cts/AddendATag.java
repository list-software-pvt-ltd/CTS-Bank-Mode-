package cts;
public class AddendATag
{//AddendATag

	private String BOFDRoutNo;
	private String BOFDBusDate;
	private String DepositorAcct;
	private String IFSC;

	public AddendATag()
	{

	}


	public AddendATag(String bOFDRoutNo, String bOFDBusDate,String depositorAcct, String iFSC)
	{

		BOFDRoutNo = bOFDRoutNo;
		BOFDBusDate = bOFDBusDate;
		DepositorAcct = depositorAcct;
		IFSC = iFSC;
	}


	public String getBOFDRoutNo()
	{
		return BOFDRoutNo;
	}
	public void setBOFDRoutNo(String bOFDRoutNo)
	{
		BOFDRoutNo = bOFDRoutNo;
	}
	public String getBOFDBusDate()
	{
		return BOFDBusDate;
	}
	public void setBOFDBusDate(String bOFDBusDate)
	{
		BOFDBusDate = bOFDBusDate;
	}
	public String getDepositorAcct()
	{
		return DepositorAcct;
	}
	public void setDepositorAcct(String depositorAcct)
	{
		DepositorAcct = depositorAcct;
	}
	public String getIFSC()
	{
		return IFSC;
	}
	public void setIFSC(String iFSC)
	{
		IFSC = iFSC;
	}


}//AddendATag
