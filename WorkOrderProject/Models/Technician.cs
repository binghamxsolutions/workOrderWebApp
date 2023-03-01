namespace WorkOrderProject.Models
{
    /// <summary>
    /// Class <c>Technician</c> creates a simple C# object to 
    /// be used for database manipulation.
    /// </summary>
    public class Technician
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
    }
}
