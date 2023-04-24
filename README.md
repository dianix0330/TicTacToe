```
const oracledb = require('oracledb');

async function createPriceFile(contractID, premiumID, conn) {
  let sql, binds, options, result;

  try {
    sql = `SELECT
            contract_id,
            premium_id,
            price
            FROM
            contracts
            WHERE
            contract_id = :contractID
            AND
            premium_id = :premiumID`;

    binds = [contractID, premiumID];

    options = {
      outFormat: oracledb.OBJECT  // query result format
      // extendedMetaData: true,   // get extra metadata
      // fetchArraySize: 100       // internal buffer allocation size for tuning
    };

    result = await conn.execute(sql, binds, options);

    console.log("Column metadata: ", result.metaData);
    console.log("Query results: ");
    console.log(result.rows);

  } catch (err) {
    console.error(err);
  } finally {
    if (conn) {
      try {
        await conn.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

oracledb.getConnection(
  {
    user          : "vaa_o",
    password      : "vaa_odevc1",
    connectString : "is-zinvdbdev:1521/DEVC1_PRIMARY.GWL.COM"
  },
  async function(err, connection) {
    if (err) {
      console.error(err.message);
      return;
    }
    await createPriceFile(749364688, 293322715, connection);
  }
);
```
