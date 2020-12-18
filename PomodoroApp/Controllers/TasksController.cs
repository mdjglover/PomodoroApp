using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Collections;
using System.Text.Json;
using System.Text.Json.Serialization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PomodoroApp.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly Data.PomodoroAppContext _db;
        public TasksController(Data.PomodoroAppContext context)
        {
            _db = context;
        }

        // GET: api/<TasksController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_db.Tasks.ToList());
        }

        // GET api/<TasksController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var task = _db.Tasks.FirstOrDefault(task => task.Id == id);
            if (task == null)
            {
                return NotFound(id);
            }

            return Ok(task);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Models.Task task)
        {
            if (task == null)
            {
                return BadRequest();
            }

            _db.Add(task);
            _db.SaveChanges();
            return Ok();
        }
     
        [HttpPut]
        public IActionResult Put([FromBody] Models.Task task)
        {
            if (task == null)
            {
                return BadRequest();
            }

            _db.Update(task);
            _db.SaveChanges();
            return Ok();
        }

        [HttpDelete]
        public IActionResult Delete([FromBody] Models.Task task)
        {
            if (task == null)
            {
                return BadRequest();
            }

            _db.Remove(task);
            _db.TasksActivity.RemoveRange(_db.TasksActivity.Where(activity => activity.TaskId == task.Id));
            _db.SaveChanges();
            return Ok();
        }

        [HttpGet("activity")]
        public IActionResult GetActivity()
        {
            return Ok(_db.TasksActivity.ToList());
        }

        [HttpPost("activity")]
        public IActionResult PostActivity([FromBody] Models.TaskActivity taskActivity)
        {
            if (taskActivity == null)
            {
                return BadRequest();
            }

            _db.Add(taskActivity);
            _db.SaveChanges();
            return Ok();
        }
    }
}
