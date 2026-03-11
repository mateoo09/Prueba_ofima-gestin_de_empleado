using GestionEmpleadosAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace GestionEmpleadosAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>()
                .Property(e => e.Salary)
                .HasPrecision(18, 2);

            modelBuilder.Entity<Employee>().HasData(
                new Employee 
                { 
                    Id = 1, 
                    Name = "John Doe", 
                    Email = "john.doe@company.com", 
                    Department = "Engineering", 
                    Position = "Senior Developer", 
                    Salary = 85000 
                },
                new Employee 
                { 
                    Id = 2, 
                    Name = "Jane Smith", 
                    Email = "jane.smith@company.com", 
                    Department = "Marketing", 
                    Position = "Marketing Manager", 
                    Salary = 75000 
                }
            );

            modelBuilder.Entity<User>().HasData(
                new User 
                { 
                    Id = 1, 
                    Username = "admin", 
                    Password = "admin" 
                }
            );
        }
    }
}
