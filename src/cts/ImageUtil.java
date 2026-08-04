package cts;

import javax.xml.stream.*;
import java.io.*;
import java.util.*;
import java.sql.*;
public class ImageUtil
{//Util

		public static StringBuffer getReturnOutwardImgPath()
		{//getReturnOutwardImgPath
				System.out.println("\n\t ---- inside getReturnOutwardImgPath: ----");
				PreparedStatement ps1=null;
				PreparedStatement ps2=null;
				Connection con=null;
				ResultSet rs=null;
				StringBuffer strCheque=new StringBuffer(" ");
				try
				{//try
						//this query return backup date( date when backup is taken) ,from that we compare this
						//date with current date.
						//if this date is current date then return local image path( not archive path)
						//if date is not current date then retrive value of  ISLOGINFORADAY (b'coz we make folder of this value.)
						int count=0;
						con=Configuration.getConnection();
						String sql="select A.CLI_PAYORBANKROUTNO,B.RTO_CHEQUENO,nvl((select BACKUPDATE from BACKUPSTATUS where MAX_DATE_OF_CLEARINGINWARD=";
						sql+="(select CLI_DDMMYYYY from CLEARINGINWARD where CLI_PAYORBANKROUTNO=A.CLI_PAYORBANKROUTNO and CLI_SERIALNO=A.CLI_SERIALNO)),'NA') ";
						sql+="BACKUPDATE ,A.CLI_AMOUNT from CLEARINGINWARD A,RETRUNOUTWARD B where A.CLI_PAYORBANKROUTNO=B.RTO_PAYORBANKROUTNO and A.CLI_SERIALNO=B.RTO_CHEQUENO";
						ps1=con.prepareStatement(sql);
						rs=ps1.executeQuery();

						while(rs.next())
						{//1
								String payorBankRoutNo=rs.getString(1);
								String chequeNo=rs.getString(2);
								String dateOfBackup=rs.getString(3);
								String amount=rs.getString(4);
								String dir="";
								if(dateOfBackup.equalsIgnoreCase("NA"))
								{
										dir="CURRENT";//current means u hv to look for images in uploadpath_to_CHI not in 'archive'
								}
								else
								{
										dir="ARCHIVE";//current means u hv to look for images in  'archive' not in uploadpath_to_CHI
								}

								System.out.println("\n\tchequeNo:"+chequeNo);
								System.out.println("\n\tpayorBankRoutNo:+"+payorBankRoutNo);
								System.out.println("\n\tdir:"+dir);
								System.out.println("dateOfBackup:"+dateOfBackup);
								strCheque.append(chequeNo+"_"+payorBankRoutNo+"#"+chequeNo+"_"+payorBankRoutNo+"#"+amount+"#"+chequeNo+"#"+payorBankRoutNo+"#"+dir+"#"+dateOfBackup+"$");
						}//1
				}//try
				catch(Exception e)
				{//catch
							System.out.println("\n\tException in ImageUtil.getReturnOutwardImgPath:"+e);
							strCheque.append("Fail#");
				}//catch
				finally
				{
					try
					 {
					 	if(rs!=null)
						{
							rs.close();
						}
						if(ps1!=null)
						{
							ps1.close();
						}
						if(ps2!=null)
						{
							ps2.close();
						}
						if(con!=null)
						{
							con.close();
						}
					}catch(Exception e){}
				}
				System.out.println("\n\tExit from ImageUtil.getReturnOutwardImgPath:"+strCheque);
				return strCheque;
		}//end getReturnOutwardImgPath
}//end Util