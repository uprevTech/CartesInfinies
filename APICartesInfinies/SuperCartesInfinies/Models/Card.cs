using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace SuperCartesInfinies.Models
{
    public class Card
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int Attack { get; set; }
        public int Defense { get; set; }
        public int Cost { get; set; }
        public string Image { get; set; }

        public virtual List<ApplicationUser> ApplicationUsers { get; set; }
        public virtual List<Deck> Decks { get; set; }
    }
}