using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;
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

        [HttpGet]
        public Technician[] Get()
        {
            DbConnection connection = new();
            Technician[] techs = connection.ReadTechnicians();

            return techs;
        }
        
        /// <summary>
        /// This <c>Get</c> method sets a parameter <c>id</c> to 
        /// query a specific technician.
        /// </summary>
        /// <returns>Technician</returns>
        [HttpGet("GetTechnician")]
        public Technician Get(int id)
        {
            DbConnection connection = new();
            Technician tech = connection.ReadTechnicianRecord(id);

            return tech;
        }
        /*
            /// <summary>
        /// This <c>Get</c> method 
        /// </summary>
        /// <returns>Technician</returns>
        //[HttpGet("GetTechnician")]
        public Technician Get(string filter, string condition)
        {
            //Console.Write("this controller name is: " + ("[controller]"));
            DbConnection connection = new();
            Technician tech= connection.ReadTechnicianRecord(filter, condition);

            return tech;
        }

         */
    }
}
