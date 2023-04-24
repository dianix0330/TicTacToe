https://teams.microsoft.com/l/meetup-join/19%3ameeting_ZjRjNDJhNTYtMGE3ZS00ZmU4LWFjZGMtNDczOTJhM2IzYzMx%40thread.v2/0?context=%7b%22Tid%22%3a%22d344fc8a-8286-4945-9a21-49aed506d485%22%2c%22Oid%22%3a%221dda0158-f4e9-4c0a-a950-ee6cbe82c585%22%7d

https://teams.microsoft.com/l/meetup-join/19%3ameeting_OTg1MjBiNWYtYWY5MC00MDc2LWE1YjYtNDFlNWM1MjdhM2Mw%40thread.v2/0?context=%7b%22Tid%22%3a%22d344fc8a-8286-4945-9a21-49aed506d485%22%2c%22Oid%22%3a%221dda0158-f4e9-4c0a-a950-ee6cbe82c585%22%7d



```
public static void main(String args[]){  
		try{  
			//step1 load the driver class  
			Class.forName("oracle.jdbc.driver.OracleDriver");  

			System.setProperty("oracle.net.tns_admin", "C:\\Users\\mglrll\\tns");

			//step2 create  the connection object  
			//Connection conn=DriverManager.getConnection(  
			//		"jdbc:oracle:thin:@is-zinvdbqat2:1521/TESTCBT3_PRIMARY.GWL.COM","vaa_o","vaa_otestcbt3");
			
			//Connection conn=DriverManager.getConnection(  
			//		"jdbc:oracle:thin:@is-zinvdbqat2:1521/TESTCBT5_PRIMARY.GWL.COM","vaa_o","vaa_otestcbt5");
			
			Connection conn=DriverManager.getConnection(  
					"jdbc:oracle:thin:@is-zinvdbdev:1521/DEVC1_PRIMARY.GWL.COM","vaa_o","vaa_odevc1");

			CallCreatePriceFile priceFile = new CallCreatePriceFile();
			priceFile.createPriceFile(749364688, 293322715, conn);

		}catch(Exception e){ System.out.println(e);}  

	}
```
