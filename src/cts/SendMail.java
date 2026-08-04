package cts;
import java.util.Properties;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.Message.RecipientType;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.mail.Authenticator;
import javax.mail.PasswordAuthentication;
import java.security.*;
import java.security.cert.*;
import javax.net.ssl.*;


class GMailAuthenticator extends javax.mail.Authenticator
{   public PasswordAuthentication getPasswordAuthentication()
    {   String user = "ov.kushte@gmail.com";
        String pwd = "askivbag";
        return new PasswordAuthentication(user, pwd);
    }

}
public class SendMail {

	private String from;
	private String to;
	//private String ccTo;
	private String subject;
	private String text;

	public SendMail(String from, String to, /*String ccTo,*/String subject, String text){

			this.from = from;
			this.to = to;
			//this.ccTo=ccTo;
			this.subject = subject;
			this.text = text;
			System.out.println("FROM:"+from);
			System.out.println("TO:"+to);
			//System.out.println("ccTo:"+ccTo);
			System.out.println("Subject:"+subject);
			System.out.println("Text:"+text);
	}
	public String send()
	{
	  String res="success";
		Properties props = new Properties();
        InternetAddress fromAddress = null;
		InternetAddress toAddress=null;//,ccAddress = null;
		//InternetAddress ccAddresses[]=null;
		Session mailSession=null;
		Message simpleMessage=null;

		//This was using TLS can not run with SSL
        /*
          props.put("mail.smtp.starttls.enable","true");
  		props.put("mail.smtp.auth", "true");
  		props.put("mail.smtp.host", "smtp.gmail.com");
  		props.put("mail.smtp.port", "587");
  		*/
		try
		{
          //This is with SSL(For firewall protection like Cloud server
		  props.put("mail.smtp.host", "smtp.gmail.com");
       	  props.put("mail.smtp.socketFactory.port", "465");
  	      props.put("mail.smtp.socketFactory.class","javax.net.ssl.SSLSocketFactory");
  		  props.put("mail.smtp.auth", "true");
  		  props.put("mail.smtp.port", "465");
  		  props.put("mail.imap.ssl.checkserveridentity", "false");
  		  props.put("mail.imap.ssl.trust", "*");
  	      mailSession = Session.getInstance(props, new GMailAuthenticator());
		  simpleMessage = new MimeMessage(mailSession);

		}
		catch(Exception e)
		{
			System.out.println("Exception while setting props in send");
			res="fail";
		}
		try {

						fromAddress = new InternetAddress(from);
						toAddress = new InternetAddress(to);
						//ccAddress = new InternetAddress(ccTo);
						//System.out.println("ccAddress :"+ccTo);

						/*if(ccTo.indexOf(";")==-1)
						{
							ccAddresses=new  InternetAddress[1];
							ccAddresses[0]=new  InternetAddress(ccTo);
					    }
					    else
					    {
									String[] ccArr=ccTo.split(";");
									System.out.println("=========================================");
									int ccLength=ccArr.length;
									System.out.println("Length:======>"+ccLength);
									ccAddresses=new InternetAddress[ccLength];
										for(int i=0;i<ccLength;i++)
										{
											System.out.println("email address:"+ccArr[i]);
											ccAddresses[i]=new InternetAddress(ccArr[i]);
										}//end outer for loop
					}//end if*/
			} catch (AddressException e) {
			// TODO Auto-generated catch block
			System.out.println("Error In Address");
			res="fail";
		}
		catch(Exception e)
		{
				e.printStackTrace();
			System.out.println("Exception In First Try");
				res="fail";
		}
		try {
			simpleMessage.setFrom(fromAddress);
			simpleMessage.setRecipient(RecipientType.TO, toAddress);
			//simpleMessage.setRecipient(RecipientType.CC, ccAddress);
			//simpleMessage.addRecipients(RecipientType.CC, ccAddresses);
			simpleMessage.setSubject(subject);
			simpleMessage.setText(text);
			Transport.send(simpleMessage);
			System.out.println("Mail send successfully");
			res="success";
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			res="fail";
		}
		catch(Exception e)
		{
				e.printStackTrace();
			System.out.println("Exception In Second Try");
			res="fail";
		}
		return res;
	}


}

