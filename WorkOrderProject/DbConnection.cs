using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.EntityFrameworkCore.Query;
using System.Diagnostics;
using WorkOrderProject.Models;

namespace WorkOrderProject
{
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
            Console.WriteLine(conn.State);
        }



        // this method is empty for future iterations with more CRUD operations
        public void Update(string table, string columnName, string condition) { }


        // methods for the workorder table
        public void CreateWorkOrder(WorkOrder workOrder)
        {
            // TODO  iteration thru the object to properly format the <values>
            sqlStatement = "INSERT INTO workorder" + "<order_values>";
            cmd = new SqlCommand(sqlStatement, conn);
            dataReader = cmd.ExecuteReader();


            dataReader.Close();
            cmd.Dispose();
            conn.Close();
        }

        public WorkOrder[] ReadWorkOrderTable()
        {
            WorkOrder[] records;
            List<WorkOrder> workOrders = new(); 
            sqlStatement = "SELECT * FROM workorders";

            cmd = new SqlCommand(sqlStatement, conn);
            dataReader = cmd.ExecuteReader();
            int position = 0;

            while(dataReader.Read())
            {
                WorkOrder tempOrder = new()
                {
                    woNum = dataReader.GetInt32(position),
                    email = dataReader.GetString(position),
                    status = dataReader.GetString(position),
                    dateReceived = dataReader.GetDateTime(position),
                    dateAssigned = dataReader.GetDateTime(position),
                    dateComplete = dataReader.GetDateTime(position),
                    contactName = dataReader.GetString(position),
                    technicianComments = dataReader.GetString(position),
                    contactNumber = dataReader.GetString(position),
                    technicianId = dataReader.GetInt32(position),
                    problem = dataReader.GetString(position)
                };
                Console.Write(tempOrder);
                workOrders.Add(tempOrder);

                position++;
            }
            records = workOrders.ToArray();
            // iteration code modified from: https://stackoverflow.com/questions/5765785/add-elements-to-object-array

            dataReader.Close();
            cmd.Dispose();
            conn.Close();

            return records;
        }

        public WorkOrder[] ReadWorkOrderTable(string filter, string condition, string order)
        {
            WorkOrder[] records;
            List<WorkOrder> workOrders = new ();
            sqlStatement = "SELECT * FROM workorders WHERE " + filter + "=" + condition + " ORDER BY DateReceived " + order;
            cmd = new SqlCommand(sqlStatement, conn);
            dataReader = cmd.ExecuteReader();
            int position = 0;

            while (dataReader.Read())
            {
                WorkOrder tempOrder = new()
                {
                    woNum = dataReader.GetInt32(position),
                    email = dataReader.GetString(position),
                    status = dataReader.GetString(position),
                    dateReceived = dataReader.GetDateTime(position),
                    dateAssigned = dataReader.GetDateTime(position),
                    dateComplete = dataReader.GetDateTime(position),
                    contactName = dataReader.GetString(position),
                    technicianComments = dataReader.GetString(position),
                    contactNumber = dataReader.GetString(position),
                    technicianId = dataReader.GetInt32(position),
                    problem = dataReader.GetString(position)
                };
                Console.Write(tempOrder);
                workOrders.Add(tempOrder);

                position++;
            }
            records = workOrders.ToArray();

            cmd.Dispose();
            dataReader.Close();
            conn.Close();

            return records;
        }


        public WorkOrder ReadWorkOrderRecord(string filter, string condition)
        {
            WorkOrder record;
            sqlStatement = "SELECT * FROM technicians WHERE " + filter + "=" + condition;
            cmd = new SqlCommand(sqlStatement, conn);
            dataReader = cmd.ExecuteReader();
            int position = 0;

            cmd = new SqlCommand(sqlStatement, conn);
            record = new()
            {
                woNum = dataReader.GetInt32(position),
                email = dataReader.GetString(position),
                status = dataReader.GetString(position),
                dateReceived = dataReader.GetDateTime(position),
                dateAssigned = dataReader.GetDateTime(position),
                dateComplete = dataReader.GetDateTime(position),
                contactName = dataReader.GetString(position),
                technicianComments = dataReader.GetString(position),
                contactNumber = dataReader.GetString(position),
                technicianId = dataReader.GetInt32(position),
                problem = dataReader.GetString(position)
            };

            cmd.Dispose();
            dataReader.Close();
            conn.Close();

            return record;
        }


        // methods for the technicians table
        public void CreateTechnician(Technician technician)
        {
            sqlStatement = "INSERT INTO technicians" + "<VALUES>";
            cmd = new SqlCommand(sqlStatement, conn);
            dataReader = cmd.ExecuteReader();

            cmd.Dispose();
            dataReader.Close();
            conn.Close();
        } // this method is available only  for future iterations. Please update if needed


        public Technician[] ReadTechnicianTable() {
            Technician[] records;
            List<Technician> technicians = new ();

            sqlStatement = "SELECT * FROM technicians";
            cmd = new SqlCommand(sqlStatement, conn);
            dataReader = cmd.ExecuteReader();
            int position = 0;

            cmd = new SqlCommand(sqlStatement, conn);
            while (dataReader.Read())
            {
                Technician tempOrder = new()
                {
                    id = dataReader.GetInt32(position),
                    email = dataReader.GetString(position),
                    name = dataReader.GetString(position),
                };
                Console.Write(tempOrder);
                technicians.Add(tempOrder);

                position++;
            }
            records = technicians.ToArray();
            
            cmd.Dispose();
            dataReader.Close();
            conn.Close();

            return records; 
        }

        
        public Technician[] ReadTechnicianTable(string filter, string condition)
        {
            Technician[] records;
            List<Technician> technicians = new ();
            sqlStatement = " SELECT * FROM technicians WHERE " + filter + "=" + condition;
            cmd = new SqlCommand(sqlStatement, conn);
            dataReader = cmd.ExecuteReader();
            int position = 0;

            while (dataReader.Read())
            {
                Technician tempOrder = new()
                {
                    id = dataReader.GetInt32(position),
                    email = dataReader.GetString(position),
                    name = dataReader.GetString(position)
                };
                Console.Write(tempOrder);
                technicians.Add(tempOrder);

                position++;
            }
            records = technicians.ToArray();
            
            
            cmd.Dispose();
            dataReader.Close();
            conn.Close();

            return records;
        } // this method only exists for future implementation. Please update if needed

        public Technician ReadTechnicianRecord(string filter, string condition)
        {
            Technician record;
            sqlStatement = "SELECT * FROM technicians WHERE " + filter + "=" + condition;
            cmd = new SqlCommand(sqlStatement, conn);
            dataReader = cmd.ExecuteReader();
            int position = 0;

            record = new()
            {
                name = dataReader.GetString(position),
                id = dataReader.GetInt32(position),
                email = dataReader.GetString(position)
            };

            cmd.Dispose();
            dataReader.Close();
            conn.Close();
            
            return record;

        }
    }
}
