using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace SuperCartesInfinies.Models
{
    public class Deck
    {
        [Key]
        public int DeckId { get; set; }
        public virtual ApplicationUser ApplicationUser { get; set; }
        public virtual List<Card> Cards { get; set; }
    }
}