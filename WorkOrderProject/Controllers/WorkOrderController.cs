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
        
        [HttpGet("GetWorkOrders")] //sets the web app uri for GET methods
        public WorkOrder[] Get()
        {
            DbConnection connection = new();
            WorkOrder[] orders = connection.ReadWorkOrders();

            return orders;
        }

        [HttpGet("GetWorkOrdersByStatus")] //sets the web app uri for GET methods
        public WorkOrder[] Get(string status)
        {
            DbConnection connection = new();
            WorkOrder[] orders = connection.ReadWorkOrders(status);

            return orders;
        } 

        [HttpGet("GetWorkOrder")] //sets the web app uri for GET methods
        public WorkOrder Get(int id)
        {
            DbConnection connection = new();
            WorkOrder order = connection.ReadWorkOrderRecord(id);

            return order;
        }

        [HttpGet("GetStatuses")] //sets the web app uri for GET methods
        public List<String> GetStatuses()
        {
            DbConnection connection = new();
            List<String> statuses = connection.ReadWorkOrderStatuses();

            return statuses;
        }

        
        [HttpGet(Name = "GetWorkOrders")] //sets the web app uri for GET methods
        public Dictionary<int, string> GetWorkOrders(int id)
        {
            DbConnection connection = new();
            Dictionary<int, string> orders = connection.ReadWorkOrderStatuses(id);

            return orders;
        }


        [HttpPost] //sets the web app uri for POST methods
        public void Post()
        {
            //return new WorkOrder();
            //TODO correct code properly for POST method
        }
    }
}
