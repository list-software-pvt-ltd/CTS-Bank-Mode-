package cts;
import java.sql.*;

//flg= 1 means success, 0 means false,2 means exception
public class OutwardValidations
{//OutwardValidations

	public static int validateClearingOutward()
	{//validateAllCheques
		Connection con=null;
		ResultSet rs=null;
		PreparedStatement ps=null;
		int retVal=0;
		 try
		 {
			con=Configuration.getConnection();
			 ps=con.prepareStatement("select count(*) from clearingoutward where CLO_DATE_DDMMYYYY=? and CLO_WARNING_CODE is null");
			 ps.setString(1,Configuration.getDDMMYYYY());
			 rs=ps.executeQuery();
			 int count=0;
			 while(rs.next())
			 {
				 	count=rs.getInt(1);
			 }
			 System.out.println("\n\t Count:"+count);
			 if(count!=0)
			 {

				retVal=validatePresentingBankRoutNo();
				retVal+=validatePayOrRountingCode();
				retVal+=validateTransactionCode();
				retVal+=validationDraweeCityValidation();

			}
			else
			{
					System.out.println("\n\t Validation is already done for this lot..... ");
			}
		 }catch(Exception e){}
		 finally
		 {
			 	try
			 	{
						if(rs!=null)
							rs.close();
					   if(ps!=null)
							ps.close();
					  if(con!=null)
							con.close();
				}
				catch(Exception e){}
		}
		return retVal;
	}//validateAllCheques

	public static int validatePresentingBankRoutNo()
	{//validatePresentingBankRoutNo
			int flg=0;
			Connection con=null;
			PreparedStatement ps=null,ps1=null;
			ResultSet rs=null;
			try
			{
					int rs_count=0;
					con=Configuration.getConnection();
					String presentingBankRoutNo=Configuration.getConfValByNm("CFG_BANKROUTINGCODE",con);
					

					ps=con.prepareStatement("select count(*) from BANKMASTER_CHM where BNK_ROUTING_NBR=? and BNK_CLEARING_STATUS_CODE='CLEARING'");
//NOTE: if presentingBankRoutNo is not valid then we update cleringoutward all record with CLO_WARNING_CODE=1 b'coz presentingBankRoutNo is for bank and it is command for all record.
					ps1=con.prepareStatement("update clearingoutward set CLO_WARNING_CODE=CLO_WARNING_CODE||'1'||'~'  where CLO_DATE_DDMMYYYY=?");
					ps.setString(1,presentingBankRoutNo);
					rs=ps.executeQuery();
					while(rs.next())
					{
						rs_count=rs.getInt(1);
					}
					System.out.println("\n\t Count:"+rs_count);
					if(rs_count>0)
					{
							flg=1;
					}
					else
					{
						ps1.setString(1,Configuration.getDDMMYYYY());
						if(ps1.executeUpdate()>0)
						{
								System.out.println("\n\t Record is updated for presentingBankRoutNo");
						}
					}
			}
			catch(SQLException e)
			{
					System.out.println("\n\t SQLException  in OutwardValidation.validatePresentingBankRoutNo:"+e);
					flg=2;
			}
			catch(Exception e)
			{
					System.out.println("\n\t Exception in OutwardValidation.validatePresentingBankRoutNo:"+e);
					flg=2;
			}
			finally
			{
					try
					{
							if(con!=null && ps!=null && rs!=null)
							{
									rs.close();
									ps.close();
									ps1.close();
									con.close();
							}
					}
					catch(Exception e){}
			}
			return flg;
	}//validatePresentingBankRoutNo

