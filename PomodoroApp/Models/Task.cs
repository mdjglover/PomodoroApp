using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace PomodoroApp.Models
{
    public class Task
    {
        public int Id { get; set; }
        
        public string Description { get; set; }

        public string Status { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
