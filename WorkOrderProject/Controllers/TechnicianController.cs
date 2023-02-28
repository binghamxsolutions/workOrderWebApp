using Microsoft.AspNetCore.Mvc;

namespace WorkOrdersWebAppBackend.Controllers
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
        [HttpGet(Name = "GetTechnician")]
        public Technician Get()
        {
            Technician newTech = new() {
                Email = "someguy@email.com",
                Name = "Some Guy",
                Id = 3
            };

            return newTech;
        }
    }
}
