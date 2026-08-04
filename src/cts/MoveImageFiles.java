package cts;
import javax.xml.namespace.QName;
import javax.xml.stream.XMLEventReader;
import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.events.Attribute;
import javax.xml.stream.events.EndElement;
import javax.xml.stream.events.StartElement;
import javax.xml.stream.events.XMLEvent;
import java.io.*;
import java.util.*;
import java.sql.*;
class MoveImageFiles
{
	private ArrayList<HashMap> micrData = new ArrayList<HashMap>();
	private HashMap<String, String> micrMap = new HashMap<String, String>();
	private ArrayList<ImageBean> imgData = new ArrayList<ImageBean>();
	private ArrayList<ItemInformation> itemData = new ArrayList<ItemInformation>();
	private String fileName;
	ImageBean imgbn = null;
	static ItemInformation itemInfo;
	public static String err_string="SUCCESS";
	/*public static void main(String argv[])
	{
		try
		{
			String filePath="d:/Apache6/webapps/CTS/downloadpath_from_CHI/ClearingInward/";
			String fileNames[]=new File(filePath).list();
			for(int i=0;i<fileNames.length;i++)
			{

				String imgFileNm=fileNames[i];
				//new File(imgFileNm+".BF").renameTo(new File(filePath+"Images/"+imageFile1+".tif"));
				//new File(imgFileNm+".BR").renameTo(new File(filePath+"Images/"+imageFile2+".tif"));
				//new File(imgFileNm+".GF").renameTo(new File(filePath+"Images/"+imageFile3+".jpg"));
			}
			MoveImageFiles.readPXF("000201601191.PXF");
		}
		catch(Exception e)
		{
			System.out.println(""+e);
		}
	}*/
	/*public static boolean readPXF(String fileName)
	  	{//readPXF
	  		boolean flg=false;
	  		String str_filename=fileName;
			String path="",singleRecord="",fullline="",draweeBankSortCode="";
			String ItemSeqNo="", PayorBankRoutNo="",Amount="",AccountNo="",SerialNo="",TransCode="",PresentingBankRoutNo="";
			String PresentmentDate="",CycleNo="",NumOfImageViews="",ClearingType="",DocType="",MICRRepairFlags="";
			String SpecialHandling="",TruncatingRTNo="",UserField="",IQAIgnoreInd="",CurrencyInd="",SessionNo="";							        String InternalSequenceNo="",CreationDate="",RBISeqNo="",InstruDate="",imageFile1="",imageFile2="";
			String imageFile3="",BOFDRoutNo="",BOFDBusDate="",DepositorAcct="",IFSC="",seqNo="",UnqDocKey="";
	  		itemInfo=new ItemInformation();
	  		long imgFileSize=0;
			int imgNmCnt=0;
	  		System.out.println("*********** start readPXF **** "+fileName);
	  		String upDownStyle=Configuration.getConfValByNm("CFG_INWD_SPLITSTYLE");
			System.out.println("*********** 1 **** ");
			Connection con=null;
			PreparedStatement pst =null;
			PreparedStatement pst1=null;
			PreparedStatement pst3=null;
			PreparedStatement stmt_getSeqVal=null;
			int counter=0;
			String BPIBF_fileName=null;
			//ByteToImageConverter _objImageCretor=null;
			int dsLength=0;
			String fileNameArr[]=fileName.split("_");
			System.out.println("*********** 2 **** ");
			FileReader filereader;
			BufferedReader reader;
			PrintWriter pw=null;
	  		try
	  		{//try
				con=Configuration.getConnection();
				path=Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI")+"ClearingInward/"+str_filename;
				String clearingType=fileName.substring(fileName.indexOf(".")-2, fileName.indexOf(".")); //Configuration.lPad(fileName.split("_")[2],2,"0");
				String _filename=Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI")+"/ClearingInward/";

				filereader = new FileReader(path);
				reader = new BufferedReader(filereader);
				stmt_getSeqVal=con.prepareStatement("select SEQ_CLEARING_INWARD.nextVal from dual ");
				pst = con.prepareStatement("insert into ClearingInward      values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
				System.out.println("*********** 4**** ");

				while((singleRecord=reader.readLine())!=null)
				{
					singleRecord=singleRecord.replace("|","~");
					String Data[]=singleRecord.split("~");

					ItemSeqNo=Data[0];
					PayorBankRoutNo=Data[1];
					Amount=Data[2];
					AccountNo=Data[3];
					SerialNo=Data[4];
					TransCode=Data[5];
					PresentingBankRoutNo=Configuration.getDDMMYYYY();//Data[6];
					PresentmentDate=Data[7];
					CycleNo=Data[8];
					NumOfImageViews=Data[9];
					ClearingType=Data[10];
					if(_filename.indexOf(".txt")==-1)
					{
						_filename=_filename+"/"+ClearingType+"_To_CBS_Clearing_Inward.txt";
						pw=new PrintWriter (new FileWriter(_filename,true));//append mode
					}
					DocType=Data[11];
					MICRRepairFlags=Data[12];
					SpecialHandling=Data[13];
					TruncatingRTNo=Data[14];
					UserField=Data[15];
					IQAIgnoreInd=Data[16];
					CurrencyInd=Data[17];
					SessionNo=Data[18];
					InternalSequenceNo=Data[19];

					RBISeqNo=Configuration.lPad(RBISeqNo,10,"0");
					InstruDate=Configuration.getDDMMYYYY();//Configuration.lPad(InstruDate,8,"0");
					BOFDRoutNo=Configuration.lPad(BOFDRoutNo,9,"0");
					BOFDBusDate=Configuration.lPad(BOFDBusDate,8,"0");
					DepositorAcct=Configuration.lPad(DepositorAcct,25,"0");
					IFSC=Configuration.lPad(IFSC,11,"0");


					String onlyFileName="P"+Data[7]+InternalSequenceNo+fileName.substring(0,3);

					new File((path.substring(0,path.lastIndexOf("/")+1))+"Images/").mkdirs();
					String imgFileNm=(path.substring(0,path.lastIndexOf("/")+1))+onlyFileName;

					//imageFile1="f_"+SerialNo+ItemSeqNo.substring(0,ItemSeqNo.length()>=10?10:ItemSeqNo.length());
					imageFile1="f_"+ItemSeqNo.substring(0,ItemSeqNo.length()>=9?9:ItemSeqNo.length())+SerialNo+Configuration.lPad(""+imgNmCnt,3,"0");
	  				imageFile1=Configuration.lPad(imageFile1,27,"0");

					//imageFile2="r_"+SerialNo+ItemSeqNo.substring(0,ItemSeqNo.length()>=10?10:ItemSeqNo.length());
					imageFile2="r_"+ItemSeqNo.substring(0,ItemSeqNo.length()>=9?9:ItemSeqNo.length())+SerialNo+Configuration.lPad(""+imgNmCnt,3,"0");
	  				imageFile2=Configuration.lPad(imageFile2,27,"0");

					//imageFile3="f_"+SerialNo+ItemSeqNo.substring(0,ItemSeqNo.length()>=10?10:ItemSeqNo.length())+"_G";
					imageFile3="f_"+ItemSeqNo.substring(0,ItemSeqNo.length()>=9?9:ItemSeqNo.length())+SerialNo+Configuration.lPad(""+(imgNmCnt++),3,"0")+"_G";
	  				imageFile3=Configuration.lPad(imageFile3,27,"0");

					//imageFile1=Configuration.lPad("f"+(onlyFileName.substring(1,onlyFileName.length())),27,"0");
					//imageFile2=Configuration.lPad("r"+(onlyFileName.substring(1,onlyFileName.length())),27,"0");
					//imageFile3=Configuration.lPad("f"+(onlyFileName.substring(1,onlyFileName.length()))+"G",27,"0");

					//
					//
					//
					//System.out.println("*********** 4**** "+imgFileNm);
					System.out.println("*********** 4**** "+imageFile1);
					System.out.println(new File(imgFileNm+".BF").renameTo(new File((path.substring(0,path.lastIndexOf("/")+1))+"Images/"+imageFile1+".tif")));
					try
					{
						//FileInputStream fis=new FileInputStream(rsstmntCustid.getString("IMAGEPATH")+"/"+rsstmntCustid.getString("CMM_CHQ_IMG"));
						FileInputStream fis=new FileInputStream(new File(imgFileNm+".BF"));
						//File outFilePath=new File(new File(".").getCanonicalFile().getParent()+"/webapps/APS/temp/"+rsstmntCustid.getString("CMM_ENTRY_BY")+"/");
						File outFilePath=new File(((path.substring(0,path.lastIndexOf("/")+1))+"Images/"+imageFile1+".tif"));
						FileOutputStream fos=new FileOutputStream(outFilePath);
						int b;
						while(true)
						{
							b=fis.read();
							if(b==-1) break;
							fos.write(b);
						}
						fis.close();
						fos.close();
					}
					catch(Exception e1)
					{
						System.out.println("Erroromkar "+e1);
					}
					System.out.println("*********** 4**** "+imageFile2);
					System.out.println(new File(imgFileNm+".BR").renameTo(new File((path.substring(0,path.lastIndexOf("/")+1))+"Images/"+imageFile2+".tif")));
					try
					{
						//FileInputStream fis=new FileInputStream(rsstmntCustid.getString("IMAGEPATH")+"/"+rsstmntCustid.getString("CMM_CHQ_IMG"));
						FileInputStream fis=new FileInputStream(new File(imgFileNm+".BR"));
						//File outFilePath=new File(new File(".").getCanonicalFile().getParent()+"/webapps/APS/temp/"+rsstmntCustid.getString("CMM_ENTRY_BY")+"/");
						File outFilePath=new File(((path.substring(0,path.lastIndexOf("/")+1))+"Images/"+imageFile2+".tif"));
						FileOutputStream fos=new FileOutputStream(outFilePath);
						int b;
						while(true)
						{
							b=fis.read();
							if(b==-1) break;
							fos.write(b);
						}
						fis.close();
						fos.close();
					}
					catch(Exception e1)
					{
						System.out.println("Erroromkar "+e1);
					}
					System.out.println("*********** 4**** "+imageFile3);
					System.out.println(new File(imgFileNm+".GF").renameTo(new File((path.substring(0,path.lastIndexOf("/")+1))+"Images/"+imageFile3+".jpg")));
					try
					{
						//FileInputStream fis=new FileInputStream(rsstmntCustid.getString("IMAGEPATH")+"/"+rsstmntCustid.getString("CMM_CHQ_IMG"));
						FileInputStream fis=new FileInputStream(new File(imgFileNm+".GF"));
						//File outFilePath=new File(new File(".").getCanonicalFile().getParent()+"/webapps/APS/temp/"+rsstmntCustid.getString("CMM_ENTRY_BY")+"/");
						File outFilePath=new File(((path.substring(0,path.lastIndexOf("/")+1))+"Images/"+imageFile3+".jpg"));
						FileOutputStream fos=new FileOutputStream(outFilePath);
						int b;
						while(true)
						{
							b=fis.read();
							if(b==-1) break;
							fos.write(b);
						}
						fis.close();
						fos.close();
					}
					catch(Exception e1)
					{
						System.out.println("Erroromkar "+e1);
					}
					//System.out.println("*********** 5 **** ");
				}
			}//end try
	  		catch(Exception e)
	  		{//catch
	  			e.printStackTrace();
	  			System.out.println("Error while reading PXF\n"+e.getMessage());
	  			flg=true;
	  		}//catch
	  		finally
	  		{
				try
				{
					pw.close();
					pst.close();
					pst1.close();
					pst3.close();
					stmt_getSeqVal.close();
					con.close();
				}
				catch(Exception e)
				{}
			}
			System.out.println("****** 14 *****");
			return flg;
	  }//end readPXF
*/
}