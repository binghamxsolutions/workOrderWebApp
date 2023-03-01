namespace WorkOrderProject.Models
{
    /// <summary>
    /// Class <c>Technician</c> creates a simple C# object to 
    /// be used for database manipulation.
    /// </summary>
    public class Technician
    {
        public int id { get; set; }
        public string name { get; set; } = null!;
        public string email { get; set; } = null!;
    }
}
