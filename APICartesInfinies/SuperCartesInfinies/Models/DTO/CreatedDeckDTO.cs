using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SuperCartesInfinies.Models.DTO
{
    public class CreatedDeckDTO
    {
        public int Id;
        public string Name;
        public List<CardDTO> Cards;
    }
}