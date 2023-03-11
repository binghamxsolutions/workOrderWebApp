using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.EntityFrameworkCore.Query;
using System;
using System.Diagnostics;
using WorkOrderProject.Models;

namespace WorkOrderProject
{
    /// <summary>
    /// Creates a connection to a database and presents 
    /// several types of queries to the database for retrieval or
    /// manipulation by the controller
    /// </summary>
    public class DbConnection
    {
        string connectionString;
        string? sqlStatement;
        SqlConnection conn;
        SqlDataReader? dataReader;
        SqlCommand? cmd;

        public DbConnection()
        {
            connectionString = "Data Source=(localdb)\\mssqllocaldb;AttachDbFilename=C:\\Users\\bingh\\Desktop\\code_test\\WorkOrders.mdf;Integrated Security=True;Multiple Active Result Sets=True";
            conn = new SqlConnection(connectionString);

            conn.Open();
            //Console.WriteLine(conn.State);
        }

        // Create methods
        public void CreateWorkOrder(WorkOrder workOrder)
        {
            string columns = "WONum"; //starting point for column values since wonum is required
            string values = $"{workOrder.WoNum}"; 
            // TODO create a parallel list of values to insert into the table ie: string values = "'<wo_num>', 3, 'Jan 23, 2023', '<other_value>'";
           
            if (workOrder.ContactName != null)
            {
                columns += ",ContactName";
                values += $"{workOrder.ContactName}";

            }
            if (workOrder.ContactNumber != null)
            {
                columns += ",ContactNumber";
                values += $"{workOrder.ContactNumber}";

            }
            if (workOrder.Email != null)
            {
                columns += ",Email";
                values += $"{workOrder.Email}";

            }
            if (workOrder.DateReceived != null)
            {
                columns += ",DateReceived";
                values += $"{workOrder.DateReceived}";

            }
            if (workOrder.Problem != null)
            {
                columns += ",Problem";
                values += $"{workOrder.Problem}";

            }
            if (workOrder.DateAssigned != null)
            {
                columns += ",DateAssigned";
                values += $"{workOrder.DateAssigned}";
            }
            if (workOrder.TechnicianId != null)
            {
                columns += ",TechnicianID";
                values += $"{workOrder.TechnicianId}";
            }
            if (workOrder.Status != null)
            {
                columns += ",Status";
                values += ",'{workOrder.Status}'";
            }
           

            sqlStatement = $"INSERT {columns} INTO workorders {values}";
            cmd = new SqlCommand(sqlStatement, conn);
            dataReader = cmd.ExecuteReader();


            dataReader.Close();
            cmd.Dispose();
            conn.Close();
        }

        public void CreateTechnician(Technician technician)
        {
            sqlStatement = "INSERT INTO technicians" + "<VALUES>";
            cmd = new SqlCommand(sqlStatement, conn);
            dataReader = cmd.ExecuteReader();

            cmd.Dispose();
            dataReader.Close();
            conn.Close();
        } // this method is available only  for future iterations. Please update if needed


        // Read methods
        /**
         * Queries the <c>workOrders</c> table for 
         * all records.
         */
        public WorkOrder[] ReadWorkOrders()
        {
            WorkOrder[] records;
            List<WorkOrder> workOrders = new();
            sqlStatement = "SELECT * FROM workorders";

            cmd = new SqlCommand(sqlStatement, conn);
            dataReader = cmd.ExecuteReader();

            while (dataReader.Read())
            {
                WorkOrder temp = validateWorkOrderColumns(dataReader);
                workOrders.Add(temp);
            }
            records = workOrders.ToArray();
            // iteration code modified from: https://stackoverflow.com/questions/5765785/add-elements-to-object-array

            dataReader.Close();
            cmd.Dispose();
            conn.Close();

            return records;
        }

        /**
         * Queries the <c>workOrders</c> table for all 
         * records that match the <c>status</c>
         */
        public WorkOrder[] ReadWorkOrders(string status)
        {
            WorkOrder[] records;
            List<WorkOrder> workOrders = new();
            sqlStatement = $"SELECT * FROM workorders WHERE Status='{status}'";// + " ORDER BY DateReceived DESC";

            cmd = new SqlCommand(sqlStatement, conn);
            dataReader = cmd.ExecuteReader();

            while (dataReader.Read())
            {
                WorkOrder temp = validateWorkOrderColumns(dataReader);
                workOrders.Add(temp);
            }
            records = workOrders.ToArray();

            cmd.Dispose();
            dataReader.Close();
            conn.Close();

            return records;
        }

        /**
         * Queries the workOrders table for different status 
         * values.
         */
        public List<string> ReadWorkOrderStatuses()
        {
            List<string> statuses = new();
            sqlStatement = "SELECT DISTINCT Status FROM workorders";
            cmd = new SqlCommand(sqlStatement, conn);
            dataReader = cmd.ExecuteReader();

            while (dataReader.Read())
            {
                statuses.Add(dataReader.GetString(0));
            }

            return statuses;
        }
        

