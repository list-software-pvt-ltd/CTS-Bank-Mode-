package cts;
import java.sql.*;

public class ReturnValidation
{//ReturnValidation

			public static void validateItmReturnReasonCode()
			{//validateItmReturnReasonCode
				Connection con=null;
				PreparedStatement ps=null;
				PreparedStatement ps_update=null;
				ResultSet rs=null;
				String sql="select RTO_CHEQUENO, RTO_SORTCODE from RETRUNOUTWARD ";
							sql+= " where RTO_RETURNREASONCODE not in(select ITM_RETURN_REASON_CODE from ITEMRETURNREASON_CHM)";
							sql+="  and RTO_DDMMYYYY=? and RTO_STATUS='Y'";
				String sql_update="update RETRUNOUTWARD set RTO_WRN_CODE=RTO_WRN_CODE||5||'~'";
							sql_update+=" where RTO_CHEQUENO=? and  RTO_SORTCODE=? and  RTO_DDMMYYYY=?";
			 int i=0;
				try
				{
						con=Configuration.getConnection();
						ps=con.prepareStatement(sql);
						ps.setString(1,Configuration.getDDMMYYYY());
						rs=ps.executeQuery();
						ps_update=con.prepareStatement(sql_update);
						while(rs.next())
						{
							 ps_update.setString(1,rs.getString(1));
							 ps_update.setString(2,rs.getString(2));
							 ps_update.setString(3,Configuration.getDDMMYYYY());

							 if(ps_update.executeUpdate()>0)
							 {
									System.out.println("\n\t Record is Updated in validateItmReturnReasonCode of cheque No:"+rs.getString(1));
							 }
						}
				}
				catch(SQLException e)
				{
					System.out.println("\n\t SQLException in ReturnValidation.validateItmReturnReasonCode:"+e);
				}
				catch(Exception e)
				{
					System.out.println("\n\t Exception in ReturnValidation.validateItmReturnReasonCode:"+e);
				}
				finally
				{
						try
						{
								if(rs!=null)
									rs.close();
								if(ps!=null)
									ps.close();
								if(ps_update!=null)
									ps_update.close();
								if(con!=null)
									con.close();
						}
						catch(Exception e){}
				}
			}//validateItmReturnReasonCode

			public static void validateExentionRequestReasonCode()
						{//validateExentionRequestReasonCode
							Connection con=null;
							PreparedStatement ps=null;
							PreparedStatement ps_update=null;
							ResultSet rs=null;
							String sql="select RTO_CHEQUENO, RTO_SORTCODE from RETRUNOUTWARD ";
										sql+= " where RTO_RETURNREASONCODE not in(select ITM_RETURN_REASON_CODE from ITEMRETURNREASON_CHM)";
										sql+="  and RTO_DDMMYYYY=? and RTO_STATUS='Y'";
							String sql_update="update RETRUNOUTWARD set RTO_WRN_CODE=RTO_WRN_CODE||5||'~'";
										sql_update+=" where RTO_CHEQUENO=? and  RTO_SORTCODE=? and  RTO_DDMMYYYY=?";
						 int i=0;
							try
							{
									con=Configuration.getConnection();
									ps=con.prepareStatement(sql);
									ps.setString(1,Configuration.getDDMMYYYY());
									rs=ps.executeQuery();
									ps_update=con.prepareStatement(sql_update);
									while(rs.next())
									{
										 ps_update.setString(1,rs.getString(1));
										 ps_update.setString(2,rs.getString(2));
										 ps_update.setString(3,Configuration.getDDMMYYYY());

										 if(ps_update.executeUpdate()>0)
										 {
												System.out.println("\n\t Record is Updated in validateExentionRequestReasonCode of cheque No:"+rs.getString(1));
										 }
									}
							}
							catch(SQLException e)
							{
								System.out.println("\n\t SQLException in ReturnValidation.validateExentionRequestReasonCode:"+e);
							}
							catch(Exception e)
							{
								System.out.println("\n\t Exception in ReturnValidation.validateExentionRequestReasonCode:"+e);
							}
							finally
							{
									try
									{
											if(rs!=null)
												rs.close();
											if(ps!=null)
												ps.close();
											if(ps_update!=null)
												ps_update.close();
											if(con!=null)
												con.close();
									}
									catch(Exception e){}
							}
			}//validateExentionRequestReasonCode
}//ReturnValidation