using Microsoft.AspNetCore.Mvc;
using WorkOrderProject.Models;

namespace WorkOrderProject.Controllers
{
    [ApiController]
    [Route("[controller]")]
    //sets base uri as the name of the controller. ie: Controller name: "NewController", Route: "/new"

    ///<summary>
    ///
    /// </summary>
    public class WorkOrderController : ControllerBase
    {
        private readonly ILogger<WorkOrderController> _logger;

        public WorkOrderController(ILogger<WorkOrderController> logger)
        {
            _logger = logger;
        }
        
        /// <summary>
        /// Produces all work orders available in a database
        /// </summary>
        /// <returns>An array of <c>WorkOrder</c>s</returns>
        [HttpGet("GetWorkOrders")] //sets the web app uri for GET methods
        public WorkOrder[] Get()
        {
            DbConnection connection = new();
            WorkOrder[] orders = connection.ReadWorkOrders();

            return orders;
        }

        /// <summary>
        /// Produces a list of work orders based on their status
        /// </summary>
        /// <param name="status">The status used to query the database and filter
        /// the results</param>
        /// <returns>An array of <c>WorkOrder</c>s</returns>
        [HttpGet("GetWorkOrdersByStatus")]
        public WorkOrder[] Get(string status)
        {
            DbConnection connection = new();
            WorkOrder[] orders = connection.ReadWorkOrders(status);

            return orders;
        } 

        /// <summary>
        /// Queries a database for a specific work order
        /// </summary>
        /// <param name="id">The unique ID assigned to the work order</param>
        /// <returns>A <c>WorkOrder</c> object</returns>
        [HttpGet("GetWorkOrder")] 
        public WorkOrder Get(int id)
        {
            DbConnection connection = new();
            WorkOrder order = connection.ReadWorkOrderRecord(id);

            return order;
        }

        /// <summary>
        /// Queries a database for possible work order statuses
        /// </summary>
        /// <returns>A <c>List</c> of type <c>string</c></returns>
        [HttpGet("GetStatuses")]
        public List<string> GetStatuses()
        {
            DbConnection connection = new();
            List<string> statuses = connection.ReadWorkOrderStatuses();

            return statuses;
        }

        /// <summary>
        /// Produces an array of work order items completed by a 
        /// technician given their technician ID
        /// </summary>
        /// <param name="id">The technician's ID number</param>
        /// <returns>An array of <c>WorkOrder</c>s</returns> 
        [HttpGet("GetTechOrders")]
        public WorkOrder[] GetTechOrders(int id)
        {
            DbConnection connection = new();
            WorkOrder[] workOrders = connection.ReadTechWorkOrders(id);

            return workOrders;
        }


        /// <summary>
        /// Creates a new work order. 
        /// </summary>
        /// <param name="newOrder">A <c>WorkOrder</c> object with work order specifics</param>
        [HttpPost("CreateNewOrder")] //sets the web app uri for POST methods
        public bool Post([FromBody]WorkOrder newOrder)
        {
            bool isSubmitted = false;
            DbConnection connection = new DbConnection();
            int recordsAffected = connection.CreateWorkOrder(newOrder);

            if (recordsAffected > 0) {
                isSubmitted = true;
            }
            // checks to ensure the order has been submitted
            
            return isSubmitted;
        }
    }
}
