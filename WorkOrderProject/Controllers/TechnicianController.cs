using Microsoft.AspNetCore.Mvc;
using WorkOrderProject.Models;

namespace WorkOrderProject.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TechnicianController : ControllerBase
    {
        private readonly ILogger<TechnicianController> _logger;

        public TechnicianController(ILogger<TechnicianController> logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// This <c>Get</c> method 
        /// </summary>
        /// <returns>Technician</returns>
        [HttpGet(Name = "GetTechnician")]
        public Technician Get(string filter, string condition)
        {
            DbConnection connection = new();
            Technician tech= connection.ReadTechnicianRecord(filter, condition);

            return tech;
        }

        [HttpGet(Name = "GetTechnicians")]
        public Technician[] Get()
        {
            DbConnection connection = new();
            Technician[] techs = connection.ReadTechnicianTable();

            return techs;
        }
    }
}