        /**
         * Queries the workOrders table for the work order number and status
         * of any records that have been assigned to a specific technician
         */
        public WorkOrder[] ReadTechWorkOrders(int id)
        {
            WorkOrder[] records;
            List<WorkOrder> workOrders = new();
            sqlStatement = $"SELECT WONum, Status FROM workorders WHERE TechnicianID={id}";
            cmd= new SqlCommand(sqlStatement, conn); 
            dataReader = cmd.ExecuteReader();

            while (dataReader.Read()) {
                WorkOrder temp = validateInfoColumns(dataReader);
                workOrders.Add(temp);
            }
            records = workOrders.ToArray();

            dataReader.Close();
            cmd.Dispose();
            conn.Close();

            return records;
        }
        /**
         * Queries the workorders table for a specific work order
         * by searching for its work order ID
         */
        public WorkOrder ReadWorkOrderRecord(int woId)
        {
            WorkOrder record;
            sqlStatement = $"SELECT * FROM workOrders WHERE WoNum='{woId}'";
            cmd = new SqlCommand(sqlStatement, conn);
            dataReader = cmd.ExecuteReader();

            dataReader.Read();
            record = validateWorkOrderColumns(dataReader);

            cmd.Dispose();
            dataReader.Close();
            conn.Close();

            return record;
        }

        /**
         * Queries the technicians table for all
         * records.
         */
        public Technician[] ReadTechnicians()
        {
            Technician[] records;
            List<Technician> technicians = new();

            sqlStatement = "SELECT * FROM technicians";
            cmd = new SqlCommand(sqlStatement, conn);
            dataReader = cmd.ExecuteReader();

            while (dataReader.Read())
            {
                Technician temp = new()
                {
                    TechnicianId = dataReader.GetInt32(0),
                    TechnicianName = dataReader.GetString(1),
                    TechnicianEmail = dataReader.GetString(2),
                }; // no validation required as all table fields are non-nullable
                technicians.Add(temp);
            }
            records = technicians.ToArray();

            cmd.Dispose();
            dataReader.Close();
            conn.Close();

            return records;
        }

        /**
         * Queries the technician table for the record that
         * matches the TechnicianId
         */
        public Technician ReadTechnicianRecord(int id)
        {
            Technician record;
            sqlStatement = "SELECT * FROM technicians WHERE TechnicianID='" + id +"'";
            cmd = new SqlCommand(sqlStatement, conn);
            dataReader = cmd.ExecuteReader();

            while (dataReader.Read())
            {
                record = new()
                {
                    TechnicianId = dataReader.GetInt32(0),
                    TechnicianName = dataReader.GetString(1),
                    TechnicianEmail = dataReader.GetString(2)
                };
                return record;
            }
            record = new();

            cmd.Dispose();
            dataReader.Close();
            conn.Close();

            return record;

        }


        // Update method NOTE: this method is empty for future iterations with more CRUD operations
        public void Update(string table, string columnName, string condition) { }


        public int SetWONum() {
            int newWONum = 0;
            string sqlStatement = "SELECT ISNULL(MAX(WONum + 1), 1) FROM workorders";
            cmd = new SqlCommand(sqlStatement, conn);
            dataReader = cmd.ExecuteReader();

            while (dataReader.Read()) { 
                if (!dataReader.IsDBNull(0))
                {
                    newWONum = dataReader.GetInt32(0);
                }
            }

            conn.Close();
            cmd.Dispose();
            dataReader.Close();

            return newWONum; 
        }


        /**
         * Verifies if the columns of the workOrders table listed in 
         * the <c>dataReader</c> are non-nullable. If they are, the appropriate 
         * field is assigned a value. If not, no value is assigned.
         */
        private WorkOrder validateWorkOrderColumns(SqlDataReader dataReader)
        {
            WorkOrder temp = new WorkOrder();
            for (int i = 0; i < 11; i++)
            {
                bool isNull = dataReader.IsDBNull(i);

                switch (i) //checks for null values first then assigns value is one is present
                {
                    case 0:
                        if (!isNull)
                        {
                            temp.WoNum = dataReader.GetInt32(i);
                        }
                        break;
                    case 1:
                        if (!isNull)
                        {
                            temp.Email = dataReader.GetString(i);
                        }
                        break;
                    case 2:
                        if (!isNull)
                        {
                            temp.Status = dataReader.GetString(i);
                        }
                        break;
                    case 3:
                        if (!isNull)
                        {
                            temp.DateReceived = dataReader.GetDateTime(i);
                        }
                        break;
                    case 4:
                        if (!isNull)
                        {
                            temp.DateAssigned = dataReader.GetDateTime(i);
                        }
                        break;
                    case 5:
                        if (!isNull)
                        {
                            temp.DateComplete = dataReader.GetDateTime(i);
                        }
                        break;
                    case 6:
                        if (!isNull)
                        {
                            temp.ContactName = dataReader.GetString(i);
                        }
                        break;
                    case 7:
                        if (!isNull)
                        {
                            temp.TechnicianComments = dataReader.GetString(i);
                        }
                        break;
                    case 8:
                        if (!isNull)
                        {
                            temp.ContactNumber = dataReader.GetString(i);
                        }
                        break;
                    case 9:
                        if (!isNull)
                        {
                            temp.TechnicianId = dataReader.GetInt32(i);
                        }
                        break;
                    case 10:
                        if (!isNull)
                        {
                            temp.Problem = dataReader.GetString(i);
                        }
                        break;
                }
            }
            return temp;
        }

        /**
         * Verifies if the id and value columns are non-nullable before
         * assigning their respective fields values.
         */
        private WorkOrder validateInfoColumns(SqlDataReader dataReader)
        {
            WorkOrder temp = new();

            for (int i = 0; i < 2; i++)
            {
                bool isNull = dataReader.IsDBNull(i);
                switch(i)
                {
                    case 0:
                        if (!isNull) { 
                            temp.WoNum = dataReader.GetInt32(i); 
                        } // no else statement required as id fields are required

                        break;
                    case 1:
                        if (!isNull) {
                            temp.Status = dataReader.GetString(i);
                        } // no else statement required as the default assignment for value is an empty string

                        break;
                }
            }
            return temp;
        }
    }
}
