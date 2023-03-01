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
        public int woId { set; get; }
        public string? contactName { set; get; }
        public string? contactNumber { set; get; }
        public string? email { set; get; }
        [DataType(DataType.Date)] //ensures that only the Date is passes, not the Date and Time
        public DateTime? dateReceived { set; get; }
        public string? problem { set; get; }
        [DataType(DataType.Date)]
        public DateTime? dateAssigned { set; get; }
        public int? technicianId { set; get; }
        public string? status { set; get; }
        public string? technicianComments { set; get; }
        [DataType(DataType.Date)]
        public DateTime? dateComplete { set; get; }


        // Date solution found on https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-mvc-app/adding-model?view=aspnetcore-7.0&tabs=visual-studio
    }
}
