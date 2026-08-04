package cts;

public class MicrDataInformation
{//MicrDataInformation

	String ourBnkCode="",chqNo="",sortCode="",tranNo="",amount="",accNo="",signatureData="",signatureLength="";
	String DepositorAcct="";
	String BOFDBusDate="";
	String BOFDRoutNo="";
	String clearingType="";
	String PPRTOFOLLOW="";
	String iqaStatus="";
	String itemSeqNumber="";
	String clo_olbc="";
	String payeeName="";
	String iqaignoreind="";
	String BranchCode="";
	public MicrDataInformation()
	{}
	public MicrDataInformation(String ourBnkCode, String chqNo, String sortCode,	String tranNo, String amount, String accNo,String SignatureData,String DepositorAcct,String BOFDBusDate, String BOFDRoutNo,String clearingType,String iqaignoreind)
			{
		super();
		this.ourBnkCode = ourBnkCode;
		this.chqNo = chqNo;
		this.sortCode = sortCode;
		this.tranNo = tranNo;
		this.amount = amount;
		this.accNo = accNo;
		this.signatureData=SignatureData;
		this.DepositorAcct=DepositorAcct;
		this.BOFDBusDate=BOFDBusDate;
		this.BOFDRoutNo=BOFDRoutNo;
		this.clearingType=clearingType;
		this.iqaignoreind=iqaignoreind;
	}

	public String getPayeeName()
	{
		return this.payeeName;
	}

	public void setPayeeName(String nm)
	{
		this.payeeName=nm;
	}
	public String getDepositorAcct() {
			return DepositorAcct;
		}

		public void setDepositorAcct(String DepositorAcct) {
			this.DepositorAcct = DepositorAcct;
	}

	public void setPprToFollow(String PPRTOFOLLOW)
	{
			this.PPRTOFOLLOW=PPRTOFOLLOW;
	}
	public String getPprToFollow()
	{
			return PPRTOFOLLOW;
	}

public void setIqaStatus(String iqaStatus)
	{
			this.iqaStatus=iqaStatus;
	}
	public String getIqaStatus()
	{
			return iqaStatus;
	}

	public String getBOFDBusDate() {
			return BOFDBusDate;
		}

		public void setBOFDBusDate(String BOFDBusDate) {
			this.BOFDBusDate = BOFDBusDate;
	}

	public String getBOFDRoutNo() {
			return BOFDRoutNo;
		}

		public void setBOFDRoutNo(String BOFDRoutNo) {
			this.BOFDRoutNo = BOFDRoutNo;
	}

	public String getOurBnkCode() {
		return ourBnkCode;
	}

	public void setOurBnkCode(String ourBnkCode) {
		this.ourBnkCode = ourBnkCode;
	}

	public String getChqNo() {
		return chqNo;
	}

	public void setChqNo(String chqNo) {
		this.chqNo = chqNo;
	}

	public String getSortCode() {
		return sortCode;
	}

	public void setSortCode(String sortCode) {
		this.sortCode = sortCode;
	}

	public String getTranNo() {
		return tranNo;
	}

	public void setTranNo(String tranNo) {
		this.tranNo = tranNo;
	}

	public String getAmount() {
		return amount;
	}

	public void setAmount(String amount) {
		this.amount = amount;
	}

	public String getAccNo() {
		return accNo;
	}

	public void setAccNo(String accNo) {
		this.accNo = accNo;
	}

	public void setSignatureData(String SignatureData)
	{
		this.signatureData = SignatureData;
	}
	public String getSignatureData()
	{
		return signatureData;
	}

public void setSignatureLength(String signatureLength)
	{
		this.signatureLength = signatureLength;
	}
	public String getSignatureLength()
	{
		return signatureLength;
	}

	public void setClearingType(String clearingType)
	{
				this.clearingType=clearingType;
	}
	public String getIqaignoreind() {
		return iqaignoreind;
	}
	public void setIqaignoreind(String iqaignoreind) {
		this.iqaignoreind = iqaignoreind;
	}
	public String getClearingType()
	{
			return clearingType;
	}
	public void setItemSeqNumber(String itemSeqNumber)
	{
		this.itemSeqNumber=itemSeqNumber;
	}
	public void setBranchCode(String BranchCode)
	{
		this.BranchCode=BranchCode;
	}
	public String getBranchCode()
	{
		return BranchCode;
	}
	public String getItemSeqNumber()
	{
		return itemSeqNumber;
	}

	public void setOlbc(String clo_olbc)
		{
			this.clo_olbc=clo_olbc;
		}
		public String getOlbc()
		{
						return clo_olbc;
		}
}//MicrDataInformation