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
        [HttpGet(Name = "GetWorkOrder")] //sets the web app uri for GET methods
        public WorkOrder Get(string filter, string value)
        {
            DbConnection connection = new();
            WorkOrder order = connection.ReadWorkOrderRecord(filter, value);

            return order;
        }

        [HttpGet(Name = "GetWorkOrders")] //sets the web app uri for GET methods
        public WorkOrder[] Get()
        {
            DbConnection connection = new();
            WorkOrder[] orders = connection.ReadWorkOrderTable();

            return orders;
        }

        [HttpGet(Name = "GetWorkOrders")] //sets the web app uri for GET methods
        public WorkOrder[] Get(string filter, string value, string order)
        {
            DbConnection connection = new();
            WorkOrder[] orders = connection.ReadWorkOrderTable();

            return orders;
        } 

        [HttpPost(Name = "GetWorkOrder")] //sets the web app uri for POST methods
        public  WorkOrder Post()
        {
            return new WorkOrder();
            //TODO correct code properly for POST method
        }
    }
}
