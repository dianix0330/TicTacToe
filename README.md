package com.gwla.investments.otfvaa2.datasource.publishcusip;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import com.gwla.investments.otfvaa2.datasource.DataSource;

public class CallCreatePriceFile {
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
	
	public Map<String, Object> createPriceFile(long tokenID, long workingID, Connection conn ) throws SQLException, Exception {
		System.out.println("PublishExternalCompanyCusip.createPriceFile(long tokenID, long workingID, Connection conn )");
		System.out.println("tokenID, workingID: -> " + tokenID + "/" + workingID);
		
		Map<String, Object> properties = new HashMap<String, Object>();
		String fileName = null;
		String returnMessage = null;
		
		String sql = "{call price_pub_external_company_pkg.p_create_price_file(?,?,?,?,?)}"; 
        CallableStatement stmt = null;

		try {
	    	// Check tokenID parm
            if ( tokenID == 0 ) {
            	throw new Exception("Token ID is required");
            }

	    	// Check workingID parm
            if ( workingID == 0 ) {
            	throw new Exception("Working ID is required");
            }

            // Call Procedure
            stmt = conn.prepareCall(sql);
  			stmt.setLong(1, tokenID);
  			stmt.setString(2, "mglrll");
  			stmt.setLong(3, workingID);
            stmt.registerOutParameter(4, java.sql.Types.VARCHAR);
            stmt.registerOutParameter(5, java.sql.Types.VARCHAR);
            stmt.executeQuery();
            System.out.println("createPriceFile() completed. ");

            // Get Out Parm
            fileName = stmt.getString(4);
            returnMessage = stmt.getString(5);
            System.out.println("OutParameter - fileName:      -> " + fileName);
            System.out.println("OutParameter - returnMessage: -> " + returnMessage);
            
            properties.put("fileName", fileName);
            properties.put(DataSource.MESSAGE, returnMessage);
		} 
		catch (SQLException e){
			System.out.println("createPriceFile()" + e);
			throw e;
	    } 
		finally {
	            try { if( stmt!=null) stmt.close(); stmt = null;} catch (Exception e){}
	    }
	    return properties;
	}
}
