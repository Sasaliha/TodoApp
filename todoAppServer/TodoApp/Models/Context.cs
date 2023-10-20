using Microsoft.EntityFrameworkCore;

namespace TodoApp.Models;



public class Context : DbContext
{

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {

        optionsBuilder.UseSqlServer("Data Source=DESKTOP-TPNIL42\\SQLEXPRESS;Initial Catalog=ToDoProject;Integrated Security=True;Connect Timeout=30;Encrypt=False;Trust Server Certificate=False;Application Intent=ReadWrite;Multi Subnet Failover=False");
    }

    public DbSet<Todo> Todos { get; set; }  //tablo adını vererek baglantıyı sagladık


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Todo>().HasData(

            new Todo { Id = 1, Work = "Get to work", IsCompleted = false },
            new Todo { Id = 2, Work = "Pick up groceries", IsCompleted = false },
            new Todo { Id = 3, Work = "Go home", IsCompleted = false },
            new Todo { Id = 4, Work = "Fall asleep", IsCompleted = false },
            new Todo { Id = 5, Work = "Get Up", IsCompleted = false },
            new Todo { Id = 6, Work = "Brush teeth", IsCompleted = false },
            new Todo { Id = 7, Work = "Take a shower", IsCompleted = false }


        );


    }
}
