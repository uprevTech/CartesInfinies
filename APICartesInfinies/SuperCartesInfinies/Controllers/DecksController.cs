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
    public class DecksController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();


        private ApplicationUserManager _userManager;

        public DecksController()
        {

        }

        public DecksController(ApplicationUserManager userManager,
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

        
        [Route("api/Decks/GetDecks")]
        public List<DeckDTO> GetDecks()
        {
            if (!User.Identity.IsAuthenticated)
            {
                return null;
            }
            string currentUserId = User.Identity.GetUserId();
            ApplicationUser currentUser = db.Users.FirstOrDefault(x => x.Id == currentUserId);

            List<DeckDTO> output = new List<DeckDTO>();
            foreach (Deck currentDeck in currentUser.Decks)
            {
                List<Card> cardsInDeck = currentDeck.Cards.ToList();
                DeckDTO newDeck = new DeckDTO
                {
                    Id = currentDeck.DeckId,
                    Cards = cardsInDeck,
                    Name = currentDeck.Name
                };
                output.Add(newDeck);
            };

            return output;
        }

        // GET: api/Decks/5
        [ResponseType(typeof(Deck))]
        public IHttpActionResult GetDeck(int id)
        {
            Deck deck = db.Decks.Find(id);
            if (deck == null)
            {
                return NotFound();
            }

            return Ok(deck);
        }
        

        // POST: api/Decks
        [Route("api/Decks/CreateDeck")]
        [ResponseType(typeof(Deck))]
        [HttpPost]
        public IHttpActionResult CreateDeck(CreateDeckDTO pDeck)
        {
            // TODO Echec de la serialisation
            if (!ModelState.IsValid)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }
            string currentUserId = User.Identity.GetUserId();
            ApplicationUser currentUser = db.Users.FirstOrDefault(x => x.Id == currentUserId);

            //Deck must not have same name as other deck for current user
            List<Deck> currentDecks = currentUser.Decks.ToList();
            foreach (Deck currentDeck in currentDecks)
            {
                if (currentDeck.Name == pDeck.Name)
                {
                    throw new HttpResponseException(HttpStatusCode.BadRequest);
                }
            }

            // add deck to user
            Deck newDeck = new Deck
            {
                Name = pDeck.Name,
                Cards = pDeck.Cards
            };
            currentUser.Decks.Add(newDeck);
            db.SaveChanges();


            // return DeckDTO
            Deck createdDeck = currentUser.Decks.First(x => x.Name == pDeck.Name);
            //DeckDTO output = new DeckDTO
            //{
            //    Name = createdDeck.Name,
            //    Cards = createdDeck.Cards,
            //    Id = createdDeck.DeckId
            //};

            return Ok(createdDeck);
        }

        // DELETE: api/Decks/5
        [ResponseType(typeof(Deck))]
        public IHttpActionResult DeleteDeck(int id)
        {
            string currentUserId = User.Identity.GetUserId();

            //make sure current user has ownership of the deck to delete
            ApplicationUser currentUser = db.Users.FirstOrDefault(x => x.Id == currentUserId);
            Deck deckToDelete = currentUser.Decks.FirstOrDefault(x => x.DeckId == id);
            if (deckToDelete == null)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }

            db.Decks.Remove(deckToDelete);
            db.SaveChanges();

            return Ok(deckToDelete);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool DeckExists(int id)
        {
            return db.Decks.Count(e => e.DeckId == id) > 0;
        }
    }
}