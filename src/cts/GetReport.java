package cts;

import java.io.*;
import java.util.*;
import java.sql.*;
import java.awt.image.*;
import javax.imageio.*;
import org.apache.commons.codec.binary.*;
import java.security.spec.*;
import java.security.*;
import java.util.*;
import java.security.*;
import java.nio.*;
import java.nio.channels.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import java.text.SimpleDateFormat;

public class GetReport
{

		public static StringBuffer getClearingOutward(String rptDate)
		{//1
				Connection con=null;
				PreparedStatement ps=null;
				ResultSet rs=null;
				StringBuffer str=new StringBuffer("");
				String sql_clearingOutward="select CLO_CHQNO,CLO_SORTCD,CLO_PAYEE_ACCNM,CLO_IMG_FRNT_GR from CLEARINGOUTWARD where CLO_DATE_DDMMYYYY=?";

				try
				{//2
					int counter=0;
					con=Configuration.getConnection();
					ps=con.prepareStatement(sql_clearingOutward);
					ps.setString(1,rptDate);
					rs=ps.executeQuery();
						while(rs.next())
						{//3
								str.append(rs.getString(1)+"#");
								str.append(rs.getString(2)+"#");
								str.append(rs.getString(3)+"#");
								str.append(rs.getString(4)+"#");
								counter++;
						}//3

						if(counter>0)
							return str;
						else
							return str.append("No Record Found#");


				}//2
				catch(Exception e)
				{//2
						System.out.println("\n\t Exception in GetReport.getReportString():"+e);
				}//2
				finally
				{//2
					 try
					 {
					 	if(rs!=null)
						{
							rs.close();
						}
						if(ps!=null)
						{
							ps.close();
						}
						if(con!=null)
						{
							con.close();
						}
					}catch(Exception e){}
				}//2
				return str;
		}//1

		//public static String getCorrespondingFilePath()
		public static StringBuffer getClearingInward(String rptDate)
		{//2

					Connection con=null;
					PreparedStatement ps=null;
					String sql_returnInward="select * from CLEARINGINWARD where CLI_CREATIONDATE=?";
					try
					{

					}
					catch(Exception e)
					{
										System.out.println("\n\t Exception in GetReport.getReportString():"+e);
					}
					return null;
		}//2

		public static StringBuffer getReturnOutward(String rptDate)
		{//2
					Connection con=null;
						PreparedStatement ps=null;
						String sql_returnInward="select * from RETRUNOUTWARD where CREATIONDATE=?";
						try
						{

						}
						catch(Exception e)
						{
								System.out.println("\n\t Exception in GetReport.getReportString():"+e);
						}
						return null;
		}//2

		public static StringBuffer getReturnInward(String rptDate)
		{//2

				Connection con=null;
						PreparedStatement ps=null;
						String sql_returnInward="select * from RETURNINWARD where CREATIONDATE=?";
						try
						{

						}
						catch(Exception e)
						{
									System.out.println("\n\t Exception in GetReport.getReportString():"+e);
						}
						return null;
		}//2
}//end