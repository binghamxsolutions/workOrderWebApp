using System.ComponentModel.DataAnnotations;

namespace WorkOrderProject.Models
{
    /// <summary>
    /// Class <c>WorkOrder</c> creates a simple
    /// POCO for easier database manipulation.
    /// All fields are nullable except `woId`.
    /// </summary>
    public class WorkOrder
    {
        public int WoNum { set; get; }
        public string ContactName { set; get; } = null!;
        public string ContactNumber { set; get; } = null!;
        public string Email { set; get; } = null!;
        public DateTime? DateReceived { set; get; }
        public string Problem { set; get; } = null!;
        public DateTime? DateAssigned { set; get; }
        public int? TechnicianId { set; get; }
        public string Status { set; get; } = null!;
        public string TechnicianComments { set; get; } = null!;
        public DateTime? DateComplete { set; get; }


        // Date solution found on https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-mvc-app/adding-model?view=aspnetcore-7.0&tabs=visual-studio
    }
}