		public static int validatePayOrRountingCode()
		{//validatePayOrRountingCode
				int flg=0;
				Connection con=null;
				PreparedStatement ps=null;
				PreparedStatement ps1=null;
				PreparedStatement ps2=null;
				ResultSet rs=null;
				ResultSet rs1=null;
				try
				{//try
						int rs_count=0;
						con=Configuration.getConnection();
						String sql="select CLO_SORTCD,CLO_CHQNO,CLO_TRANCD,CLO_AMOUNT,CLO_DRAWEE_ACCNO,CLO_CLEARINGTYPE from clearingoutward where CLO_DATE_DDMMYYYY=? and CLO_CONVERT_FLG='N'";
						ps=con.prepareStatement(sql);
					    ps.setString(1,Configuration.getDDMMYYYY());
						rs=ps.executeQuery();
						//ps1=con.prepareStatement("select count(*) from [table_name] where [PAYOR_BANK_ROUTING_NBR]=?");
						//ps2=con.prepareStatement("update clearingoutward set CLO_WARNING_CODE=CLO_WARNING_CODE||'2'||'~' where CLO_CHQNO=?,CLO_TRANCD=?,CLO_AMOUNT=?,CLO_DRAWEE_ACCNO=?,CLO_CLEARINGTYPE=? and  CLO_DATE_DDMMYYYY=? ");
						ps2=con.prepareStatement("update clearingoutward set CLO_WARNING_CODE=CLO_WARNING_CODE||'2'||'~' where CLO_CHQNO=? and CLO_TRANCD=? and CLO_AMOUNT=? and CLO_DRAWEE_ACCNO=? and CLO_CLEARINGTYPE=? and  CLO_DATE_DDMMYYYY=? and CLO_SORTCD not in(select BNK_ROUTING_NBR from BANKMASTER_CHM)");


						int cnt=0;
						while(rs.next())
						{//1
						//CLO_SORTCD,CLO_CHQNO,CLO_TRANCD,CLO_AMOUNT,CLO_DRAWEE_ACCNO,CLO_CLEARINGTYPE
							String CLO_SORTCD=rs.getString(1);
							String CLO_CHQNO=rs.getString(2);
							String CLO_TRANCD=rs.getString(3);
							String CLO_AMOUNT=rs.getString(4);
							String CLO_DRAWEE_ACCNO=rs.getString(5);
							String CLO_CLEARINGTYPE=rs.getString(6);


							/*System.out.println("\n\t PAYOR_BANK_ROUTING:"+rs.getString(1));
							ps1.setString(1,rs.getString(1));
							rs1=ps1.executeQuery();

							int count=0;
							while(rs1.next())
							{//2
								count=rs1.getInt(1);
							}//2

							if(count==0)
							{//3*/
							/*CLO_CHQNO=?,
							CLO_TRANCD=?,
							CLO_AMOUNT=?,
							CLO_DRAWEE_ACCNO=?,
							CLO_CLEARINGTYPE=?
							and  CLO_DATE_DDMMYYYY=? */
								ps2.setString(1,CLO_CHQNO);
								ps2.setString(2,CLO_TRANCD);
								ps2.setString(3,CLO_AMOUNT);
								ps2.setString(4,CLO_DRAWEE_ACCNO);
								ps2.setString(5,CLO_CLEARINGTYPE);
								ps2.setString(6,Configuration.getDDMMYYYY());
								if(ps2.executeUpdate()>0)
								{//4
										System.out.println("\n\t validation of payOrRountingCode is done for cheque No:"+CLO_CHQNO);
										cnt++;
								}//4
							//}//3
						}//1

						if(cnt>0)
						{
							flg=1;
						}
				}//try
				catch(SQLException e)
				{
						System.out.println("\n\t SQLException  in OutwardValidation.validatePayOrRountingCode:"+e);
						flg=2;
				}
				catch(Exception e)
				{
						System.out.println("\n\t Exception in OutwardValidation.validatePayOrRountingCode:"+e);
						flg=2;
				}
				finally
				{
						try
						{
								if(con!=null && ps!=null && rs!=null && rs1!=null && ps1!=null)
								{
										rs.close();
										rs1.close();
										ps.close();
										ps1.close();
										ps2.close();
										con.close();
								}
						}
						catch(Exception e){}
				}
				return flg;
	}//validatePayOrRountingCode


public static int validateTransactionCode()
	{//validateTransactionCode
			int flg=0;
			Connection con=null;
			PreparedStatement ps_allTransCode=null;
			PreparedStatement ps_isValidTransCd=null;
			PreparedStatement ps_updateWrnCode=null;
			ResultSet rs_allTransCd=null;
			ResultSet rs_cnt=null;
			try
			{
					int rs_count=0;
					con=Configuration.getConnection();

					ps_isValidTransCd=con.prepareStatement("select count(*) from TRANSACTIONCODE_CHM where TRN_CODE=?");

					ps_updateWrnCode=con.prepareStatement("update clearingoutward set CLO_WARNING_CODE=CLO_WARNING_CODE||'3'||'~'  where CLO_CHQNO=? and CLO_TRANCD=? and CLO_AMOUNT=? and CLO_DRAWEE_ACCNO=? and CLO_CLEARINGTYPE=? and  CLO_DATE_DDMMYYYY=?");

					ps_allTransCode=con.prepareStatement("select CLO_TRANCD,CLO_CHQNO,CLO_AMOUNT,CLO_DRAWEE_ACCNO,CLO_CLEARINGTYPE from clearingoutward where CLO_DATE_DDMMYYYY=? and CLO_CONVERT_FLG='N'");
					ps_allTransCode.setString(1,Configuration.getDDMMYYYY());
					rs_allTransCd=ps_allTransCode.executeQuery();
					while(rs_allTransCd.next())
					{//1
						String CLO_TRANCD=rs_allTransCd.getString(1);
						String CLO_CHQNO=rs_allTransCd.getString(2);
						String CLO_AMOUNT=rs_allTransCd.getString(3);
						String CLO_DRAWEE_ACCNO=rs_allTransCd.getString(4);
						String CLO_CLEARINGTYPE=rs_allTransCd.getString(5);

						ps_isValidTransCd.setString(1,CLO_TRANCD);
						rs_cnt=ps_isValidTransCd.executeQuery();
						while(rs_cnt.next())
						{//2
								rs_count=rs_cnt.getInt(1);
						}//2

						if(rs_count==0)
						{//3
								//update CLO_WARNING_CODE record in clearingoutward table.
								ps_updateWrnCode.setString(1,CLO_CHQNO);
								ps_updateWrnCode.setString(2,CLO_TRANCD);
								ps_updateWrnCode.setString(3,CLO_AMOUNT);
								ps_updateWrnCode.setString(4,CLO_DRAWEE_ACCNO);
								ps_updateWrnCode.setString(5,CLO_CLEARINGTYPE);
								ps_updateWrnCode.setString(6,Configuration.getDDMMYYYY());
								if(ps_updateWrnCode.executeUpdate()>0)
								{//4
									System.out.println("\n\t validateTransactionCode is updated for chequeNo::"+CLO_CHQNO);
								}//4
						}//3
					}//1
			}
			catch(SQLException e)
			{
					System.out.println("\n\t SQLException  in OutwardValidation.validatePresentingBankRoutNo:"+e);
					flg=2;
			}
			catch(Exception e)
			{
					System.out.println("\n\t Exception in OutwardValidation.validatePresentingBankRoutNo:"+e);
					flg=2;
			}
			finally
			{
					try
					{
							if(con!=null && ps_updateWrnCode!=null && ps_allTransCode!=null)
							{
									rs_cnt.close();
									ps_updateWrnCode.close();
									ps_allTransCode.close();
									ps_isValidTransCd.close();
									con.close();
							}
					}
					catch(Exception e){}
			}
			return flg;
	}//validateTransactionCode


