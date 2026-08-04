package cts;
public class ItemInformation
{

	private String ItemSeqNumber;
	private String PayorBankRoutNo;
	private String SerialNumber;
	private String clearingType;
	private String clo_olbc;
	private String BranchCode;
	public ItemInformation()
	{//ItemInformation

	}//ItemInformation

	public ItemInformation(String ItemSeqNumber,String SerialNumber,String clearingType,String clo_olbc,String BranchCode)
	{//ItemInformation
		this.ItemSeqNumber=ItemSeqNumber;
		this.SerialNumber=SerialNumber;
		this.clearingType=clearingType;
		this.clo_olbc=clo_olbc;
		this.BranchCode=BranchCode;
	}//ItemInformation

	public void setSerialNumber(String SerialNumber)
	{
				this.SerialNumber=SerialNumber;;
    }

	public String getSerialNumber()
	{
				return SerialNumber;
    }
	public String getItemSeqNumber()
	{
			return ItemSeqNumber;
	}
	
	public String getBranchCode()
	{
			return BranchCode;
	}

	public String getPayorBankRoutNo()
	{
			return PayorBankRoutNo;
	}

	public void setPayorBankRoutNo(String PayorBankRoutNo)
	{
				this.PayorBankRoutNo=PayorBankRoutNo;;
    }

    public void setClearingType(String clearingType)
		{
					this.clearingType=clearingType;
		}
		public String getClearingType()
		{
				return clearingType;
	}

	 public void setClo_Olbc(String clo_olbc)
			{
						this.clo_olbc=clo_olbc;
			}
			public String getClo_Olbc()
			{
					return clo_olbc;
	}
}//ItemInformation