using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using SuperCartesInfinies.Models;
using SuperCartesInfinies.Models.DTO;

namespace SuperCartesInfinies.Controllers
{
    [Authorize]
    public class CardsController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();
        private const string LocalLoginProvider = "Local";
        private ApplicationUserManager _userManager;

        public CardsController()
        {

        }

        public CardsController(ApplicationUserManager userManager,
            ISecureDataFormat<AuthenticationTicket> accessTokenFormat)
        {
            UserManager = userManager;
            //AccessTokenFormat = accessTokenFormat;
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        // GET: api/GetCards
        [Route("api/Cards/GetCards")]
        public List<CardDTO> GetCards()
        {
            if (!User.Identity.IsAuthenticated)
            {
                return null;
            }
            string currentUserId = User.Identity.GetUserId();
            ApplicationUser currentUser = db.Users.FirstOrDefault(x => x.Id == currentUserId);

            List<CardDTO> output = new List<CardDTO>();

            List<Card> allCards = db.Cards.ToList();
            // Determine wether a card is part of the users acquired list. Add all the cards and its result to the output.
            foreach (var card in allCards)
            {
                CardDTO currentCard = new CardDTO
                {
                    Id = card.Id,
                    Name = card.Name,
                    Attack = card.Attack,
                    Defense = card.Defense,
                    Cost = card.Cost,
                    Image = card.Image
                };
                if (card.ApplicationUsers.Contains(currentUser))
                    currentCard.Acquired = true;
                else
                    currentCard.Acquired = false;

                output.Add(currentCard);
            };
            
            return output;
        }

        /// <summary>
        /// Buy card to put in players collection. 
        /// </summary>
        /// <returns>the new point balance</returns>
        [Route("api/Cards/BuyCard")]
        public int BuyCard(int cardId)
        {
            if (!User.Identity.IsAuthenticated)
            {
                return int.MinValue;
            }
            string currentUserId = User.Identity.GetUserId();
            ApplicationUser currentUser = db.Users.FirstOrDefault(x => x.Id == currentUserId);

            Card cardToBuy = db.Cards.Find(cardId);
            int userBalance = currentUser.Points;
            if (userBalance < cardToBuy.Cost)
            {
                return int.MinValue;
            }
            
            currentUser.Collection.Add(cardToBuy);

            //substract points from user
            currentUser.Points = userBalance - cardToBuy.Cost;

            return currentUser.Points;
        }

        // GET: api/Cards/5
        //[ResponseType(typeof(Card))]
        //public IHttpActionResult GetCard(int id)
        //{
        //    Card card = db.Cards.Find(id);
        //    if (card == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(card);
        //}
        

        // POST: api/Cards
        [ResponseType(typeof(Card))]
        public IHttpActionResult PostCard(Card card)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Cards.Add(card);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = card.Id }, card);
        }

        // DELETE: api/Cards/5
        [ResponseType(typeof(Card))]
        public IHttpActionResult DeleteCard(int id)
        {
            Card card = db.Cards.Find(id);
            if (card == null)
            {
                return NotFound();
            }

            db.Cards.Remove(card);
            db.SaveChanges();

            return Ok(card);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CardExists(int id)
        {
            return db.Cards.Count(e => e.Id == id) > 0;
        }
    }
}