	public static int validationPaperToFollow()
	{//validateTransactionCode
	/*
			Ensure that BOFD city code equals drawee city code for P2F cheques.
			This ensures that paper to follow transactions are allowed only within the city and not across cities
	*/
			int flg=0;
			Connection con=null;
			PreparedStatement ps_allTransCode=null,ps_allPayOrBankRouteCode=null;
			PreparedStatement ps_isValidCityCd=null;
			PreparedStatement ps_updateWrnCode=null;
			ResultSet rs_allSortCd=null;
			ResultSet rs_cnt=null;
			try
			{
					int rs_count=0;
					con=Configuration.getConnection();
					String BOFDRoutNo =Configuration.getConfValByNm("CFG_SERVICEBNKROUTINGCODE",con);
					//BOFDRoutNo:416402002
					System.out.println("\n\t BOFDRoutNo:>>"+BOFDRoutNo);
					String cityCode_ourBnk=BOFDRoutNo.substring(0,2);
					System.out.println("\n\t cityCode:>>"+cityCode_ourBnk);

					ps_updateWrnCode=con.prepareStatement("update clearingoutward set CLO_WARNING_CODE=CLO_WARNING_CODE||'4'||'~' where CLO_CHQNO=?,CLO_TRANCD=?,CLO_AMOUNT=?,CLO_DRAWEE_ACCNO=?,CLO_CLEARINGTYPE=? and  CLO_DATE_DDMMYYYY=?");
					//ps_allPayOrBankRouteCode=con.prepareStatement("select CLO_SORTCD,CLO_CHQNO,CLO_TRANCD,CLO_AMOUNT,CLO_DRAWEE_ACCNO,CLO_CLEARINGTYPE from clearingoutward where CLO_DATE_DDMMYYYY=? and CLO_CONVERT_FLG='N'");
					ps_allPayOrBankRouteCode=con.prepareStatement("select CLO_SORTCD,CLO_CHQNO,CLO_TRANCD,CLO_AMOUNT,CLO_DRAWEE_ACCNO,CLO_CLEARINGTYPE from clearingoutward where CLO_DATE_DDMMYYYY=? and CLO_CONVERT_FLG='N' and substr(?,1,3)<>substr(CLO_SORTCD,1,3) and CLO_PPRTOFOLLOW='Y'");
					//CLO_SORTCD means payorbank code which is get from From_CBS_Clearing_Outward.txt file.
					//Ex:KOTAK MAHINDRA BANK LTD Kolhapur Branch:416485002
					rs_allSortCd=ps_allTransCode.executeQuery();
					while(rs_allSortCd.next())
					{//1
						String CLO_SORTCD=rs_allSortCd.getString(1);
						String CLO_CHQNO=rs_allSortCd.getString(2);
						String CLO_TRANCD=rs_allSortCd.getString(3);
						String CLO_AMOUNT=rs_allSortCd.getString(4);
						String CLO_DRAWEE_ACCNO=rs_allSortCd.getString(5);
						String CLO_CLEARINGTYPE=rs_allSortCd.getString(6);

						/*String cityCode_drawee=CLO_SORTCD.substring(0,2);
						System.out.println("\n\t cityCode_drawee: "+cityCode_drawee);
							//ex:416												--416
						if(!(cityCode_ourBnk.equalsIgnoreCase(cityCode_drawee)))
						{//3*/
								//update CLO_WARNING_CODE record in clearingoutward table.
								ps_updateWrnCode.setString(1,CLO_CHQNO);
								ps_updateWrnCode.setString(2,CLO_TRANCD);
								ps_updateWrnCode.setString(3,CLO_AMOUNT);
								ps_updateWrnCode.setString(4,CLO_DRAWEE_ACCNO);
								ps_updateWrnCode.setString(5,CLO_CLEARINGTYPE);
								ps_updateWrnCode.setString(6,Configuration.getDDMMYYYY());
								if(ps_updateWrnCode.executeUpdate()>0)
								{
										System.out.println("\n\t validationPaperToFollow is updated for CLO_CHQNO:>>"+CLO_CHQNO);
										rs_count++;
								}
						//}//3
					}//1

					if(rs_count>0)
						flg=1;
			}
			catch(SQLException e)
			{
					System.out.println("\n\t SQLException  in OutwardValidation.validationPaperToFollow:"+e);
					flg=2;
			}
			catch(Exception e)
			{
					System.out.println("\n\t Exception in OutwardValidation.validationPaperToFollow:"+e);
					flg=2;
			}
			finally
			{
					try
					{
							if(con!=null && ps_updateWrnCode!=null && ps_allPayOrBankRouteCode!=null)
							{
									rs_allSortCd.close();
									ps_updateWrnCode.close();
									ps_allPayOrBankRouteCode.close();
									con.close();
							}
					}
					catch(Exception e){}
			}
			return flg;
	}//validationPaperToFollow

