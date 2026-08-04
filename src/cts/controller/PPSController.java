package cts.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import cts.PPSIntimation;
import cts.dao.PPSDao;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class PPSController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	String whattodo="",fromdate="",todate="";
	//private String action;
    public PPSController() {
        super();
        // TODO Auto-generated constructor stub
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doPost(request, response);
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		
		whattodo=request.getParameter("whattodo");
		//action = request.getParameter("whattodo");
		
		PrintWriter out = response.getWriter();
		PPSDao obj=new PPSDao();
		if(whattodo.equalsIgnoreCase("SHOWRPT"))
		{
			fromdate=request.getParameter("FromDate");
			todate=request.getParameter("ToDate");
			
			String  retVal = obj.fetchIssuanceRecord(fromdate,todate);		
			try 
			{
				out.println(new JSONObject(retVal));
				System.out.println("new JSONObject(retval)"+new JSONObject(retVal));
			} 
			catch (JSONException e) 
			{
				e.printStackTrace();
			}
		}
		else if(whattodo.equalsIgnoreCase("SHOWLOGSRPT"))
		{
			fromdate=request.getParameter("FromDate");
			todate=request.getParameter("ToDate");
			String  retVal = obj.fetchIntimationlogs(fromdate,todate);		
			try 
			{
				out.println(new JSONObject(retVal));
				System.out.println("new JSONObject(retval)"+new JSONObject(retVal));
			} 
			catch (JSONException e) 
			{
				e.printStackTrace();
			}
		}
		else if(whattodo.equalsIgnoreCase("INITREQUEST"))
		{
			JSONObject mainJsonObj = new JSONObject();
			
			try 
			{
				mainJsonObj.put("ACCOUNTNO", request.getParameter("ACCOUNTNO"));
				mainJsonObj.put("CHQNO", request.getParameter("CHQNO"));
				mainJsonObj.put("INSTRUMENTDT", request.getParameter("INSTRUMENTDT"));
				mainJsonObj.put("TRANCODE", request.getParameter("TRANCODE"));
				mainJsonObj.put("CUSTID", request.getParameter("CUSTID"));
				mainJsonObj.put("PAYEENM", request.getParameter("PAYEENM"));
				mainJsonObj.put("MOBILENO", request.getParameter("MOBILENO"));
				mainJsonObj.put("AMOUNT", request.getParameter("AMOUNT"));
				
				String  retVal = obj.sendIntimationRequest(mainJsonObj);		
				
				out.println(new JSONObject(retVal));
				System.out.println("new JSONObject(retval)=="+new JSONObject(retVal));
			} 
			catch (JSONException e) 
			{
				e.printStackTrace();
			}
		}
		else if (whattodo.equalsIgnoreCase("ONLOAD"))
		{
			String retval=obj.fetchIssuanceRecord();
			try 
			{
				out.println(new JSONObject(retval));
				System.out.println("new JSONObject(retval)"+new JSONObject(retval));
			} 
			catch (JSONException e) 
			{
				e.printStackTrace();
			}
			
		}
		else if(whattodo.equalsIgnoreCase("CREATEFILE"))
		{
			String fileformat=request.getParameter("fileformat");
			
			String retval=obj.createIssuanceFile(fileformat,request);
			
			
			try 
			{
				out.println(new JSONObject(retval));
				System.out.println("new JSONObject(retval)"+new JSONObject(retval));
			} 
			catch (JSONException e) 
			{
				e.printStackTrace();
			}
		}
		else if(whattodo.equalsIgnoreCase("READFILE"))
		{
			
			String filenm=request.getParameter("filename");
			String retval="";
			try {
				retval = obj.ReadIssuanceResp(filenm);
			} catch (SQLException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			
			try 
			{
				out.println(new JSONObject(retval));
				System.out.println("new JSONObject(retval)"+new JSONObject(retval));
			} 
			catch (JSONException e) 
			{
				e.printStackTrace();
			}
		}
		else if(whattodo.equalsIgnoreCase("NOTIFY"))
		{
			String retval="";		
			try 
			{
				retval = obj.getNotifications();
				out.println(new JSONObject(retval));
				System.out.println("new JSONObject(retval)"+new JSONObject(retval));
			} 
			catch (JSONException e) 
			{
				e.printStackTrace();
			}
		}//PEN_READFILE
		else if(whattodo.equalsIgnoreCase("PEN_READFILE"))
		{
			String retval="";
			try {
				retval = obj.Read_PendingIssuanceResp();
			} catch (Exception e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}			
			try 
			{
				out.println(new JSONObject(retval));
				System.out.println("new JSONObject(retval)"+new JSONObject(retval));
			} 
			catch (JSONException e) 
			{
				e.printStackTrace();
			}
		}//UPDATERECORD
		
		else if(whattodo.equalsIgnoreCase("FETCHACCOUNTDETAILS"))
		{
			JSONObject JsonObj= new JSONObject();		
			
			String retval="";
			try 
			{
				JsonObj.put("BRANCHCODE", request.getParameter("BRANCHCODE"));
				JsonObj.put("SCHEMECODE", request.getParameter("SCHEMECODE"));
				JsonObj.put("ACCOUNTNO", request.getParameter("ACCOUNTNO"));
				retval = obj.getCustDetails(JsonObj);
				out.println(new JSONObject(retval));
				System.out.println("new JSONObject(retval)"+new JSONObject(retval));
			} 
			catch (JSONException e) 
			{
				e.printStackTrace();
			}
		}
		else if(whattodo.equalsIgnoreCase("BULKINTIMATIONS"))
		{
			JSONObject JsonObj= new JSONObject();		
			String jsonString=request.getParameter("jsonString");
			System.out.println("jsonString=="+jsonString);
			
			String retval="";
			try 
			{
				JSONArray jsonArray=new JSONArray(jsonString);
				ArrayList<PPSIntimation> _accInfoBean=new ArrayList<PPSIntimation>();
				for(int j=0;j<jsonArray.length();j++)
				{
					PPSIntimation beanobj=new PPSIntimation();
					JSONObject jsonobj=jsonArray.getJSONObject(j);
					beanobj.setPIL_CHQNO(jsonobj.getString("PIL_CHQNO"));
					beanobj.setPIL_AMOUNT(jsonobj.getString("PIL_AMOUNT"));
					beanobj.setPIL_PAYEENAME(jsonobj.getString("PIL_PAYEENAME"));
					beanobj.setPIL_ISTRUMENT_DT(jsonobj.getString("PIL_INSTRUMENT_DT"));
					beanobj.setPIL_ACCNO(jsonobj.getString("PIL_ACCNO"));
					beanobj.setPIL_CUSTID(jsonobj.getString("PIL_CUSTID"));
					beanobj.setPIL_TRAN_CD(jsonobj.getString("PIL_TRAN_CD"));
					beanobj.setPIL_MOBNO(jsonobj.getString("PIL_MOBNO"));
					_accInfoBean.add(beanobj);
				}
				
				retval = obj.FulfilBulkIntimations(_accInfoBean);
				out.println(new JSONObject(retval));
				System.out.println("new JSONObject(retval)"+new JSONObject(retval));
			} 
			catch (JSONException e) 
			{
				e.printStackTrace();
			}
		}
		else if(whattodo.equalsIgnoreCase("SHOWDATA"))
		{
			fromdate=request.getParameter("fromdate");
			todate=request.getParameter("todate");
			String trantype=request.getParameter("trantype");			
			String  retVal = obj.fetchchequeData(fromdate,todate,trantype);		
			try 
			{
				out.println(new JSONObject(retVal));
				System.out.println("new JSONObject(retval)"+new JSONObject(retVal));
			} 
			catch (JSONException e) 
			{
				e.printStackTrace();
			}
		}
		//PAPERTOFOLLOW_ENTRY
		else if(whattodo.equalsIgnoreCase("PAPERTOFOLLOW_ENTRY"))
		{
			String brchcd=request.getParameter("BRNCHCD");
			String  retVal = obj.paperToFollow_BranchAllowed(brchcd);		
			try 
			{
				out.println(new JSONObject(retVal));
				System.out.println("new JSONObject(retval)"+new JSONObject(retVal));
			} 
			catch (JSONException e) 
			{
				e.printStackTrace();
			}
		}
		else if(whattodo.equalsIgnoreCase("PAPERTOFOLLOW"))
		{
			String brchcd=request.getParameter("BRNCHCD");
			String  retVal = obj.fetchcheque_paperToFollow(brchcd);		
			try 
			{
				out.println(new JSONObject(retVal));
				System.out.println("new JSONObject(retval)"+new JSONObject(retVal));
			} 
			catch (JSONException e) 
			{
				e.printStackTrace();
			}
		}
		//UPDATE_PAPERTOFOLLOW
		else if(whattodo.equalsIgnoreCase("UPDATE_PF"))
		{

			JSONArray jArray = new JSONArray();
			String jsonString=request.getParameter("jsonString");
			String  retVal = obj.update_paperToFollow(jsonString);		
			if (retVal == null || retVal.length() == 0) 
			{
				System.out.println("Data Not Updated ");
			} 
			else 
			{
				System.out.println("retStr" + retVal);
				response.sendRedirect("paperToFollow.jsp?retVal="+retVal);
			}			
		}
	}
}

