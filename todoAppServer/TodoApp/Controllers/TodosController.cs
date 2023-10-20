using Microsoft.AspNetCore.Mvc;
using TodoApp.Dtos;
using TodoApp.Models;



namespace TodoApp.Controllers;
[Route("api/[controller]/[action]")]
[ApiController]
public class TodosController : Controller
{


    [HttpGet]
    public IActionResult GetAll()
    {
        Context context = new();
        var result = context.Todos.ToList();
        return Ok(result);
    }


    [HttpGet("{id}")]
    public IActionResult ChangeCompleted(int id)
    {
        Context context = new();
        var todo = context.Todos.FirstOrDefault(p => p.Id == id);
        if (todo == null)
        {
            return NotFound();
        }
        todo.IsCompleted = !todo.IsCompleted;
        context.SaveChanges();
        return NoContent();

    }

    [HttpGet("{id}")]
    public IActionResult RemoveTask(int id)
    {
        Context context = new Context();
        var todo = context.Todos.Find(id);

        if (todo == null)
        {
            return NotFound();
        }

        context.Todos.Remove(todo);
        context.SaveChanges();

        return NoContent();
    }


    [HttpPost]
    public IActionResult AddTask(AddTodoDto request)
    {
        Todo todo = new()
        {
            Work = request.Work
        
        };

        Context context = new();
        context.Todos.Add(todo);
        context.SaveChanges();
        return NoContent();
    }

    [HttpPost]
    public IActionResult Update(UpdateTodoDto request)
    {
        Context context = new Context();
        Todo todo = context.Todos.Find(request.Id);
        if (todo == null)
        {
            return BadRequest(new { Message = "Todo kaydı bulunamadı" });
        }

        if (todo.Work != request.Work)
        {
            todo.Work = request.Work;
            context.SaveChanges();

        }

        return NoContent();
    }



}