	//Drawee city validation:
	public static int validationDraweeCityValidation()
		{//validationDraweeCityValidation

				int flg=0;
				Connection con=null;
				PreparedStatement ps_allPayOrBankRouteCode=null;
				PreparedStatement ps_updateWrnCode=null;
				ResultSet rs_allSortCd=null;
				ResultSet rs_cnt=null;
				try
				{
						int rs_count=0;
						con=Configuration.getConnection();

						String sql="select CLO_SORTCD,CLO_CHQNO,CLO_TRANCD,CLO_AMOUNT,CLO_DRAWEE_ACCNO,CLO_CLEARINGTYPE from clearingoutward c where 1=(select 1 from dual where C.CLO_SORTCD in (select BNK_ROUTING_NBR from BANKMASTER_CHM";
									sql+=" where BNK_CBS_ENABLED='0' and substr(BNK_ROUTING_NBR,1,3) in(select CITY_CODE from CITYMASTER_CHM where CITY_CLEARINGTYPE=C.CLO_CLEARINGTYPE)))";

						ps_updateWrnCode=con.prepareStatement("update clearingoutward set CLO_WARNING_CODE=CLO_WARNING_CODE||'5'||'~' where CLO_CHQNO=? and CLO_TRANCD=? and CLO_AMOUNT=? and CLO_DRAWEE_ACCNO=? and  CLO_CLEARINGTYPE=? and  CLO_DATE_DDMMYYYY=?");
						ps_allPayOrBankRouteCode=con.prepareStatement(sql);

						rs_allSortCd=ps_allPayOrBankRouteCode.executeQuery();
						while(rs_allSortCd.next())
						{//1
							String CLO_SORTCD=rs_allSortCd.getString(1);
							String CLO_CHQNO=rs_allSortCd.getString(2);
							String CLO_TRANCD=rs_allSortCd.getString(3);
							String CLO_AMOUNT=rs_allSortCd.getString(4);
							String CLO_DRAWEE_ACCNO=rs_allSortCd.getString(5);
							String CLO_CLEARINGTYPE=rs_allSortCd.getString(6);

									ps_updateWrnCode.setString(1,CLO_CHQNO);
									ps_updateWrnCode.setString(2,CLO_TRANCD);
									ps_updateWrnCode.setString(3,CLO_AMOUNT);
									ps_updateWrnCode.setString(4,CLO_DRAWEE_ACCNO);
									ps_updateWrnCode.setString(5,CLO_CLEARINGTYPE);
									ps_updateWrnCode.setString(6,Configuration.getDDMMYYYY());
									if(ps_updateWrnCode.executeUpdate()>0)
									{
											System.out.println("\n\t validationDraweeCityValidation is updated for CLO_CHQNO:>>"+CLO_CHQNO);
											rs_count++;
									}
						}//1

						if(rs_count>0)
							flg=1;
				}
				catch(SQLException e)
				{
						System.out.println("\n\t SQLException  in OutwardValidation.validationDraweeCityValidation:"+e);
						flg=2;
				}
				catch(Exception e)
				{
						System.out.println("\n\t Exception in OutwardValidation.validationDraweeCityValidation:"+e);
						flg=2;
				}
				finally
				{
						try
						{
								if(con!=null && ps_updateWrnCode!=null && ps_allPayOrBankRouteCode!=null)
								{
										rs_allSortCd.close();
										ps_updateWrnCode.close();
										ps_allPayOrBankRouteCode.close();
										con.close();
								}
						}
						catch(Exception e){}
				}
				return flg;
	}//validationDraweeCityValidation

}//OutwardValidations