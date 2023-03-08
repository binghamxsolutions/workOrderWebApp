namespace WorkOrderProject.Models
{
    /// <summary>
    /// Class <c>Technician</c> creates a simple C# object to 
    /// be used for database manipulation.
    /// </summary>
    public class Technician
    {
        public int TechnicianId { get; set; }
        public string TechnicianName { get; set; } = null!;
        public string TechnicianEmail { get; set; } = null!;
    }
}
