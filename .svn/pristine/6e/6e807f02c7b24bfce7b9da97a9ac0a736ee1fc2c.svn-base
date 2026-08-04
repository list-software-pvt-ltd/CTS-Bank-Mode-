<%@ page contentType="text/html; charset=iso-8859-1" language="java"
import="java.sql.*" import="org.apache.commons.io.FileUtils" errorPage="" %>
<%@page import="java.util.*"%>
<%@page import="java.io.*"%>
<%@page import="java.text.*"%>
<%@page import="cts.*"%>

<%
			Connection cn = Configuration.getConnection(); 
			String sysdate=Configuration.getDDMMYYYY();//DSP sysdate
			System.out.println("#############	in list_branches.jsp");
			String up_path = Configuration.getConfValByNm("CFG_uploadpath_to_CHI",cn);
			System.out.println("up_path#########    "+up_path+"      #######");
			String path = "", folderName="" ;
			String fileNameList = "";
			BufferedReader br = null;
			int brnFoundCount = 0;
			PreparedStatement pst = null;
			path = up_path +"/";
			//System.out.println("Path="+path);
			
			String res=null;
			String msg="";	
			int i=0,j=0;
			StringBuffer thisBuffer=new StringBuffer();
			
			String query="";

			try
			{
				
				DecimalFormat df = new DecimalFormat("0.00");
				System.out.println("cn="+cn);
				if(cn == null)
					throw new Exception("Session is Null");
				
				
			/*	query="select BRNCD,BRM_BRNNM, count(CLO_CHQNO),nvl(sum(CLO_AMOUNT),'0')  from CLEARINGOUTWARD, BRANCHMSTR where  CLO_BRANCH_CD(+) = BRM_BRNCD and nvl(CLO_CONVERT_FLG,?) = ? and nvl(CLO_DATE_DDMMYYYY,?) = ? group by BRM_BRNCD,BRM_BRNNM order by 1";*/
			{
				//query="select A.BRM_BRNCD,A.BRM_BRNNM,(select count(*) from CLEARINGOUTWARD where nvl(CLO_CONVERT_FLG,'Y') = 'Y'  and  CLO_BRANCH_CD= A.BRM_BRNCD AND CLO_DATE_DDMMYYYY=TO_CHAR(SYSDATE,'DDMMYYYY')) UpCnt, (select nvl(sum(CLO_AMOUNT),'0') from CLEARINGOUTWARD where nvl(CLO_CONVERT_FLG,'Y') = 'Y' and   CLO_BRANCH_CD= A.BRM_BRNCD AND CLO_DATE_DDMMYYYY=TO_CHAR(SYSDATE,'DDMMYYYY')) UpCntTotAmt,(select count(*) from CLEARINGOUTWARD where nvl(CLO_CONVERT_FLG,'N') = 'N'  and  CLO_BRANCH_CD= A.BRM_BRNCD AND CLO_DATE_DDMMYYYY=TO_CHAR(SYSDATE,'DDMMYYYY')) Notupcnt from BRANCHMSTR A where A.BRM_SCANNERYN='Y' and A.BRM_BRNCD=round(A.BRM_BRNCD) order by 1";
				query="select A.BRM_BRNCD,A.BRM_BRNNM,(select count(*) from CLEARINGOUTWARD where nvl(CLO_CONVERT_FLG,'Y') = 'Y'  and  CLO_BRANCH_CD= A.BRM_BRNCD AND CLO_DATE_DDMMYYYY=?) UpCnt, (select nvl(sum(CLO_AMOUNT),'0') from CLEARINGOUTWARD where nvl(CLO_CONVERT_FLG,'Y') = 'Y' and   CLO_BRANCH_CD= A.BRM_BRNCD AND CLO_DATE_DDMMYYYY=?) UpCntTotAmt,(select count(*) from CLEARINGOUTWARD where nvl(CLO_CONVERT_FLG,'N') = 'N'  and  CLO_BRANCH_CD= A.BRM_BRNCD AND CLO_DATE_DDMMYYYY=?) Notupcnt from BRANCHMSTR A where A.BRM_SCANNERYN='Y' and A.BRM_BRNCD=round(A.BRM_BRNCD) order by 1";
				
				//System.out.println(query);
				PreparedStatement ps=cn.prepareStatement(query);
				ps.setString(1,Configuration.getDDMMYYYY());
				ps.setString(2,Configuration.getDDMMYYYY());
				ps.setString(3,Configuration.getDDMMYYYY());
				//ps.setString(4,Configuration.getDDMMYYYY());
				ResultSet rs=ps.executeQuery();
						
				i=1;
				
				while(rs.next())
				{
					//System.out.println("IN WHILE ............");
					
					thisBuffer.append(rs.getString(1)+"#"+rs.getString(2)+"#"+rs.getString(3)+"#"+df.format(Double.parseDouble(rs.getString(4))/100)+"#"+rs.getString(5)+"$");
					
					i++;	
				
				}
			}
			thisBuffer.append("!^!");
			{
				//query="select A.BRM_BRNCD,A.BRM_BRNNM,(select count(*) from CLEARINGOUTWARD where nvl(CLO_CONVERT_FLG,'Y') = 'Y'  and  CLO_BOFD= (select BRM_MICRCD from BRANCHMSTR where brm_BRNCD=A.BRM_BRNCD) AND CLO_DATE_DDMMYYYY=TO_CHAR(SYSDATE,'DDMMYYYY')) UpCnt, (select nvl(sum(CLO_AMOUNT),'0')from CLEARINGOUTWARD where nvl(CLO_CONVERT_FLG,'Y') = 'Y' and   CLO_BOFD= (select BRM_MICRCD from BRANCHMSTR where brm_BRNCD=A.BRM_BRNCD) AND CLO_DATE_DDMMYYYY=TO_CHAR(SYSDATE,'DDMMYYYY')) UpCntTotAmt,(select count(*) from CLEARINGOUTWARD where nvl(CLO_CONVERT_FLG,'N') = 'N'  and CLO_BOFD= (select BRM_MICRCD from BRANCHMSTR where brm_BRNCD=A.BRM_BRNCD) AND CLO_DATE_DDMMYYYY=TO_CHAR(SYSDATE,'DDMMYYYY')) Notupcnt from BRANCHMSTR A where A.BRM_BRNCD=round(A.BRM_BRNCD) order by 1";
				query="select A.BRM_BRNCD,A.BRM_BRNNM,(select count(*) from CLEARINGOUTWARD where nvl(CLO_CONVERT_FLG,'Y') = 'Y'  and  CLO_BOFD= (select BRM_MICRCD from BRANCHMSTR where brm_BRNCD=A.BRM_BRNCD) AND CLO_DATE_DDMMYYYY=?) UpCnt, (select nvl(sum(CLO_AMOUNT),'0')from CLEARINGOUTWARD where nvl(CLO_CONVERT_FLG,'Y') = 'Y' and   CLO_BOFD= (select BRM_MICRCD from BRANCHMSTR where brm_BRNCD=A.BRM_BRNCD) AND CLO_DATE_DDMMYYYY=?) UpCntTotAmt,(select count(*) from CLEARINGOUTWARD where nvl(CLO_CONVERT_FLG,'N') = 'N'  and CLO_BOFD= (select BRM_MICRCD from BRANCHMSTR where brm_BRNCD=A.BRM_BRNCD) AND CLO_DATE_DDMMYYYY=?) Notupcnt from BRANCHMSTR A where A.BRM_BRNCD=round(A.BRM_BRNCD) order by 1";
				
				//System.out.println(query);
				PreparedStatement ps=cn.prepareStatement(query);
				ps.setString(1,Configuration.getDDMMYYYY());
				ps.setString(2,Configuration.getDDMMYYYY());
				ps.setString(3,Configuration.getDDMMYYYY());
				//ps.setString(4,Configuration.getDDMMYYYY());
				ResultSet rs=ps.executeQuery();
						
				i=1;
				
				while(rs.next())
				{
					//System.out.println("IN WHILE ............");
					
					thisBuffer.append(rs.getString(1)+"#"+rs.getString(2)+"#"+rs.getString(3)+"#"+df.format(Double.parseDouble(rs.getString(4))/100)+"#"+rs.getString(5)+"$");
					
					i++;	
				
				}
			}
				if(i==1)
				{
					System.out.println("NO_DATA............");
					thisBuffer.append("NO_DATA#NO_DATA$");	
				}
				
		
			}
			catch(Exception e)
			{
				//out.println("~~~~Exception  :"+e);
				System.out.println("\n\n\n\n\n\n");
				System.out.println("Exception in list_branches.jsp::::>>>"+e);
				e.printStackTrace();
				if(e.getMessage().indexOf("Session is Null")>-1)
				{
					thisBuffer.append("SessionIsNull");	
				}
				else
				{
					thisBuffer.append("ERR#ERR$"+e);		
				}	
			}
			finally
			{
				cn.close();
			}

	 
						
%>
<%=thisBuffer.toString()%>