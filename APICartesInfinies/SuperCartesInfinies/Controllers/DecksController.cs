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
                DeckDTO deckToDeckDTO = new DeckDTO {
                    Id = currentDeck.DeckId,
                    Cards = new List<CardDTO>(),
                    Name = currentDeck.Name
                };
                //add cardDTOs to deckDTO
                List<Card> cardsInDeck = currentDeck.Cards.ToList();
                foreach (Card carte in cardsInDeck)
                {
                    deckToDeckDTO.Cards.Add(new CardDTO
                    {
                        Acquired = true,
                        Attack = carte.Attack,
                        Cost = carte.Cost,
                        Defense = carte.Defense,
                        Id = carte.Id,
                        Image = carte.Image,
                        Name = carte.Name
                    });
                }
                output.Add(deckToDeckDTO);
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
        //[ResponseType(typeof(CreatedDeckDTO))]
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

            //fucking cave il faut aller chercher la carte dans la bd avec le id dans pDeck.
            List<Card> c = new List<Card>();
            foreach (Card card in pDeck.Cards)
            {
                Card current = db.Cards.FirstOrDefault(x => x.Id == card.Id);
                c.Add(current);
            }

            // add deck to user
            Deck newDeck = new Deck
            {
                Name = pDeck.Name,
                Cards = c
            };
            currentUser.Decks.Add(newDeck);
            db.SaveChanges();


            // return DeckDTO
            Deck createdDeck = currentUser.Decks.First(x => x.Name == pDeck.Name);
            List<CardDTO> cardsToAdd = new List<CardDTO>();
            foreach (Card carte in createdDeck.Cards)
            {
                cardsToAdd.Add(new CardDTO
                {
                    Acquired = true,
                    Attack = carte.Attack,
                    Cost = carte.Cost,
                    Defense = carte.Defense,
                    Id = carte.Id,
                    Image = carte.Image,
                    Name = carte.Name
                });
            }
            CreatedDeckDTO output = new CreatedDeckDTO
            {
                Name = createdDeck.Name,
                Cards = cardsToAdd,
                Id = createdDeck.DeckId
            };

            return Ok();
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